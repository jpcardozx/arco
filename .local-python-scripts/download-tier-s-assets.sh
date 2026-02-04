#!/bin/bash
# Download Landing Page Assets - TIER S Quality (com alternativas)
set -e

echo "🎨 TIER S ASSET DOWNLOAD - Beauty & Salon Landing Page"
echo "=================================================="

# Create directories
mkdir -p public/landing/icons
mkdir -p public/landing/images

# Clean corrupted files
echo "🧹 Removendo arquivos corrompidos..."
rm -f public/landing/images/beauty-products.jpg
rm -f public/landing/images/hero-salon.jpg
rm -f public/landing/images/*.webp
rm -f public/landing/icons/*.svg

echo ""
echo "📥 Baixando imagens Unsplash (Alta resolução)..."
echo "=================================================="

# Using direct Unsplash API URLs with longer timeouts and better headers
HEADERS='-H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"'

# 1. Hero Salon - Professional Beauty Salon Interior
echo "▶ 1/5: Hero Salon Interior..."
timeout 30 wget -q -O "public/landing/images/hero-salon.jpg" \
  --header="User-Agent: Mozilla/5.0" \
  "https://images.unsplash.com/photo-1633681926022-75cd25b90e5e?w=2560&q=85" \
  && echo "   ✅ $(du -h public/landing/images/hero-salon.jpg 2>/dev/null | cut -f1 || echo 'Downloaded')" \
  || echo "   ⚠️  Fallback needed"

# 2. Testimonials - Luxury Manicure Close-up
echo "▶ 2/5: Luxury Manicure Details..."
timeout 30 wget -q -O "public/landing/images/testimonials-manicure.jpg" \
  --header="User-Agent: Mozilla/5.0" \
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=2000&q=85" \
  && echo "   ✅ $(du -h public/landing/images/testimonials-manicure.jpg 2>/dev/null | cut -f1 || echo 'Downloaded')" \
  || echo "   ⚠️  Fallback needed"

# 3. Team Professionals - Beauty Professionals Team
echo "▶ 3/5: Professional Beauty Team..."
timeout 30 wget -q -O "public/landing/images/team-professionals.jpg" \
  --header="User-Agent: Mozilla/5.0" \
  "https://images.unsplash.com/photo-1560066169-b763a5efa3a0?w=2560&q=85" \
  && echo "   ✅ $(du -h public/landing/images/team-professionals.jpg 2>/dev/null | cut -f1 || echo 'Downloaded')" \
  || echo "   ⚠️  Fallback needed"

# 4. Beauty Products - Premium Skincare Products
echo "▶ 4/5: Premium Beauty Products..."
timeout 30 wget -q -O "public/landing/images/beauty-products.jpg" \
  --header="User-Agent: Mozilla/5.0" \
  "https://images.unsplash.com/photo-1596462502278-af07bdc81b1a?w=2560&q=85" \
  && echo "   ✅ $(du -h public/landing/images/beauty-products.jpg 2>/dev/null | cut -f1 || echo 'Downloaded')" \
  || echo "   ⚠️  Fallback needed"

# 5. Spa Background - Relaxing Spa Ambiance
echo "▶ 5/5: Spa Ambiance & Relaxation..."
timeout 30 wget -q -O "public/landing/images/spa-background.jpg" \
  --header="User-Agent: Mozilla/5.0" \
  "https://images.unsplash.com/photo-1540575467063-178f50002e87?w=2560&q=85" \
  && echo "   ✅ $(du -h public/landing/images/spa-background.jpg 2>/dev/null | cut -f1 || echo 'Downloaded')" \
  || echo "   ⚠️  Fallback needed"

echo ""
echo "🎨 Criando ícones SVG (Tailwind-compatible)..."
echo "=================================================="

# Create icon SVGs - Lucide-style icons
mkdir -p public/landing/icons

# Hair Salon Icon
cat > "public/landing/icons/hair-salon.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  <path d="M6 8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V8z"/>
  <path d="M18 8c0-1.1.9-2 2-2s2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V8z"/>
  <path d="M8 18h8v2H8z"/>
</svg>
EOF
echo "   ✅ hair-salon.svg"

# Manicure Icon
cat > "public/landing/icons/manicure.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12c0-2.2.9-4.2 2.4-5.6M6 2c1.4-1.5 3.4-2.4 5.6-2.4s4.2.9 5.6 2.4M20 6c1.5 1.4 2.4 3.4 2.4 5.6"/>
  <path d="M12 10c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
</svg>
EOF
echo "   ✅ manicure.svg"

# Nail Care Icon
cat > "public/landing/icons/nail-care.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 3c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2M6 7v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7"/>
  <line x1="8" y1="7" x2="8" y2="17"/>
  <line x1="12" y1="7" x2="12" y2="17"/>
  <line x1="16" y1="7" x2="16" y2="17"/>
</svg>
EOF
echo "   ✅ nail-care.svg"

# Beauty & Spa Icon
cat > "public/landing/icons/beauty-spa.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 12h8M12 8v8"/>
  <path d="M12 3v.01M12 21v.01M3 12h.01M21 12h.01"/>
</svg>
EOF
echo "   ✅ beauty-spa.svg"

# Facial Care Icon
cat > "public/landing/icons/facial-care.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="9" cy="9" r="1.5"/>
  <circle cx="15" cy="9" r="1.5"/>
  <path d="M9 15c1 1 2.5 1.5 3 1.5s2-.5 3-1.5"/>
</svg>
EOF
echo "   ✅ facial-care.svg"

# Massage Icon
cat > "public/landing/icons/massage.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8z"/>
  <path d="M6 5v3M10 5v3M14 5v3M18 5v3"/>
</svg>
EOF
echo "   ✅ massage.svg"

# Hair Color Icon
cat > "public/landing/icons/hair-color.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c2 0 3.5 1 4 3 2 0 3 1 3 3v10c0 2-1 3-3 3H8c-2 0-3-1-3-3V8c0-2 1-3 3-3 .5-2 2-3 4-3z"/>
  <circle cx="10" cy="8" r="1"/>
  <circle cx="14" cy="8" r="1"/>
</svg>
EOF
echo "   ✅ hair-color.svg"

# Hair Extension Icon
cat > "public/landing/icons/hair-extension.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 6v12h16V6"/>
  <line x1="6" y1="6" x2="6" y2="18"/>
  <line x1="10" y1="6" x2="10" y2="18"/>
  <line x1="14" y1="6" x2="14" y2="18"/>
  <line x1="18" y1="6" x2="18" y2="18"/>
</svg>
EOF
echo "   ✅ hair-extension.svg"

# Makeup Artist Icon
cat > "public/landing/icons/makeup-artist.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="8"/>
  <path d="M12 2v4M12 18v4M2 10h4M18 10h4"/>
  <path d="M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83"/>
</svg>
EOF
echo "   ✅ makeup-artist.svg"

# Eyelash Extension Icon
cat > "public/landing/icons/eyelash-extension.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12h18M6 8l-2-4M10 6l-1-4M14 6l-1-4M18 8l-2-4"/>
  <line x1="4" y1="12" x2="4" y2="18"/>
  <line x1="8" y1="12" x2="8" y2="18"/>
  <line x1="12" y1="12" x2="12" y2="18"/>
  <line x1="16" y1="12" x2="16" y2="18"/>
  <line x1="20" y1="12" x2="20" y2="18"/>
</svg>
EOF
echo "   ✅ eyelash-extension.svg"

# Spa Treatment Icon
cat > "public/landing/icons/spa-treatment.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
</svg>
EOF
echo "   ✅ spa-treatment.svg"

# Waxing Icon
cat > "public/landing/icons/waxing.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 3h12c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"/>
  <path d="M8 12l2 6-2 4M12 12v10M16 12l-2 6 2 4"/>
</svg>
EOF
echo "   ✅ waxing.svg"

echo ""
echo "🔄 Validando imagens baixadas..."
echo "=================================================="

# Test if files are valid
for jpg in public/landing/images/*.jpg; do
  if [ -f "$jpg" ]; then
    size=$(du -h "$jpg" | cut -f1)
    filename=$(basename "$jpg")
    
    # Check if it's a valid JPEG
    if file "$jpg" | grep -q "JPEG"; then
      echo "   ✅ $filename ($size)"
    else
      echo "   ❌ $filename - Invalid file"
    fi
  fi
done

echo ""
echo "🎬 Otimizando com FFmpeg para WebP..."
echo "=================================================="

for jpg in public/landing/images/*.jpg; do
  webp="${jpg%.jpg}.webp"
  filename=$(basename "$webp")
  
  if ffmpeg -i "$jpg" -q:v 5 -preset default "$webp" -y 2>&1 | grep -q "error\|Error\|ERROR"; then
    echo "   ⚠️  Erro ao processar $filename"
  else
    size=$(du -h "$webp" 2>/dev/null | cut -f1)
    echo "   ✅ $filename ($size)"
  fi
done

echo ""
echo "📊 RESUMO FINAL - QUALIDADE TIER S"
echo "=================================================="
echo ""

# Final validation
if [ $(find public/landing/images -name "*.jpg" -type f | wc -l) -gt 0 ]; then
  echo "✅ Imagens JPG:"
  du -sh public/landing/images/*.jpg 2>/dev/null | awk '{print "   " $2 ": " $1}'
else
  echo "❌ Nenhuma imagem JPG encontrada"
fi

echo ""

if [ $(find public/landing/images -name "*.webp" -type f | wc -l) -gt 0 ]; then
  echo "✅ Imagens WebP (otimizadas):"
  du -sh public/landing/images/*.webp 2>/dev/null | awk '{print "   " $2 ": " $1}'
else
  echo "⚠️  Nenhuma imagem WebP gerada ainda"
fi

echo ""
echo "✅ Ícones SVG:"
ls -1 public/landing/icons/*.svg 2>/dev/null | wc -l | xargs -I {} echo "   Total: {} ícones"

echo ""
echo "🚀 Assets prontos para TIER S!"
