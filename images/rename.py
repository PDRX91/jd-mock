import os


def rename_files(directory):
    for filename in os.listdir(directory):
        if filename.endswith("-bg-removed.png"):
            new_filename = filename.replace("-bg-removed.png", ".png")
            old_path = os.path.join(directory, filename)
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)
            print(f"Renamed: {filename} -> {new_filename}")


# Set the directory path
script_dir = os.path.dirname(os.path.abspath(__file__))
directory = os.path.join(script_dir, "bg-removed")

# Call the function to rename files
rename_files(directory)

print("File renaming complete.")
