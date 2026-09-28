import os
from PIL import Image, ImageDraw

def generate_all():
    src_path = 'scratch/input_logo.jpeg'
    public_dir = 'public'
    app_dir = 'app'
    
    print(f"Loading source: {src_path}")
    im = Image.open(src_path)
    
    # Accurate center from bounding box analysis: cx=617, cy=593
    cx, cy = 617, 593
    canvas_size = 1220
    
    # 1. Create clean master canvas
    base = Image.new('RGB', (canvas_size, canvas_size), (255, 255, 255))
    paste_x = int(canvas_size / 2 - cx)
    paste_y = int(canvas_size / 2 - cy)
    base.paste(im, (paste_x, paste_y))
    
    # Clean background noise: clamp near-white (>242) to pure (255, 255, 255)
    data = list(base.getdata())
    new_data = []
    for r, g, b in data:
        if r > 242 and g > 242 and b > 242:
            new_data.append((255, 255, 255))
        else:
            new_data.append((r, g, b))
    base.putdata(new_data)
    
    # 2. Create anti-aliased circular badge with 2x supersampling
    scale = 2
    big_size = canvas_size * scale
    mask = Image.new('L', (big_size, big_size), 0)
    draw = ImageDraw.Draw(mask)
    # Circle diameter: leave 4px at 2x (2px at 1x)
    draw.ellipse((4, 4, big_size - 4, big_size - 4), fill=255)
    mask = mask.resize((canvas_size, canvas_size), Image.Resampling.LANCZOS)
    
    master_circle = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    master_circle.paste(base.convert('RGBA'), (0, 0), mask)
    
    # Ensure directories exist
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)
    
    # 3. Generate PNG icons
    png_targets = {
        'icon-48x48.png': 48,
        'icon-96x96.png': 96,
        'icon-144x144.png': 144,
        'icon-192x192.png': 192,
        'icon.png': 512,
        'icon-light-32x32.png': 32,
        'icon-dark-32x32.png': 32,
        'apple-icon.png': 180,
    }
    
    for filename, sz in png_targets.items():
        resized = master_circle.resize((sz, sz), Image.Resampling.LANCZOS)
        out_path = os.path.join(public_dir, filename)
        resized.save(out_path, format='PNG', optimize=True)
        print(f"Generated {out_path} ({sz}x{sz}, {os.path.getsize(out_path)} bytes)")
        
    # 4. Generate multi-resolution standard ICO file (48x48, 32x32, 16x16)
    ico_img = master_circle.resize((48, 48), Image.Resampling.LANCZOS)
    public_ico = os.path.join(public_dir, 'favicon.ico')
    ico_img.save(public_ico, format='ICO', sizes=[(48, 48), (32, 32), (16, 16)])
    print(f"Generated {public_ico} ({os.path.getsize(public_ico)} bytes)")
    
    # 5. Sync critical icons into app directory for Next.js App Router metadata conventions
    for app_file in ['favicon.ico', 'icon.png', 'apple-icon.png']:
        src = os.path.join(public_dir, app_file)
        dst = os.path.join(app_dir, app_file)
        if os.path.exists(src):
            with open(src, 'rb') as sf, open(dst, 'wb') as df:
                df.write(sf.read())
            print(f"Synced {src} -> {dst}")

    # 6. Generate 1200x630 OpenGraph / Twitter Card image with full Valtrix logo
    teal_logo_path = os.path.join(public_dir, 'valtrix-logo-teal.png')
    if os.path.exists(teal_logo_path):
        teal_logo = Image.open(teal_logo_path).convert('RGBA')
        og = Image.new('RGBA', (1200, 630), (255, 255, 255, 255))
        target_w = 900
        scale = target_w / teal_logo.width
        target_h = int(teal_logo.height * scale)
        teal_resized = teal_logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
        paste_x = (1200 - target_w) // 2
        paste_y = (630 - target_h) // 2
        og.paste(teal_resized, (paste_x, paste_y), teal_resized)
        og_rgb = og.convert('RGB')
        for dest in [os.path.join(public_dir, 'opengraph-image.png'), os.path.join(app_dir, 'opengraph-image.png')]:
            og_rgb.save(dest, format='PNG', optimize=True)
            print(f"Generated {dest} (1200x630, {os.path.getsize(dest)} bytes)")

    # 7. Verify the generated ICO file
    test_ico = Image.open(public_ico)
    print(f"Verification: ICO format={test_ico.format}, primary size={test_ico.size}")
    
    # Check binary structure
    with open(public_ico, 'rb') as f:
        data = f.read()
    import struct
    res, typ, count = struct.unpack('<HHH', data[:6])
    print(f"Verification: ICO header: Reserved={res}, Type={typ}, FrameCount={count}")
    for i in range(count):
        entry = data[6 + i*16 : 6 + (i+1)*16]
        w, h, colors, r, planes, bpp, size, offset = struct.unpack('<BBBBHHII', entry)
        print(f"  Frame {i}: {w}x{h}, bpp={bpp}, size={size}, offset={offset}")

if __name__ == '__main__':
    generate_all()
