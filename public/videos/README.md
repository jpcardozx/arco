# 🎬 Video Assets

## Estrutura de Pastas

```
videos/
├── hero-free.mp4              # Free page hero video
├── hero-assessment.mp4        # Assessment page hero video
├── hero-methodology.mp4       # Metodologia page hero video
├── hero-services.mp4          # Services page hero video
├── hero-contact.mp4           # Contact page hero video
│
├── posters/                   # Fallback images (primeiro frame do vídeo)
│   ├── free.jpg
│   ├── assessment.jpg
│   ├── methodology.jpg
│   ├── services.jpg
│   └── contact.jpg
│
└── mobile/                    # (Opcional) Versões otimizadas para mobile
    ├── hero-free-mobile.mp4
    ├── hero-assessment-mobile.mp4
    ├── hero-methodology-mobile.mp4
    ├── hero-services-mobile.mp4
    └── hero-contact-mobile.mp4
```

## Especificações Recomendadas

### Vídeos Desktop (Obrigatório)
- **Formato:** MP4 (H.264)
- **Resolução:** 1920x1080 (Full HD)
- **Bitrate:** 3-5 Mbps
- **Frame Rate:** 30fps
- **Duração:** 10-15 segundos (loop)
- **Audio:** Remover (muted)
- **File Size:** Target < 10 MB
- **Faststart:** Enabled (streaming)

### Vídeos Mobile (Opcional)
- **Formato:** MP4 (H.264)
- **Resolução:** 1280x720 (HD)
- **Bitrate:** 1-2 Mbps
- **File Size:** Target < 4 MB
- Mesmo frame rate e duração do desktop

### Posters (Obrigatório)
- **Formato:** JPG
- **Resolução:** 1920x1080
- **Qualidade:** 85-90%
- **File Size:** Target < 200 KB
- **Extraído:** Primeiro frame do vídeo (ou frame mais representativo)

## Otimização com FFmpeg

### Desktop Version:
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf scale=1920:1080 \
  -an \
  -movflags +faststart \
  hero-[page].mp4
```

### Mobile Version:
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 30 \
  -preset slow \
  -vf scale=1280:720 \
  -an \
  -movflags +faststart \
  mobile/hero-[page]-mobile.mp4
```

### Extrair Poster:
```bash
ffmpeg -i hero-[page].mp4 \
  -ss 00:00:00 \
  -vframes 1 \
  -q:v 2 \
  posters/[page].jpg
```

## Recomendações por Página

### /free - Lead Magnet
- **Tema:** Pessoa feliz recebendo notificação, lead chegando
- **Tom de cor:** Teal/Cyan (matching design system)
- **Mood:** Energético, positivo, recompensa

### /assessment - Diagnóstico
- **Tema:** Análise de dados, dashboard, métricas subindo
- **Tom de cor:** Orange/Amber
- **Mood:** Profissional, analítico, confiável

### /metodologia - Processo
- **Tema:** Workflow, timeline, processo step-by-step
- **Tom de cor:** Blue/Cyan
- **Mood:** Sistemático, transparente, educativo

### /services - Serviços
- **Tema:** Equipe trabalhando, colaboração, profissionais
- **Tom de cor:** Purple/Violet
- **Mood:** Premium, sofisticado, competente

### /contato - Contato
- **Tema:** Handshake, conversa, conexão humana
- **Tom de cor:** Teal/Green
- **Mood:** Acolhedor, acessível, confiável

## Fontes de Vídeo Gratuitas

- **Pexels Videos:** https://www.pexels.com/videos/
- **Pixabay Videos:** https://pixabay.com/videos/
- **Coverr:** https://coverr.co/
- **Videvo:** https://www.videvo.net/
- **Unsplash (API):** https://unsplash.com/

## Checklist de Adição

Antes de adicionar vídeos:
- [ ] Vídeos otimizados (H.264, CRF 28-30)
- [ ] Audio track removido
- [ ] Faststart enabled
- [ ] File size < 10 MB cada
- [ ] Posters criados (< 200 KB)
- [ ] Nomes corretos (hero-[page].mp4)
- [ ] Colocados nas pastas corretas

Depois de adicionar:
- [ ] Test lazy loading
- [ ] Test fade-in animation
- [ ] Test mobile (pause se configurado)
- [ ] Lighthouse performance (LCP < 2.5s)
- [ ] Visual quality check

## Status Atual

```
videos/
├── ❌ hero-free.mp4              (aguardando)
├── ❌ hero-assessment.mp4        (aguardando)
├── ❌ hero-methodology.mp4       (aguardando)
├── ❌ hero-services.mp4          (aguardando)
├── ❌ hero-contact.mp4           (aguardando)
│
└── posters/
    ├── ❌ free.jpg               (aguardando)
    ├── ❌ assessment.jpg         (aguardando)
    ├── ❌ methodology.jpg        (aguardando)
    ├── ❌ services.jpg           (aguardando)
    └── ❌ contact.jpg            (aguardando)
```

**Quando adicionar os vídeos, marque com ✅**

## Suporte

Em caso de dúvida sobre especificações ou otimização, consultar:
- `docs/VIDEO_HERO_IMPLEMENTATION.md` (guia completo)
- `src/components/ui/VideoBackground.tsx` (componente)
