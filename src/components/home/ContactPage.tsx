import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  ShieldCheck, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { buildWhatsAppLink, createLead } from '../../lib/firestoreService';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Quero comprar um imóvel');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await createLead({
      name,
      phone,
      email,
      interestType: 'general',
      message: `Assunto: ${subject}. Mensagem: ${message}`,
      originPage: '/contato'
    });

    setIsSent(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const whatsappDirectUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Vim através da página de contato do site e gostaria de falar com você.`
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 text-[#14151C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] block">
            Fale Diretamente com o Corretor
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111217]">
            Canais de Atendimento
          </h1>
          <p className="text-sm text-gray-600">
            Estamos prontos para atender você em Casa Caiada, Olinda e toda a Região Metropolitana do Recife.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Box */}
            <div className="bg-[#121319] text-white p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider">
                  Luiz Carlos Fraga
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Consultoria Imobiliária
                </h3>
                <p className="text-xs text-gray-400">CRECI 12234 • Olinda/PE</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Endereço de Atendimento:</span>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Telefone / WhatsApp:</span>
                    <a href={`tel:${settings.phone}`} className="hover:text-white font-mono">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Instagram Oficial:</span>
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-[#DFBF7E] hover:underline">
                      {settings.instagramUser}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chamar no WhatsApp Agora</span>
                </a>
              </div>
            </div>

            {/* Credential Note */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DFD2] shadow-sm flex items-center gap-3 text-xs text-gray-700">
              <ShieldCheck className="w-6 h-6 text-[#C5A059] shrink-0" />
              <span>
                Atendimento prestado em estrita conformidade com o código de ética dos corretores de imóveis e a legislação vigente (CRECI-PE).
              </span>
            </div>

          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DFD2] shadow-sm space-y-6">
              
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#111217]">
                  Envie uma Mensagem
                </h3>
                <p className="text-xs text-gray-600">
                  Preencha o formulário abaixo para receber retorno rápido de Luiz Carlos Fraga.
                </p>
              </div>

              {isSent ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-lg text-emerald-950">Mensagem Enviada!</h4>
                  <p className="text-xs text-emerald-800">
                    Obrigado pelo contato. Em breve entraremos em contato através do WhatsApp ou telefone informado.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-700 font-semibold">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3.5 py-2.5 text-sm text-[#14151C] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-700 font-semibold">WhatsApp com DDD *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(81) 98531-3434"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3.5 py-2.5 text-sm text-[#14151C] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-700 font-semibold">E-mail (opcional)</label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3.5 py-2.5 text-sm text-[#14151C] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-700 font-semibold">Assunto</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3 py-2.5 text-sm text-[#14151C] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="Quero comprar um imóvel">Quero comprar um imóvel</option>
                        <option value="Quero alugar um imóvel">Quero alugar um imóvel</option>
                        <option value="Quero vender meu imóvel">Quero vender meu imóvel</option>
                        <option value="Administração / Avaliação">Administração / Avaliação</option>
                        <option value="Outros">Outros assuntos</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">Mensagem / Detalhes</label>
                    <textarea
                      rows={4}
                      placeholder="Descreva suas preferências, bairro desejado, faixa de valor ou dúvida..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl p-3 text-sm text-[#14151C] focus:outline-none focus:border-[#C5A059] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#15161E] hover:bg-[#252735] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C5A059]" />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
