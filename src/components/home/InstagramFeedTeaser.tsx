import React from 'react';
import { Instagram, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { SiteSettings } from '../../types';

interface InstagramFeedTeaserProps {
  settings: SiteSettings;
  onSelectHashtagProperty?: (slug: string) => void;
}

export const InstagramFeedTeaser: React.FC<InstagramFeedTeaserProps> = ({
  settings,
  onSelectHashtagProperty
}) => {
  const feedPosts = [
    {
      title: "Edifício Estação Marcos Freire",
      price: "R$ 990.000",
      details: "Bairro Novo • Beira-Mar • 4 qtos (2 suítes) • Cond. R$ 939",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      tag: "Alto Padrão"
    },
    {
      title: "Edifício Fonte Atlântico",
      price: "R$ 350.000",
      details: "Casa Caiada • 3 qtos (1 suíte) • 72 m² • Cond. R$ 580",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      tag: "Oportunidade"
    },
    {
      title: "Apartamento em Bairro Novo",
      price: "A partir de R$ 275.000",
      details: "2 quartos (1 suíte) • 50 m² • Próximo à praia",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      tag: "Bairro Novo"
    },
    {
      title: "Casa em Rio Doce",
      price: "R$ 400.000",
      details: "3 quartos (1 suíte) • 160 m² • 2 vagas de garagem",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
      tag: "Rio Doce"
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] text-[#14151C] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E8E2D5]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              Instagram Oficial • @luizcarlosfragacorretor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111217]">
              Novidades e Oportunidades do Feed
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Acompanhe publicações, bastidores de visitas e novos imóveis anunciados em primeira mão.
            </p>
          </div>

          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir @luizcarlosfragacorretor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedPosts.map((post, idx) => (
            <a
              key={idx}
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl overflow-hidden border border-[#E5DFD2] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-56 bg-black overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-[#DFBF7E] border border-[#C5A059]/40 backdrop-blur-sm">
                  {post.tag}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs text-[#DFBF7E] font-bold block">{post.price}</span>
                  <h4 className="font-serif font-bold text-sm text-white line-clamp-1">{post.title}</h4>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {post.details}
                </p>

                <div className="pt-3 mt-2 border-t border-[#F0EBE0] flex items-center justify-between text-[11px] text-[#8C6F36] font-semibold">
                  <span>Ver publicação</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Instagram Disclaimer */}
        <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E0D8C8] text-xs text-gray-700 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-[#8C6F36] shrink-0" />
          <span>
            As artes e publicações do feed são registros históricos do corretor Luiz Carlos Fraga. Valores e disponibilidades passam por validação contínua. Fale diretamente no WhatsApp para confirmação em tempo real.
          </span>
        </div>

      </div>
    </section>
  );
};
