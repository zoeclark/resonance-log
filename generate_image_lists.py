import os
import glob
import re

# Automatically find the room directory (e.g., room1/)
room_dirs = [d for d in os.listdir() if os.path.isdir(d) and d.startswith("room")]

for room in room_dirs:
    image_dir = os.path.join(room, "images")
    if not os.path.exists(image_dir):
        continue

    image_files = glob.glob(os.path.join(image_dir, f"{room}_*.png"))

    # Natural sort: room1_1.png, room1_2.png, ..., room1_10.png, etc.
    def natural_key(filename):
        return [int(text) if text.isdigit() else text for text in re.split(r'(\d+)', filename)]

    image_files.sort(key=natural_key)

    # Make paths relative to the room folder
    relative_paths = [os.path.relpath(f, start=room) for f in image_files]

    # Write images.js inside the same room folder
    output_path = os.path.join(room, "image_list.js")
    with open(output_path, "w") as f:
        f.write("const images = [\n")
        for path in relative_paths:
            f.write(f"  \"{path}\",\n")
        f.write("];\n")

    print(f"✅ Generated {output_path} with {len(relative_paths)} images.")
