'use client';


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssetChoice {
  icons: string[];
  images: string[];
  styling: string;
}

const ICON_OPTIONS = [
  {
    id: 'flaticon-manicure',
    name: 'Manicure Pack',
    source: 'https://www.flaticon.com/packs/manicure-pedicure-nail-art-tools',
    designer: 'Smalllikeart',
    emoji: '💅',
    color: 'from-pink-500/20 to-pink-500/5',
    borderColor: 'border-pink-500/30 hover:border-pink-500/60',
  },
  {
    id: 'flaticon-nailcare',
    name: 'Nail Care Pack',
    source: 'https://www.flaticon.com/packs/nail-care',
    designer: 'Freepik',
    emoji: '✨',
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
  },
  {
    id: 'figma-beauty-spa',
    name: 'Beauty & Spa Icons',
    source: 'https://www.figma.com/community/file/1281246209155520431/beauty-spa-icons-45-free-pack',
    designer: 'Community Pack',
    emoji: '🧴',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
  },
  {
    id: 'flaticon-hairsalon',
    name: 'Hair Salon Pack',
    source: 'https://www.flaticon.com/packs/hair-salon',
    designer: 'Freepik + Smalllikeart',
    emoji: '✂️',
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
  },
];

const IMAGE_OPTIONS = [
  {
    id: 'unsplash-hairsalon-interior',
    name: 'Hair Salon Interior',
    section: 'Hero Background',
    photographer: 'Toa Heftiba',
    source: 'https://unsplash.com/@heftiba',
    emoji: '🏢',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
  },
  {
    id: 'unsplash-manicure-closeup',
    name: 'Luxury Nails',
    section: 'Testimonials',
    photographer: 'Professional Studio',
    source: 'https://unsplash.com/s/photos/manicure',
    emoji: '💎',
    color: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'border-rose-500/30 hover:border-rose-500/60',
  },
  {
    id: 'unsplash-beauty-team',
    name: 'Beauty Team',
    section: 'Team Section',
    photographer: 'Professionals',
    source: 'https://unsplash.com/s/photos/beauty-salon',
    emoji: '👥',
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
  },
];

const STYLING_OPTIONS = [
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Espaço em branco + cores neutras',
    colors: 'Branco, Cinza, Acentos suaves',
    icon: '◇',
  },
  {
    id: 'modern-elegant',
    name: 'Modern Elegant',
    description: 'Gradientes suaves + tipografia premium',
    colors: 'Preto, Dourado, Tons neutros',
    icon: '✨',
  },
  {
    id: 'vibrant-beauty',
    name: 'Vibrant Beauty',
    description: 'Cores vibrantes + design dinâmico',
    colors: 'Rosa, Roxo, Dourado, Vibrantes',
    icon: '🌈',
  },
  {
    id: 'corporate-premium',
    name: 'Corporate Premium',
    description: 'Design profissional + confiança',
    colors: 'Azul, Branco, Acentos elegantes',
    icon: '■',
  },
];

