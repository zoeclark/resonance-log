import os 
import glob
import re
print("HERE")

door_dir = "doors"
image_files = glob.glob(os.path.join(door_dir, "*.jpeg"))  # TODO change this to be less brittle

print(image_files)

def natural_key(filename):
    return [int(text) if text.isdigit() else text for text in re.split(r'(\d+)', filename)]

image_files.sort(key=natural_key)
relative_paths = [os.path.relpath(f) for f in image_files]


with open("doorImages.js", "w") as f:
    f.write("const doorImages = [\n")
    for path in relative_paths:
        f.write(f"  \"{path}\",\n")
    f.write("];\n")

print(f"✅ Generated doorImages.js with {len(relative_paths)} images.")
