import os
from PIL import Image

def optimize_images():
    img_dir = r"d:\Downloads\GSSIO-Global-Suite\GSSIO-Global-Suite\artifacts\gssifo\src\assets\images"
    max_dimension = 1600
    quality = 80
    
    print(f"Scanning directory: {img_dir}")
    
    for filename in os.listdir(img_dir):
        filepath = os.path.join(img_dir, filename)
        name, ext = os.path.splitext(filename)
        ext = ext.lower()
        
        if ext in ['.jpg', '.jpeg', '.png']:
            print(f"Processing: {filename} ({os.path.getsize(filepath) / 1024:.1f} KB)")
            try:
                with Image.open(filepath) as img:
                    # Determine resizing filter
                    try:
                        resample_filter = Image.Resampling.LANCZOS
                    except AttributeError:
                        resample_filter = Image.ANTIALIAS
                    
                    # Resize if width or height exceeds max_dimension
                    width, height = img.size
                    if width > max_dimension or height > max_dimension:
                        if width > height:
                            new_width = max_dimension
                            new_height = int(height * (max_dimension / width))
                        else:
                            new_height = max_dimension
                            new_width = int(width * (max_dimension / height))
                        
                        img = img.resize((new_width, new_height), resample_filter)
                        print(f"  Resized from {width}x{height} to {new_width}x{new_height}")
                    
                    # Convert transparent background to white if saving as JPEG-like/RGB WebP
                    if img.mode in ('RGBA', 'LA') and ext != '.png':
                        # Clean up transparency for RGB conversion if needed
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        background.paste(img, mask=img.split()[3]) # 3 is the alpha channel
                        img = background
                    
                    # Save as WebP
                    webp_filename = f"{name}.webp"
                    webp_filepath = os.path.join(img_dir, webp_filename)
                    
                    img.save(webp_filepath, "WEBP", quality=quality)
                    new_size = os.path.getsize(webp_filepath)
                    print(f"  Saved as: {webp_filename} ({new_size / 1024:.1f} KB)")
                    
                # Delete original file
                os.remove(filepath)
                print(f"  Deleted original: {filename}")
            except Exception as e:
                print(f"  Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
