
import os
from PIL import Image
import moviepy.editor as mp

def convert_to_webp(source_folder, target_folder):
    """
    Converts all PNG, JPG, and JPEG images in a source folder to WebP format and saves them in a target folder.

    Args:
        source_folder (str): The path to the folder containing the images to be converted.
        target_folder (str): The path to the folder where the converted WebP images will be saved.
    """
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)
    for filename in os.listdir(source_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(source_folder, filename)
            img = Image.open(img_path).convert("RGB")
            new_filename = os.path.splitext(filename)[0] + ".webp"
            img.save(os.path.join(target_folder, new_filename), 'webp', optimize=True, quality=85)
            print(f"Converted {filename} to {new_filename}")

def compress_video(source_path, target_path, target_size_mb):
    """
    Compresses a video to a target size in megabytes.

    Args:
        source_path (str): The path to the source video file.
        target_path (str): The path where the compressed video will be saved.
        target_size_mb (int): The target size of the compressed video in megabytes.
    """
    if not os.path.exists(os.path.dirname(target_path)):
        os.makedirs(os.path.dirname(target_path))

    video = mp.VideoFileClip(source_path)

    # Calculate the bitrate needed to achieve the target size
    duration = video.duration
    target_size_bits = target_size_mb * 8 * 1024 * 1024
    bitrate = target_size_bits / duration

    video.write_videofile(target_path, bitrate=f"{int(bitrate)}", codec="libx264")
    print(f"Compressed {source_path} to {target_path}")

if __name__ == "__main__":
    # This block of code will only run when the script is executed directly
    # It provides an example of how to use the functions defined above.

    # --- Image Conversion ---
    # To convert images, uncomment the following lines and set the source and target folders.
    # source_image_folder = 'assets/images/carousel'
    # target_image_folder = 'assets/images/carousel_webp'
    # convert_to_webp(source_image_folder, target_image_folder)
    
    # --- Video Compression ---
    # To compress a video, uncomment the following lines and set the source and target paths, and the target size in MB.
    # source_video = 'path/to/your/large_video.mp4'
    # target_video = 'path/to/your/compressed_video.mp4'
    # target_mb = 10 
    # compress_video(source_video, target_video, target_mb)
    
    print("Asset optimization script is ready.")
