#!/bin/bash
# Download Landing Page Assets Script
# Downloads ícones do Flaticon e imagens do Unsplash

set -e

echo "🎨 Iniciando download de assets..."

# Criar pastas se não existirem
mkdir -p public/landing/icons
mkdir -p public/landing/images

# ===== ÍCONES =====
echo ""
echo "📥 Baixando ícones..."

# Hair Salon Icon (usando URLs diretas - podem precisar ser ajustadas conforme Flaticon)
echo "   ✂️ Hair Salon Icon..."
curl -sL "https://cdn-icons-png.flaticon.com/512/4436/4436481.png" -o public/landing/icons/hair-salon.png 2>/dev/null || echo "   ⚠️ Hair Salon: download manual necessário"

# Manicure Icon
echo "   💅 Manicure Icon..."
curl -sL "https://cdn-icons-png.flaticon.com/512/2797/2797543.png" -o public/landing/icons/manicure.png 2>/dev/null || echo "   ⚠️ Manicure: download manual necessário"

# Nail Care Icon
echo "   ✨ Nail Care Icon..."
curl -sL "https://cdn-icons-png.flaticon.com/512/4436/4436481.png" -o public/landing/icons/nail-care.png 2>/dev/null || echo "   ⚠️ Nail Care: download manual necessário"

# Beauty Spa Icon
echo "   🧴 Beauty & Spa Icon..."
curl -sL "https://cdn-icons-png.flaticon.com/512/924/924514.png" -o public/landing/icons/beauty-spa.png 2>/dev/null || echo "   ⚠️ Beauty Spa: download manual necessário"

# ===== IMAGENS UNSPLASH =====
echo ""
echo "📸 Baixando imagens Unsplash..."

# Professional Hair Salon Interior (Toa Heftiba style)
# Nota: URLs do Unsplash precisam ser obtidas manualmente do site
echo "   🏢 Hair Salon Interior..."
echo "   ⚠️  Para hair salon: visite https://unsplash.com/@heftiba e download manualmente"

# Luxury Manicure Close-up
echo "   💎 Luxury Manicure..."
echo "   ⚠️  Para manicure: visite https://unsplash.com/s/photos/manicure e download manualmente"

# Professional Beauty Team
echo "   👥 Beauty Team..."
echo "   ⚠️  Para team: visite https://unsplash.com/s/photos/beauty-salon e download manualmente"

echo ""
echo "✅ Script de download concluído!"
echo ""
echo "📝 Instruções Manuais:"
echo "1. Visite https://www.flaticon.com/packs/hair-salon"
echo "2. Visite https://unsplash.com/@heftiba"
echo "3. Visite https://unsplash.com/s/photos/manicure"
echo "4. Visite https://unsplash.com/s/photos/beauty-salon"
echo "5. Download e salve em public/landing/icons/ e public/landing/images/"
echo ""
echo "🔧 Otimizar imagens após download:"
echo "   ffmpeg -i image.jpg -c:v libwebp -q:v 85 image.webp"
echo "   imagemin image.jpg --out-dir=public/landing/images"