export default function ChoiceMakePage() {
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedStyling, setSelectedStyling] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleIconToggle = (id: string) => {
    setSelectedIcons((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 4
          ? [...prev, id]
          : prev
    );
  };

  const handleImageToggle = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev
    );
  };

  const isFormComplete =
    selectedIcons.length === 4 && selectedImages.length === 3 && selectedStyling;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      toast({
        title: 'Formulário Incompleto',
        description: 'Por favor, selecione 4 ícones, 3 imagens e 1 estilo',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const choices: AssetChoice = {
        icons: selectedIcons,
        images: selectedImages,
        styling: selectedStyling,
      };

      console.log('✅ Choices submitted:', choices);
      setSubmitted(true);

      toast({
        title: 'Perfeito!',
        description: 'Suas escolhas foram confirmadas com sucesso!',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedIcons([]);
    setSelectedImages([]);
    setSelectedStyling('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Perfeito!</h1>
            <p className="text-lg text-slate-400">
              Suas escolhas foram registradas com sucesso
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {/* Icons Summary */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Ícones Selecionados
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedIcons.map((iconId) => {
                  const icon = ICON_OPTIONS.find((i) => i.id === iconId);
                  return (
                    <div
                      key={iconId}
                      className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <span className="text-2xl">{icon?.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {icon?.name}
                        </p>
                        <p className="text-xs text-slate-400">{icon?.designer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Images Summary */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Imagens Selecionadas
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {selectedImages.map((imageId) => {
                  const image = IMAGE_OPTIONS.find((i) => i.id === imageId);
                  return (
                    <div
                      key={imageId}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <span className="text-2xl">{image?.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {image?.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {image?.section}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Styling Summary */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Estilo Visual
                </h2>
              </div>
              {(() => {
                const style = STYLING_OPTIONS.find(
                  (s) => s.id === selectedStyling
                );
                return (
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <p className="text-sm font-semibold text-white mb-1">
                      {style?.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {style?.description}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Fazer Novas Escolhas
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              Prosseguir
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <Badge className="bg-slate-800/80 border-slate-700/80 text-slate-300">
              Personalize sua página
            </Badge>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Escolha seus <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Assets</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Personalize a página inicial do seu salão de beleza com ícones, imagens e estilo visual de alta qualidade
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  selectedIcons.length === 4
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                }`}
              >
                {selectedIcons.length === 4 ? '✓' : '1'}
              </div>
              <span className="text-sm text-slate-400">Ícones</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                selectedIcons.length === 4 ? 'bg-emerald-500/30' : 'bg-slate-700/30'
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  selectedImages.length === 3
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                }`}
              >
                {selectedImages.length === 3 ? '✓' : '2'}
              </div>
              <span className="text-sm text-slate-400">Imagens</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                selectedImages.length === 3 ? 'bg-emerald-500/30' : 'bg-slate-700/30'
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  selectedStyling
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                }`}
              >
                {selectedStyling ? '✓' : '3'}
              </div>
              <span className="text-sm text-slate-400">Estilo</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section 1: Icons */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💅</span>
              Ícones ({selectedIcons.length}/4)
            </h2>
            <div className="space-y-3">
              {ICON_OPTIONS.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => handleIconToggle(icon.id)}
                  className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                    selectedIcons.includes(icon.id)
                      ? `bg-gradient-to-br ${icon.color} border-2 ${icon.borderColor.split(' ')[0]} ${icon.borderColor.split(' ')[1]}`
                      : `bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50`
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <Checkbox
                      checked={selectedIcons.includes(icon.id)}
                      onChange={() => handleIconToggle(icon.id)}
                      className="mt-0.5"
                    />
                    <div className="text-left flex-1">
                      <p className="font-semibold text-white text-sm">
                        {icon.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {icon.designer}
                      </p>
                    </div>
                    <span className="text-2xl">{icon.emoji}</span>
                  </div>
                  <a
                    href={icon.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 text-xs text-slate-500 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ↗
                  </a>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Images */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🖼️</span>
              Imagens ({selectedImages.length}/3)
            </h2>
            <div className="space-y-3">
              {IMAGE_OPTIONS.map((image) => (
                <button
                  key={image.id}
                  onClick={() => handleImageToggle(image.id)}
                  className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                    selectedImages.includes(image.id)
                      ? `bg-gradient-to-br ${image.color} border-2 ${image.borderColor.split(' ')[0]} ${image.borderColor.split(' ')[1]}`
                      : `bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50`
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleImageToggle(image.id)}
                      className="mt-0.5"
                    />
                    <div className="text-left flex-1">
                      <p className="font-semibold text-white text-sm">
                        {image.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {image.section}
                      </p>
                    </div>
                    <span className="text-2xl">{image.emoji}</span>
                  </div>
                  <a
                    href={image.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 text-xs text-slate-500 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ↗
                  </a>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Styling */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Estilo Visual
            </h2>
            <div className="space-y-3">
              <RadioGroup value={selectedStyling} onValueChange={setSelectedStyling}>
                {STYLING_OPTIONS.map((style) => (
                  <div key={style.id} className="relative">
                    <RadioGroupItem
                      value={style.id}
                      id={style.id}
                      className="hidden"
                    />
                    <Label
                      htmlFor={style.id}
                      className={`block cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                        selectedStyling === style.id
                          ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-2 border-emerald-500/60'
                          : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            selectedStyling === style.id
                              ? 'border-emerald-500 bg-emerald-500/20'
                              : 'border-slate-600'
                          }`}
                        >
                          {selectedStyling === style.id && (
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold text-white text-sm">
                            {style.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {style.description}
                          </p>
                        </div>
                        <span className="text-xl">{style.icon}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-16 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete || loading}
            size="lg"
            className={`relative overflow-hidden rounded-xl px-8 py-6 font-semibold text-lg transition-all duration-300 ${
              isFormComplete
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Enviando...
              </>
            ) : (
              <>
                Confirmar Escolhas
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
