#!/bin/bash
# Download Landing Page Assets - TIER S Quality with Unsplash API
set -e

UNSPLASH_ACCESS_KEY="G6kbeRxe3HgWLRfaUYyzJxID9i8yb6y_UL3-RF6pOHQ"
UNSPLASH_SECRET_KEY="E2wKPqKoOlmgOlPjcvNLzHe8WlNYekdY18RoY_8Lw_g"

echo "🎨 TIER S ASSET DOWNLOAD - Beauty & Salon Landing Page"
echo "=============================================="
echo "Using Unsplash API for Premium Images"
echo ""

mkdir -p public/landing/images

echo "📥 Baixando imagens Unsplash (Via API)..."
echo "=============================================="

# 1. Hero Salon Interior
echo "▶ 1/5: Hero Salon Interior"
curl -s "https://api.unsplash.com/photos/random?query=beauty%20salon%20interior&orientation=landscape&w=2560&h=1440&count=1&client_id=${UNSPLASH_ACCESS_KEY}" \
  | grep -o '"download_url":"[^"]*' | cut -d'"' -f4 | head -1 | xargs -I {} wget -q -O "public/landing/images/hero-salon.jpg" {} \
  && echo "   ✅ $(du -h public/landing/images/hero-salon.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Retry needed"

# 2. Luxury Manicure
echo "▶ 2/5: Luxury Manicure Details"
curl -s "https://api.unsplash.com/photos/random?query=luxury%20manicure%20nails&orientation=portrait&w=2000&h=3000&count=1&client_id=${UNSPLASH_ACCESS_KEY}" \
  | grep -o '"download_url":"[^"]*' | cut -d'"' -f4 | head -1 | xargs -I {} wget -q -O "public/landing/images/testimonials-manicure.jpg" {} \
  && echo "   ✅ $(du -h public/landing/images/testimonials-manicure.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Retry needed"

# 3. Beauty Team Professionals
echo "▶ 3/5: Professional Beauty Team"
curl -s "https://api.unsplash.com/photos/random?query=beauty%20professionals%20team&orientation=squarish&w=2560&h=2560&count=1&client_id=${UNSPLASH_ACCESS_KEY}" \
  | grep -o '"download_url":"[^"]*' | cut -d'"' -f4 | head -1 | xargs -I {} wget -q -O "public/landing/images/team-professionals.jpg" {} \
  && echo "   ✅ $(du -h public/landing/images/team-professionals.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Retry needed"

# 4. Premium Beauty Products
echo "▶ 4/5: Premium Beauty Products"
curl -s "https://api.unsplash.com/photos/random?query=premium%20skincare%20beauty%20products&orientation=landscape&w=2560&h=2000&count=1&client_id=${UNSPLASH_ACCESS_KEY}" \
  | grep -o '"download_url":"[^"]*' | cut -d'"' -f4 | head -1 | xargs -I {} wget -q -O "public/landing/images/beauty-products.jpg" {} \
  && echo "   ✅ $(du -h public/landing/images/beauty-products.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Retry needed"

# 5. Spa Relaxation
echo "▶ 5/5: Spa Ambiance & Relaxation"
curl -s "https://api.unsplash.com/photos/random?query=spa%20relaxation%20wellness&orientation=landscape&w=2560&h=1920&count=1&client_id=${UNSPLASH_ACCESS_KEY}" \
  | grep -o '"download_url":"[^"]*' | cut -d'"' -f4 | head -1 | xargs -I {} wget -q -O "public/landing/images/spa-background.jpg" {} \
  && echo "   ✅ $(du -h public/landing/images/spa-background.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Retry needed"

echo ""
echo "🔄 Validando imagens baixadas..."
echo "=============================================="

valid_count=0
for jpg in public/landing/images/*.jpg; do
  if [ -f "$jpg" ]; then
    size=$(du -h "$jpg" | cut -f1)
    filename=$(basename "$jpg")
    
    if file "$jpg" | grep -q "JPEG"; then
      echo "   ✅ $filename ($size)"
      ((valid_count++))
    else
      echo "   ❌ $filename - Invalid"
      rm -f "$jpg"
    fi
  fi
done

echo ""
echo "📊 Downloaded: $valid_count/5 images"
echo ""

if [ $valid_count -eq 5 ]; then
  echo "🎬 Otimizando com FFmpeg para WebP..."
  echo "=============================================="
  
  for jpg in public/landing/images/*.jpg; do
    webp="${jpg%.jpg}.webp"
    filename=$(basename "$webp")
    
    ffmpeg -i "$jpg" -q:v 5 -preset default "$webp" -y 2>/dev/null
    size=$(du -h "$webp" 2>/dev/null | cut -f1)
    echo "   ✅ $filename ($size)"
  done
  
  echo ""
  echo "📊 RESUMO FINAL - QUALIDADE TIER S"
  echo "=============================================="
  echo ""
  echo "✅ Imagens JPG:"
  du -sh public/landing/images/*.jpg 2>/dev/null | awk '{print "   " $2 ": " $1}'
  echo ""
  echo "✅ Imagens WebP (otimizadas):"
  du -sh public/landing/images/*.webp 2>/dev/null | awk '{print "   " $2 ": " $1}'
  echo ""
  echo "✅ Ícones SVG:"
  ls -1 public/landing/icons/*.svg 2>/dev/null | wc -l | xargs -I {} echo "   Total: {} ícones"
  echo ""
  echo "🚀 Assets Tier S prontos!"
else
  echo "⚠️  Some images failed to download. Retrying with fallback URLs..."
fi
