#!/bin/bash
# Direct Unsplash URLs - Tier S Quality
set -e

echo "🎨 TIER S ASSET DOWNLOAD - Beauty & Salon Landing Page"
echo "=============================================="

mkdir -p public/landing/images

echo "📥 Baixando imagens Premium..."
echo "=============================================="

# Using direct download links with proper image IDs
# These are real Unsplash photos optimized for web

# 1. Hero Salon - Beautiful salon interior
echo "▶ 1/5: Hero Salon Interior"
wget -q -O "public/landing/images/hero-salon.jpg" \
  "https://images.unsplash.com/photo-1633681926022-75cd25b90e5e?w=2560&q=80&auto=format&fit=crop" \
  -U "Mozilla/5.0" --timeout=30 \
  && echo "   ✅ $(du -h public/landing/images/hero-salon.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Failed"

# 2. Manicure Details - Luxury nails
echo "▶ 2/5: Luxury Manicure Details"
wget -q -O "public/landing/images/testimonials-manicure.jpg" \
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=2000&q=80&auto=format&fit=crop" \
  -U "Mozilla/5.0" --timeout=30 \
  && echo "   ✅ $(du -h public/landing/images/testimonials-manicure.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Failed"

# 3. Team Professionals
echo "▶ 3/5: Professional Beauty Team"
wget -q -O "public/landing/images/team-professionals.jpg" \
  "https://images.unsplash.com/photo-1560066169-b763a5efa3a0?w=2560&q=80&auto=format&fit=crop" \
  -U "Mozilla/5.0" --timeout=30 \
  && echo "   ✅ $(du -h public/landing/images/team-professionals.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Failed"

# 4. Beauty Products - Premium skincare
echo "▶ 4/5: Premium Beauty Products"
wget -q -O "public/landing/images/beauty-products.jpg" \
  "https://images.unsplash.com/photo-1596462502278-af07bdc81b1a?w=2560&q=80&auto=format&fit=crop" \
  -U "Mozilla/5.0" --timeout=30 \
  && echo "   ✅ $(du -h public/landing/images/beauty-products.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Failed"

# 5. Spa Background - Relaxation
echo "▶ 5/5: Spa Ambiance & Relaxation"
wget -q -O "public/landing/images/spa-background.jpg" \
  "https://images.unsplash.com/photo-1540575467063-178f50002e87?w=2560&q=80&auto=format&fit=crop" \
  -U "Mozilla/5.0" --timeout=30 \
  && echo "   ✅ $(du -h public/landing/images/spa-background.jpg 2>/dev/null | cut -f1)" || echo "   ⚠️  Failed"

echo ""
echo "🔄 Validando imagens..."
echo "=============================================="

valid_count=0
for jpg in public/landing/images/*.jpg; do
  if [ -f "$jpg" ]; then
    if file "$jpg" | grep -q "JPEG"; then
      size=$(du -h "$jpg" | cut -f1)
      filename=$(basename "$jpg")
      echo "   ✅ $filename ($size)"
      ((valid_count++))
    else
      filename=$(basename "$jpg")
      echo "   ❌ $filename"
      rm -f "$jpg"
    fi
  fi
done

echo ""
echo "Downloaded: $valid_count/5 images"
echo ""

if [ $valid_count -ge 3 ]; then
  echo "🎬 Otimizando com FFmpeg para WebP..."
  echo "=============================================="
  
  for jpg in public/landing/images/*.jpg; do
    if [ -f "$jpg" ]; then
      webp="${jpg%.jpg}.webp"
      filename=$(basename "$webp")
      
      if ffmpeg -i "$jpg" -q:v 5 "$webp" -y 2>/dev/null; then
        size=$(du -h "$webp" 2>/dev/null | cut -f1)
        echo "   ✅ $filename ($size)"
      fi
    fi
  done
fi

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
echo "🚀 Assets Tier S!"
