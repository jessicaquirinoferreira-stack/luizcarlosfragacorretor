import React from 'react';
import { 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  MessageCircle, 
  AlertCircle,
  Eye,
  Building
} from 'lucide-react';
import { Property } from '../../types';
import { formatCurrency, formatArea } from '../../lib/formatters';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onScheduleVisit
}) => {
  const coverImage = 
    property.images.find(img => img.isCover)?.url ||
    property.images[0]?.url ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  const whatsappMessage = `Olá Luiz Carlos Fraga! Gostaria de informações sobre o imóvel "${property.title}" (Cód. ${property.code || property.id}) anunciado no site.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E5E0D5] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Media & Tag Header */}
      <div 
        className="relative h-64 overflow-hidden bg-gray-900 cursor-pointer"
        onClick={() => onSelect(property)}
      >
        <img
          src={coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded shadow ${
              property.transactionType === 'venda' 
                ? 'bg-[#C5A059] text-black' 
                : 'bg-emerald-600 text-white'
            }`}>
              {property.transactionType === 'venda' ? 'Venda' : 'Locação'}
            </span>

            {property.isFeatured && (
              <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-black/70 text-[#DFBF7E] border border-[#C5A059]/50 rounded backdrop-blur-sm">
                Destaque
              </span>
            )}
          </div>

          {property.code && (
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-black/60 text-white rounded backdrop-blur-sm">
              {property.code}
            </span>
          )}
        </div>

        {/* Pending confirmation badge if historical instagram feed item */}
        {property.pendingConfirmation && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-amber-500/90 text-black font-semibold rounded backdrop-blur-sm shadow">
              <AlertCircle className="w-3 h-3" />
              Disponibilidade sujeita a confirmação
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Neighborhood & City */}
          <div className="flex items-center gap-1.5 text-xs text-[#8A7960] font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{property.neighborhood}, {property.city}/{property.state}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)}
            className="font-serif text-lg font-bold text-[#1F1E26] group-hover:text-[#8C6F36] transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {property.title}
          </h3>

          {/* Price & Condo */}
          <div className="mb-4">
            <div className="text-2xl font-extrabold text-[#111217]">
              {formatCurrency(property.price)}
            </div>
            {property.condoFee ? (
              <div className="text-xs text-gray-500 mt-0.5">
                Condomínio: {formatCurrency(property.condoFee)}
              </div>
            ) : null}
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#ECE7DD] text-gray-700 text-xs text-center mb-4">
            <div className="flex flex-col items-center">
              <Maximize2 className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="font-semibold">{formatArea(property.areaM2)}</span>
            </div>
            <div className="flex flex-col items-center">
              <Bed className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="font-semibold">{property.bedrooms} qto{property.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="font-semibold">{property.suites} suíte{property.suites > 1 ? 's' : ''}</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="font-semibold">{property.parkingSpots} vaga{property.parkingSpots > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#15161E] hover:bg-[#252735] text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Detalhes</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 text-xs font-bold rounded-lg bg-[#C5A059] hover:bg-[#D4B066] text-black flex items-center justify-center gap-1.5 transition-colors"
            title="Tirar dúvidas no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
};
