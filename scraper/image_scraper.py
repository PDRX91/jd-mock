import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import os
from concurrent.futures import ThreadPoolExecutor


def scrape_gem_data(url, limit=100, download_images=False):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        gem_articles = soup.find_all("article", class_="retail")
        print(f"Found {len(gem_articles)} gem articles")
        gems_data = []
        image_download_tasks = []  # Initialize the list here
        processed_count = 0

        for article in gem_articles:
            # Skip articles with additional classes
            if len(article["class"]) != 1 or article["class"][0] != "retail":
                continue

            # Skip articles with id "see_outsourced"
            if article.get("id") == "see_outsourced":
                continue

            processed_count += 1
            if processed_count > limit:
                break

            print(f"\nProcessing gem {processed_count}:")
            gem_data = {}

            header = article.find("div", class_="gem-header")
            if header:
                gem_type = header.find("b")
                if gem_type:
                    gem_data["gem_type"] = gem_type.get_text(strip=True)
                    print(f"Gem type: {gem_data['gem_type']}")
                cut = header.contents[-1] if len(header.contents) > 1 else ""
                if isinstance(cut, str):
                    gem_data["cut"] = cut.strip()
                    print(f"Cut: {gem_data['cut']}")

            footer = article.find("div", class_="gem-footer")
            if footer:
                size_carats = footer.find("b")
                if size_carats:
                    gem_data["size_carats"] = size_carats.get_text(strip=True)
                    print(f"Size: {gem_data['size_carats']}")

                footer_contents = list(footer.stripped_strings)
                if len(footer_contents) >= 3:
                    dim_parts = footer_contents[1].split("x")
                    if len(dim_parts) == 2:
                        width = dim_parts[0].strip()
                        height = dim_parts[1].strip().replace(" mm", "")
                    elif len(dim_parts) == 1:
                        width = height = dim_parts[0].strip().replace(" mm", "")
                    else:
                        width = height = ""

                    gem_data["dimensions"] = {
                        "width": width,
                        "height": height,
                    }

                    gem_data["item_num"] = footer_contents[2].replace("Item# ", "")
                    print(f"Dimensions: {gem_data['dimensions']}")
                    print(f"Item number: {gem_data['item_num']}")

                price_link = footer.find("a", href="../howtobuy.html")
                if price_link:
                    price = price_link.get_text(strip=True).split()[-1]
                    gem_data["price"] = int(price.replace("$", "").replace(",", ""))
                    print(f"Price: {gem_data['price']}")

            if download_images:
                img_tag = article.find("img")
                if img_tag and img_tag.has_attr("src"):
                    small_img = urljoin(url, img_tag["src"])
                    gem_data["small_img"] = small_img
                    print(f"Image URL: {gem_data['small_img']}")

                    # Prepare image download task
                    filename = f"images/{gem_data['item_num']}.jpg"
                    image_download_tasks.append((small_img, filename))

            gems_data.append(gem_data)

        # Download images concurrently
        if download_images:
            os.makedirs("images", exist_ok=True)
            with ThreadPoolExecutor(max_workers=10) as executor:
                executor.map(lambda x: download_image(*x), image_download_tasks)

        return gems_data
    else:
        print(f"Failed to fetch the webpage. Status code: {response.status_code}")
        return []


def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Downloaded: {filename}")
    else:
        print(f"Failed to download: {url}")


# Example usage
if __name__ == "__main__":
    website_url = "https://www.johndyergems.com/gemstones/sapphire-all.html"
    gems_data = scrape_gem_data(website_url, download_images=True)

    # Save data to gems.json in the app/ directory
    with open("app/gems.json", "w") as json_file:
        json.dump(gems_data, json_file, indent=2)

    print(f"\nGem data has been saved to app/gems.json")
    print(f"Total gems found: {len(gems_data)} (limited to 100)")
    print("Images have been downloaded to the 'images' folder")

    # Print the first few gems as an example
    print("\nSample of gems found:")
    for i, gem in enumerate(gems_data, 1):
        print(f"{i}. {gem['gem_type']} - {gem['item_num']}")
