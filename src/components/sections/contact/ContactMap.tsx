/**
 * Contact Map - Interactive Location Display
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function ContactMap() {
  const location = {
    name: 'ARCO Desenvolvimento',
    address: 'São Paulo, SP - Brasil',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    description: 'Atendimento presencial e remoto'
  };

  const openInMaps = () => {
    const query = encodeURIComponent(`${location.name} ${location.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const getDirections = () => {
    const query = encodeURIComponent(location.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          Nossa Localização
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Map Placeholder - Interactive Design */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 overflow-hidden">
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-grid-blue-500/[0.05] bg-[size:20px_20px]" />
          
          {/* Map Pin Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing Ring */}
              <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping" />
              <div className="absolute -inset-2 bg-red-500/30 rounded-full animate-pulse" />
              
              {/* Main Pin */}
              <div className="relative w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Location Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-sm">{location.name}</h4>
              <p className="text-xs text-muted-foreground">{location.address}</p>
              <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
            </div>
          </div>

          {/* Click to Open Overlay */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100" onClick={openInMaps}>
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-3">
          <Button
            onClick={openInMaps}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir no Google Maps
          </Button>
          
          <Button
            onClick={getDirections}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <Navigation className="w-4 h-4" />
            Como Chegar
          </Button>
        </div>

        {/* Additional Info */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Atendimento Flexível
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Reuniões presenciais ou online conforme sua preferência
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}