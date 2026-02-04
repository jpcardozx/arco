#!/bin/bash
# Download Real Assets from Unsplash & Flaticon
set -e

mkdir -p public/landing/images
mkdir -p public/landing/icons

echo "🎨 Baixando assets reais..."

# ===== UNSPLASH IMAGENS =====
# Hair Salon - usando fotógrafo Toa Heftiba
echo "📥 Hair Salon Interior..."
curl -L "https://images.unsplash.com/photo-1633681926022-75cd25b90e5e?w=2560&h=1700&fit=crop" -o "public/landing/images/hero-salon.jpg" 2>/dev/null && echo "✅ hero-salon.jpg"

# Manicure Close-up
echo "📥 Luxury Manicure..."
curl -L "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=2000&h=1500&fit=crop" -o "public/landing/images/testimonials-manicure.jpg" 2>/dev/null && echo "✅ testimonials-manicure.jpg"

# Beauty Team
echo "📥 Beauty Team..."
curl -L "https://images.unsplash.com/photo-1560066169-b763a5efa3a0?w=2560&h=1700&fit=crop" -o "public/landing/images/team-professionals.jpg" 2>/dev/null && echo "✅ team-professionals.jpg"

# ===== CONVERTER PARA WEBP =====
echo ""
echo "🔧 Convertendo para WebP..."

if command -v ffmpeg &> /dev/null; then
  ffmpeg -i public/landing/images/hero-salon.jpg -c:v libwebp -q:v 85 public/landing/images/hero-salon.webp -y 2>/dev/null && echo "✅ hero-salon.webp"
  ffmpeg -i public/landing/images/testimonials-manicure.jpg -c:v libwebp -q:v 85 public/landing/images/testimonials-manicure.webp -y 2>/dev/null && echo "✅ testimonials-manicure.webp"
  ffmpeg -i public/landing/images/team-professionals.jpg -c:v libwebp -q:v 85 public/landing/images/team-professionals.webp -y 2>/dev/null && echo "✅ team-professionals.webp"
else
  echo "⚠️ ffmpeg não instalado. Pulando conversão WebP."
fi

# ===== ÍCONES SVG =====
echo ""
echo "📥 Baixando ícones SVG..."

# Hair Salon
curl -L "https://cdn-icons-png.flaticon.com/512/4436/4436481.svg" -o "public/landing/icons/hair-salon.svg" 2>/dev/null && echo "✅ hair-salon.svg" || echo "⚠️ hair-salon.svg"

# Manicure
curl -L "https://cdn-icons-png.flaticon.com/512/2797/2797543.svg" -o "public/landing/icons/manicure.svg" 2>/dev/null && echo "✅ manicure.svg" || echo "⚠️ manicure.svg"

# Nail Care
curl -L "https://cdn-icons-png.flaticon.com/512/3722/3722969.svg" -o "public/landing/icons/nail-care.svg" 2>/dev/null && echo "✅ nail-care.svg" || echo "⚠️ nail-care.svg"

# Beauty Spa
curl -L "https://cdn-icons-png.flaticon.com/512/924/924514.svg" -o "public/landing/icons/beauty-spa.svg" 2>/dev/null && echo "✅ beauty-spa.svg" || echo "⚠️ beauty-spa.svg"

echo ""
echo "✅ Download de assets concluído!"
ls -lh public/landing/images/ public/landing/icons/

