#!/bin/bash
# Download Expanded Assets - 2 más imagens + 8 ícones
set -e

mkdir -p public/landing/images
mkdir -p public/landing/icons

echo "🎨 Expandindo assets..."

# ===== 2 IMAGENS ADICIONAIS =====
echo "📥 Baixando 2 imagens estratégicas..."

# 1. Professional Beauty Product Shot (para showcase)
curl -L "https://images.unsplash.com/photo-1596462502278-af07bdc81b1a?w=2560&fit=crop" -o "public/landing/images/beauty-products.jpg" -H "User-Agent: Mozilla/5.0" 2>/dev/null && echo "✅ beauty-products.jpg ($(du -h public/landing/images/beauty-products.jpg | cut -f1))"

# 2. Background Pattern/Texture
curl -L "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=2560&fit=crop" -o "public/landing/images/spa-background.jpg" -H "User-Agent: Mozilla/5.0" 2>/dev/null && echo "✅ spa-background.jpg ($(du -h public/landing/images/spa-background.jpg | cut -f1))"

# ===== 8 ÍCONES PERSONALIZADOS =====
echo ""
echo "📥 Baixando 8 ícones adicionais..."

# Icons relacionados a beauty/wellness
ICONS=(
  "hair-color:4343707"        # Hair Color
  "spa-treatment:4343760"     # Spa Treatment
  "facial-care:4343744"       # Facial Care
  "waxing:4343797"           # Waxing
  "massage:4343754"          # Massage
  "eyelash-extension:4343746" # Eyelashes
  "makeup-artist:4343751"    # Makeup Artist
  "hair-extension:4343748"   # Hair Extension
)

for icon in "${ICONS[@]}"; do
  name=$(echo $icon | cut -d: -f1)
  id=$(echo $icon | cut -d: -f2)
  
  curl -L "https://cdn-icons-png.flaticon.com/512/${id:0:1}${id:1:2}/$(printf "%03d" ${id:3}).svg" \
    -o "public/landing/icons/${name}.svg" 2>/dev/null && echo "✅ ${name}.svg" || echo "⚠️ ${name}.svg"
done

echo ""
echo "✅ Expansão concluída!"
ls -lh public/landing/images/ public/landing/icons/ 2>/dev/null | tail -20

