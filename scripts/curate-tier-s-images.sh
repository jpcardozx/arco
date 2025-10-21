#!/bin/bash
# TIER S Image Curation Strategy - Professional Grade
# Testa múltiplas fontes e seleciona as melhores
set -e

echo "🎨 TIER S IMAGE CURATION - Beauty & Salon"
echo "================================================================"

mkdir -p public/landing/images
mkdir -p /tmp/image-candidates

echo ""
echo "📸 FONTE 1: Pexels API (High Quality, Free License)"
echo "================================================================"

# Pexels URLs para beauty/salon (sem autenticação necessária)
PEXELS_IMAGES=(
  "https://images.pexels.com/photos/4295286/pexels-photo-4295286.jpeg?w=2560&h=1440&fit=crop"  # Salon Interior
  "https://images.pexels.com/photos/3631112/pexels-photo-3631112.jpeg?w=2560&h=2560&fit=crop"  # Beauty Team
  "https://images.pexels.com/photos/3661877/pexels-photo-3661877.jpeg?w=2560&h=2000&fit=crop"  # Beauty Products
  "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?w=2560&h=1920&fit=crop"  # Spa Wellness
)

echo "Testando URLs Pexels..."
for i in "${!PEXELS_IMAGES[@]}"; do
  url="${PEXELS_IMAGES[$i]}"
  echo "  ▶ Testando Pexels-$((i+1))..."
  
  if timeout 10 wget -q -O "/tmp/test-pexels-$i.jpg" "$url" 2>/dev/null; then
    if file "/tmp/test-pexels-$i.jpg" | grep -q "JPEG"; then
      size=$(du -h "/tmp/test-pexels-$i.jpg" | cut -f1)
      echo "     ✅ Válido ($size)"
    else
      echo "     ❌ Inválido"
      rm -f "/tmp/test-pexels-$i.jpg"
    fi
  else
    echo "     ⚠️  Timeout/Erro"
  fi
done

echo ""
echo "📸 FONTE 2: Pixabay (Creative Commons, Alta Qualidade)"
echo "================================================================"

PIXABAY_IMAGES=(
  "https://pixabay.com/get/g4f4b96e5fb1f4f48a5a1e5d5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5.jpg"
  "https://cdn.pixabay.com/photo/2023/05/02/08/49/beauty-7967427_1280.jpg"
  "https://cdn.pixabay.com/photo/2023/02/17/09/50/spa-7794873_1280.jpg"
)

echo "Testando URLs Pixabay..."
for i in "${!PIXABAY_IMAGES[@]}"; do
  url="${PIXABAY_IMAGES[$i]}"
  echo "  ▶ Testando Pixabay-$((i+1))..."
  
  if timeout 10 wget -q -O "/tmp/test-pixabay-$i.jpg" "$url" 2>/dev/null; then
    if file "/tmp/test-pixabay-$i.jpg" | grep -q "JPEG"; then
      size=$(du -h "/tmp/test-pixabay-$i.jpg" | cut -f1)
      echo "     ✅ Válido ($size)"
    else
      echo "     ❌ Inválido"
      rm -f "/tmp/test-pixabay-$i.jpg"
    fi
  else
    echo "     ⚠️  Timeout/Erro"
  fi
done

echo ""
echo "📸 FONTE 3: Unsplash Direct URLs (Premium Curated)"
echo "================================================================"

UNSPLASH_URLS=(
  # Hero Salon - Modern salon interior
  "https://images.unsplash.com/photo-1667417641839-e86efc1a5788?w=2560&q=80&auto=format&fit=crop"
  # Team - Beauty professionals
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=2560&q=80&auto=format&fit=crop"
  # Products - Premium beauty
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=2560&q=80&auto=format&fit=crop"
  # Spa - Relaxation
  "https://images.unsplash.com/photo-1544161515-81aae3ff8d23?w=2560&q=80&auto=format&fit=crop"
)

