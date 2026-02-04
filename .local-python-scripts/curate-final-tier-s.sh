#!/bin/bash
# TIER S Image Curation - Estratégia Final
# URLs testadas e verificadas como funcionais
set -e

echo "🎨 TIER S IMAGE CURATION - Final Strategy"
echo "================================================================"

mkdir -p public/landing/images

echo ""
echo "📥 Baixando imagens curadas (Tier S)..."
echo "================================================================"

# Imagens verificadas que funcionam
declare -A IMAGES=(
  ["hero-salon"]="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=2560&q=80&auto=format&fit=crop"
  ["team-professionals"]="https://images.unsplash.com/photo-1616763355603-9755a640a287?w=2560&q=80&auto=format&fit=crop"
  ["beauty-products"]="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=2560&q=80&auto=format&fit=crop"
  ["spa-background"]="https://images.unsplash.com/photo-1544161515-81aae3ff8d23?w=2560&q=80&auto=format&fit=crop"
)

SUCCESS=0
FAILED=0

for name in "${!IMAGES[@]}"; do
  url="${IMAGES[$name]}"
  file="public/landing/images/${name}.jpg"
  
  echo "▶ Baixando $name..."
  
  if wget -q --user-agent="Mozilla/5.0 (X11; Linux x86_64)" -O "$file" "$url" 2>/dev/null; then
    if file "$file" | grep -q "JPEG"; then
      size=$(du -h "$file" | cut -f1)
      res=$(identify "$file" 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
      echo "   ✅ $name ($size, $res)"
      ((SUCCESS++))
    else
      echo "   ❌ Inválido: $name"
      rm -f "$file"
      ((FAILED++))
    fi
  else
    echo "   ⚠️  Erro ao baixar $name"
    ((FAILED++))
  fi
done

echo ""
echo "📊 RESULTADO"
echo "================================================================"
echo "✅ Sucesso: $SUCCESS/4"
echo "❌ Falhas: $FAILED/4"
echo ""

if [ $SUCCESS -ge 3 ]; then
  echo "🎬 Convertendo para WebP (TIER S Optimization)..."
  echo "================================================================"
  
  for jpg in public/landing/images/*.jpg; do
    if [ -f "$jpg" ]; then
      webp="${jpg%.jpg}.webp"
      filename=$(basename "$webp")
      
      if ffmpeg -i "$jpg" -c:v libwebp -q 5 "$webp" -y 2>/dev/null; then
        size=$(du -h "$webp" | cut -f1)
        echo "✅ $filename ($size)"
      fi
    fi
  done
fi

echo ""
echo "📋 ESTRUTURA FINAL"
echo "================================================================"
echo ""
echo "📸 Imagens JPG:"
du -sh public/landing/images/*.jpg 2>/dev/null | sort -h | awk '{print "   " $2 ": " $1}'
echo ""
echo "🎬 Imagens WebP:"
du -sh public/landing/images/*.webp 2>/dev/null | sort -h | awk '{print "   " $2 ": " $1}'
echo ""
echo "🎨 Ícones SVG:"
icon_count=$(ls -1 public/landing/icons/*.svg 2>/dev/null | wc -l)
total_size=$(du -sh public/landing/icons 2>/dev/null | cut -f1)
echo "   Total: $icon_count ícones ($total_size)"

echo ""
echo "📈 ESTATÍSTICAS TIER S"
echo "================================================================"

jpg_size=$(du -sh public/landing/images/*.jpg 2>/dev/null | awk '{sum+=$1} END {print sum}')
webp_size=$(du -sh public/landing/images/*.webp 2>/dev/null | awk '{sum+=$1} END {print sum}')
total_size=$(du -sh public/landing 2>/dev/null | cut -f1)

echo "JPG Total: $jpg_size"
echo "WebP Total: $webp_size"
echo "Espaço Total: $total_size"

# Calculate compression ratio
jpg_bytes=$(find public/landing/images -name "*.jpg" -exec du -b {} + 2>/dev/null | awk '{sum+=$1} END {print sum}')
webp_bytes=$(find public/landing/images -name "*.webp" -exec du -b {} + 2>/dev/null | awk '{sum+=$1} END {print sum}')

if [ ! -z "$jpg_bytes" ] && [ "$jpg_bytes" -gt 0 ] && [ ! -z "$webp_bytes" ]; then
  ratio=$(echo "scale=1; ($jpg_bytes - $webp_bytes) * 100 / $jpg_bytes" | bc)
  echo "Compressão WebP: ${ratio}%"
fi

echo ""
echo "✅ TIER S Curadoria Completa!"
