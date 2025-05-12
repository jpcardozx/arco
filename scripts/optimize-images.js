const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = './public';
const OUTPUT_DIR = './public/optimized';

async function optimizeImages() {
    try {
        // Ensure output directory exists
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        // Get all image files
        const files = await fs.readdir(INPUT_DIR);
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        console.log(`Found ${imageFiles.length} images to optimize`);

        // Process each image
        for (const file of imageFiles) {
            const inputPath = path.join(INPUT_DIR, file);
            const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webp`);

            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .resize(2000, 2000, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .toFile(outputPath);

                console.log(`✓ Optimized: ${file}`);
            } catch (err) {
                console.error(`✗ Failed to optimize ${file}:`, err);
            }
        }

        console.log('Image optimization complete!');
    } catch (err) {
        console.error('Failed to optimize images:', err);
    }
}

optimizeImages();
