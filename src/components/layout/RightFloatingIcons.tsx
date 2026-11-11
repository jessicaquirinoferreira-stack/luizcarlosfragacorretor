import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface RightFloatingIconsProps {
  whatsappMessage?: string;
  instagramUrl?: string;
}

export const RightFloatingIcons: React.FC<RightFloatingIconsProps> = ({
  whatsappMessage = 'Olá Luiz Carlos Fraga! Vim através do site e gostaria de atendimento imobiliário.',
  instagramUrl = 'https://www.instagram.com/luizcarlosfragacorretor/'
}) => {
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5">
      {/* WhatsApp Official Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20 group relative"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-black">
          1
        </span>
        <svg className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-2.972-1.484-4.925-2.656-6.883-6.035-.147-.253-.016-.388.111-.513.113-.112.253-.298.379-.447.126-.149.168-.258.252-.43.084-.172.042-.321-.021-.449-.063-.127-.57-1.382-.782-1.89-.207-.502-.418-.434-.57-.442-.148-.008-.317-.008-.486-.008s-.444.063-.676.321c-.232.258-.89 869-.89 2.12s.912 2.457 1.039 2.629c.127.172 1.794 2.739 4.342 3.842 2.548 1.103 2.548.735 3.018.686.47-.049 1.522-.622 1.737-1.223.215-.601.215-1.116.151-1.223z"/>
        </svg>
      </a>

      {/* Instagram Official Floating Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] hover:opacity-95 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20 group relative"
        aria-label="Instagram Oficial"
        title="Instagram @luizcarlosfragacorretor"
      >
        <Instagram className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
