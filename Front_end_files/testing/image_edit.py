from PIL import Image

def crop_center(image_path, output_path, crop_width=1920, crop_height=1080):
    # Open the image file
    img = Image.open(image_path)
    img_width, img_height = img.size

    # Calculate the coordinates for the center crop
    left = (img_width - crop_width) / 2
    top = (img_height - crop_height) / 2
    right = (img_width + crop_width) / 2
    bottom = (img_height + crop_height) / 2

    # Crop the center of the image
    img_cropped = img.crop((left, top, right, bottom))

    # Save the cropped image
    img_cropped.save(output_path)
    print(f"Image cropped to {crop_width}x{crop_height} and saved at {output_path}")

# Example usage
image_path = "input.jpg"  # Replace with your image path
output_path = "output_cropped.jpg"  # Replace with desired output path
crop_center(image_path, output_path)