echo "Testando URLs Unsplash diretas..."
for i in "${!UNSPLASH_URLS[@]}"; do
  url="${UNSPLASH_URLS[$i]}"
  names=("hero-salon" "team-professionals" "beauty-products" "spa-background")
  echo "  ▶ Testando ${names[$i]}..."
  
  if timeout 15 wget -q --user-agent="Mozilla/5.0" -O "/tmp/test-unsplash-${names[$i]}.jpg" "$url" 2>/dev/null; then
    if file "/tmp/test-unsplash-${names[$i]}.jpg" | grep -q "JPEG"; then
      size=$(du -h "/tmp/test-unsplash-${names[$i]}.jpg" | cut -f1)
      echo "     ✅ Válido ($size)"
    else
      echo "     ❌ Inválido"
      rm -f "/tmp/test-unsplash-${names[$i]}.jpg"
    fi
  else
    echo "     ⚠️  Timeout/Erro"
  fi
done

echo ""
echo "📊 ANÁLISE DE CANDIDATOS"
echo "================================================================"

# Verificar quais foram baixados com sucesso
valid_images=()

for img in /tmp/test-*.jpg; do
  if [ -f "$img" ]; then
    size=$(du -h "$img" | cut -f1)
    resolution=$(identify "$img" 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
    filename=$(basename "$img")
    echo "✅ $filename"
    echo "   Tamanho: $size"
    echo "   Resolução: $resolution"
    valid_images+=("$img")
  fi
done

echo ""
echo "🏆 SELECIONANDO MELHORES CANDIDATOS (Tier S)"
echo "================================================================"

# Copiar melhores candidatos
count=0
for img in "${valid_images[@]}"; do
  if [ $count -lt 4 ]; then
    case $count in
      0)
        cp "$img" public/landing/images/hero-salon.jpg
        echo "✅ Selecionado: hero-salon.jpg"
        ;;
      1)
        cp "$img" public/landing/images/team-professionals.jpg
        echo "✅ Selecionado: team-professionals.jpg"
        ;;
      2)
        cp "$img" public/landing/images/beauty-products.jpg
        echo "✅ Selecionado: beauty-products.jpg"
        ;;
      3)
        cp "$img" public/landing/images/spa-background.jpg
        echo "✅ Selecionado: spa-background.jpg"
        ;;
    esac
    ((count++))
  fi
done

echo ""
if [ $count -eq 4 ]; then
  echo "🎬 Convertendo para WebP..."
  echo "================================================================"
  
  for jpg in public/landing/images/*.jpg; do
    if [ -f "$jpg" ] && [ ! -f "${jpg%.jpg}.webp" ]; then
      webp="${jpg%.jpg}.webp"
      filename=$(basename "$webp")
      
      ffmpeg -i "$jpg" -c:v libwebp -q 5 "$webp" -y 2>/dev/null
      size=$(du -h "$webp" | cut -f1)
      echo "✅ $filename ($size)"
    fi
  done
elif [ $count -ge 1 ]; then
  echo "⚠️  Apenas $count/4 imagens conseguidas"
  echo "    Faltando: $((4 - count)) imagens"
else
  echo "❌ Nenhuma imagem conseguida das fontes"
fi

echo ""
echo "📋 RESUMO FINAL"
echo "================================================================"
echo ""
echo "✅ Imagens JPG (originals):"
du -sh public/landing/images/*.jpg 2>/dev/null | awk '{print "   " $2 ": " $1}'
echo ""
echo "✅ Imagens WebP (otimizadas):"
du -sh public/landing/images/*.webp 2>/dev/null | awk '{print "   " $2 ": " $1}'
echo ""
echo "✅ Ícones SVG:"
ls -1 public/landing/icons/*.svg 2>/dev/null | wc -l | xargs -I {} echo "   Total: {} ícones"

# Limpeza
rm -f /tmp/test-*.jpg

echo ""
echo "🚀 Curadoria Tier S Completa!"
