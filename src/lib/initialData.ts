import { Property, Development, LandingPage, SiteSettings } from '../types';

export const initialSiteSettings: SiteSettings = {
  brokerName: "Luiz Carlos Fraga",
  creci: "12234",
  bio: "Consultor de imóveis | Vende | Aluga | Administra | Avalia | Fale comigo e encontre seu imóvel",
  aboutText: "Sou Luiz Carlos Fraga, CRECI 12234. Atuo como consultor de imóveis em Olinda/PE oferecendo atendimento completo em venda, locação, administração e avaliação. Fale comigo e vamos encontrar juntos a melhor opção para você.",
  address: "Rua Tertuliano Francisco Feitosa, 80 – Casa Caiada, Olinda, PE, CEP 53130-330",
  phone: "+55 81 98531-3434",
  whatsapp: "5581985313434",
  instagram: "https://www.instagram.com/luizcarlosfragacorretor/",
  instagramUser: "@luizcarlosfragacorretor",
  primaryColor: "#C5A059",
  secondaryColor: "#16161D",
  heroTitle: "Encontre seu próximo imóvel em Olinda com quem realmente entende do mercado local.",
  heroSubtitle: "Consultoria imobiliária personalizada em Casa Caiada, Bairro Novo, Rio Doce e adjacências. Atendimento ético, seguro e ágil em venda, locação, administração e avaliação."
};

export const initialDevelopments: Development[] = [
  {
    id: "dev-fonte-atlantico",
    name: "Edifício Fonte Atlântico",
    slug: "edificio-fonte-atlantico",
    code: "EMP-001",
    neighborhood: "Casa Caiada",
    city: "Olinda",
    status: "pronto_para_morar",
    startingPrice: 350000,
    condoFee: 580,
    description: "Empreendimento com excelente localização em Casa Caiada, a poucos metros do mar e dos principais serviços da orla de Olinda. Prédio estruturado com portaria, elevador e área de convivência.",
    features: [
      "Próximo à praia de Casa Caiada",
      "Elevador inteligente",
      "Portaria com controle de acesso",
      "Salão de festas",
      "Central de gás",
      "Garagem coberta"
    ],
    unitsAvailable: 4,
    totalFloors: 10,
    unitsPerFloor: 4,
    images: [
      {
        id: "img-dev-fa-1",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        caption: "Fachada contemporânea com vista privilegiada",
        isCover: true,
        type: "image"
      },
      {
        id: "img-dev-fa-2",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Área comum e lounge de entrada",
        isCover: false,
        type: "image"
      },
      {
        id: "img-dev-fa-3",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Planta confortável e bem iluminada",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    pendingConfirmation: true,
    isPublished: true,
    viewsCount: 342,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "dev-estacao-marcos-freire",
    name: "Edifício Estação Marcos Freire",
    slug: "edificio-estacao-marcos-freire",
    code: "EMP-002",
    neighborhood: "Bairro Novo",
    city: "Olinda",
    status: "pronto_para_morar",
    startingPrice: 990000,
    condoFee: 939,
    description: "Referência em alto padrão na orla de Bairro Novo em Olinda. Apartamentos amplos com vista panorâmica para o mar, acabamento premium, varanda gourmet integrada e condomínio clube completo.",
    features: [
      "Beira-mar / Vista permanente para o mar",
      "Varanda gourmet integrada",
      "Piscina adulto e infantil com deck",
      "Academia climatizada",
      "Salão de jogos e espaço gourmet",
      "Segurança e monitoramento 24h",
      "Vagas de garagem cobertas"
    ],
    unitsAvailable: 2,
    totalFloors: 18,
    unitsPerFloor: 2,
    images: [
      {
        id: "img-dev-emf-1",
        url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
        caption: "Edifício de alto padrão com localização nobre",
        isCover: true,
        type: "image"
      },
      {
        id: "img-dev-emf-2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Living com vista exuberante para o oceano",
        isCover: false,
        type: "image"
      },
      {
        id: "img-dev-emf-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Área de lazer com piscina de borda infinita",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    pendingConfirmation: true,
    isPublished: true,
    viewsCount: 520,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialProperties: Property[] = [
  {
    id: "prop-bairro-novo-275k",
    title: "Apartamento em Bairro Novo com Suíte",
    slug: "apartamento-bairro-novo-50m2",
    code: "LCF-101",
    type: "apartamento",
    transactionType: "venda",
    price: 275000,
    condoFee: 380,
    iptuFee: 95,
    neighborhood: "Bairro Novo",
    city: "Olinda",
    state: "PE",
    addressPrivate: "Rua próxima à Av. Getúlio Vargas, Bairro Novo (Confidencial)",
    areaM2: 50,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpots: 1,
    description: "Excelente oportunidade em Bairro Novo, Olinda. Apartamento de 50 m² com planta inteligente, composto por 2 quartos (sendo 1 suíte), sala para dois ambientes, cozinha planejada e vaga de garagem. Perfeito para morar ou investir na região mais valorizada da cidade.",
    features: [
      "1 Suíte",
      "Varanda com ventilação sul/mar",
      "Vaga de garagem privativa",
      "Elevador",
      "Portão eletrônico",
      "Próximo a supermercados, farmácias e praia"
    ],
    images: [
      {
        id: "img-bn-1",
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        caption: "Sala de estar ampla e arejada",
        isCover: true,
        type: "image"
      },
      {
        id: "img-bn-2",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        caption: "Cozinha e área de serviço",
        isCover: false,
        type: "image"
      },
      {
        id: "img-bn-3",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
        caption: "Suíte aconchegante",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    status: "published",
    pendingConfirmation: true,
    viewsCount: 289,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-rio-doce-170k",
    title: "Apartamento em Rio Doce — Oportunidade Acessível",
    slug: "apartamento-rio-doce-48m2",
    code: "LCF-102",
    type: "apartamento",
    transactionType: "venda",
    price: 170000,
    condoFee: 210,
    iptuFee: 65,
    neighborhood: "Rio Doce",
    city: "Olinda",
    state: "PE",
    addressPrivate: "Rio Doce, Primeira Etapa, Olinda/PE (Confidencial)",
    areaM2: 48,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    description: "Apartamento prático e bem conservado em Rio Doce, Olinda. Ideal para quem busca sair do aluguel com parcelas acessíveis. Ótima localização com transporte coletivo na porta, comércio e escolas próximos.",
    features: [
      "2 quartos bem ventilados",
      "Sala clara",
      "Cozinha integrada",
      "Vaga de estacionamento rotativa",
      "Baixo custo de condomínio",
      "Documentação regular para financiamento"
    ],
    images: [
      {
        id: "img-rd-1",
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        caption: "Ambiente social claro e funcional",
        isCover: true,
        type: "image"
      },
      {
        id: "img-rd-2",
        url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        caption: "Cozinha bem iluminada",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: false,
    status: "published",
    pendingConfirmation: true,
    viewsCount: 198,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-casa-rio-doce-400k",
    title: "Casa Espaçosa em Rio Doce com Quintal e Garagem",
    slug: "casa-rio-doce-160m2-3-quartos",
    code: "LCF-103",
    type: "casa",
    transactionType: "venda",
    price: 400000,
    condoFee: 0,
    iptuFee: 140,
    neighborhood: "Rio Doce",
    city: "Olinda",
    state: "PE",
    addressPrivate: "Rua residencial em Rio Doce, Olinda/PE (Confidencial)",
    areaM2: 160,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpots: 2,
    description: "Casa residencial solta em terreno amplo em Rio Doce. Conta com 3 quartos (1 suíte espaçosa), terraço em L, sala para dois ambientes, cozinha ampla, área de serviço, quintal privativo e 2 vagas de garagem cobertas.",
    features: [
      "Casa solta em lote independente",
      "Terraço espaçoso",
      "1 Suíte master",
      "2 Vagas de garagem",
      "Quintal privativo para lazer ou pets",
      "Cisterna e poço",
      "Rua asfaltada e calma"
    ],
    images: [
      {
        id: "img-crd-1",
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        caption: "Fachada residencial acolhedora",
        isCover: true,
        type: "image"
      },
      {
        id: "img-crd-2",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        caption: "Sala de estar ampla com pé direito alto",
        isCover: false,
        type: "image"
      },
      {
        id: "img-crd-3",
        url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
        caption: "Área externa e terraço",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    status: "published",
    pendingConfirmation: true,
    viewsCount: 312,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-fonte-atlantico-350k",
    title: "Edifício Fonte Atlântico — Apartamento em Casa Caiada",
    slug: "edificio-fonte-atlantico-apartamento-350k",
    code: "LCF-104",
    type: "apartamento",
    transactionType: "venda",
    price: 350000,
    condoFee: 580,
    iptuFee: 120,
    neighborhood: "Casa Caiada",
    city: "Olinda",
    state: "PE",
    addressPrivate: "Casa Caiada, próximo ao Shopping Patteo e Hospital Esperança (Confidencial)",
    areaM2: 72,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpots: 1,
    description: "Excelente unidade no prestigiado Edifício Fonte Atlântico em Casa Caiada. Planta de 72 m² muito bem distribuída: 3 quartos (1 suíte), varanda arejada, sala em L, cozinha planejada e condomínio organizado de R$ 580.",
    features: [
      "Edifício Fonte Atlântico",
      "3 Quartos (1 Suíte)",
      "Varanda com boa ventilação",
      "Prédio com elevador",
      "Condomínio estruturado R$ 580",
      "Excelente localização em Casa Caiada"
    ],
    images: [
      {
        id: "img-fa-1",
        url: "https://images.unsplash.com/photo-1502005229762-ee1b2da97a06?auto=format&fit=crop&w=1200&q=80",
        caption: "Living refinado com varanda",
        isCover: true,
        type: "image"
      },
      {
        id: "img-fa-2",
        url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
        caption: "Suíte principal aconchegante",
        isCover: false,
        type: "image"
      },
      {
        id: "img-fa-3",
        url: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80",
        caption: "Cozinha com armários planejados",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    status: "published",
    developmentId: "dev-fonte-atlantico",
    developmentName: "Edifício Fonte Atlântico",
    pendingConfirmation: true,
    viewsCount: 418,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-estacao-marcos-freire-990k",
    title: "Edifício Estação Marcos Freire — Beira-Mar Bairro Novo",
    slug: "edificio-estacao-marcos-freire-beira-mar-990k",
    code: "LCF-105",
    type: "apartamento",
    transactionType: "venda",
    price: 990000,
    condoFee: 939,
    iptuFee: 310,
    neighborhood: "Bairro Novo",
    city: "Olinda",
    state: "PE",
    addressPrivate: "Avenida Beira-mar de Bairro Novo, Olinda/PE (Confidencial)",
    areaM2: 145,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpots: 2,
    description: "Imóvel de alto padrão com vista definitiva para o mar de Olinda no cobiçado Edifício Estação Marcos Freire. 145 m² privativos, 4 quartos (sendo 2 suítes), sala ampliada para três ambientes, varanda gourmet, dependência completa e condomínio clube de altíssimo nível (R$ 939).",
    features: [
      "Edifício Estação Marcos Freire",
      "Vista panorâmica definitiva para o mar",
      "4 Quartos (2 Suítes)",
      "Varanda gourmet integrada",
      "Condomínio R$ 939 com lazer completo",
      "2 Vagas de garagem cobertas",
      "Piscina, salão nobre e academia"
    ],
    images: [
      {
        id: "img-emf-1",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Vista frontal deslumbrante e varanda espaçosa",
        isCover: true,
        type: "image"
      },
      {
        id: "img-emf-2",
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        caption: "Living com piso em porcelanato e acabamento luxuoso",
        isCover: false,
        type: "image"
      },
      {
        id: "img-emf-3",
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
        caption: "Suíte master com closet e vista mar",
        isCover: false,
        type: "image"
      }
    ],
    isFeatured: true,
    status: "published",
    developmentId: "dev-estacao-marcos-freire",
    developmentName: "Edifício Estação Marcos Freire",
    pendingConfirmation: true,
    viewsCount: 672,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialLandingPages: LandingPage[] = [
  {
    id: "lp-fonte-atlantico",
    title: "Edifício Fonte Atlântico — Casa Caiada, Olinda",
    slug: "fonte-atlantico",
    subtitle: "Apartamento 3 Quartos (1 Suíte) com condomínio acessível de R$ 580 a passos do mar",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
    targetType: "development",
    targetId: "dev-fonte-atlantico",
    customPrice: "R$ 350.000",
    highlightPoints: [
      "Localização valorizada em Casa Caiada",
      "Condomínio estruturado R$ 580",
      "72 m² privativos com 3 quartos (1 suíte)",
      "Prédio com elevador e portaria",
      "Documentação 100% pronta para financiamento"
    ],
    description: "Oportunidade singular em Casa Caiada apresentada por Luiz Carlos Fraga (CRECI 12234). Agende sua visita diretamente pelo WhatsApp e conheça o Edifício Fonte Atlântico.",
    images: [
      {
        id: "lp-fa-img1",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        caption: "Fachada do empreendimento",
        type: "image"
      },
      {
        id: "lp-fa-img2",
        url: "https://images.unsplash.com/photo-1502005229762-ee1b2da97a06?auto=format&fit=crop&w=1200&q=80",
        caption: "Interior sofisticado",
        type: "image"
      }
    ],
    whatsappCustomMessage: "Olá Luiz Carlos Fraga! Vi a oportunidade do Edifício Fonte Atlântico no site e gostaria de agendar uma visita.",
    isActive: true,
    viewsCount: 310,
    leadsCount: 14,
    utmPreset: {
      source: "instagram",
      campaign: "fonte-atlantico-stories",
      medium: "social"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "lp-estacao-marcos-freire",
    title: "Edifício Estação Marcos Freire — Alto Padrão Beira-Mar",
    slug: "estacao-marcos-freire",
    subtitle: "145 m² privativos, 4 quartos, 2 suítes e vista oceânica espetacular em Bairro Novo",
    heroImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    targetType: "development",
    targetId: "dev-estacao-marcos-freire",
    customPrice: "R$ 990.000",
    highlightPoints: [
      "Vista permanente e cinematográfica para o mar",
      "145 m² com varanda gourmet",
      "4 Quartos com 2 Suítes luxuosas",
      "Condomínio clube completo (R$ 939)",
      "2 Vagas cobertas e segurança total"
    ],
    description: "Viver em frente ao mar com elegância e conforto absoluto. Atendimento personalizado com Luiz Carlos Fraga, CRECI 12234.",
    images: [
      {
        id: "lp-emf-img1",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Vista do living para o mar",
        type: "image"
      }
    ],
    whatsappCustomMessage: "Olá Luiz Carlos Fraga! Tenho interesse no Edifício Estação Marcos Freire (Bairro Novo). Pode me enviar mais detalhes?",
    isActive: true,
    viewsCount: 489,
    leadsCount: 22,
    utmPreset: {
      source: "instagram_bio",
      campaign: "marcos-freire-orla",
      medium: "linktree"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "lp-olinda-venda",
    title: "Imóveis Selecionados à Venda em Olinda/PE",
    slug: "olinda-venda",
    subtitle: "Apartamentos e casas em Casa Caiada, Bairro Novo e Rio Doce com consultoria dedicada",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    targetType: "custom",
    customPrice: "A partir de R$ 170.000",
    highlightPoints: [
      "Portfólio verificado e avaliado com precisão",
      "Opções de R$ 170.000 a R$ 990.000+",
      "Assessoria no financiamento e documentação",
      "Atendimento direto com o corretor responsável"
    ],
    description: "Deseja comprar seu imóvel em Olinda? Conte com a assessoria experiente de Luiz Carlos Fraga (CRECI 12234).",
    images: [],
    whatsappCustomMessage: "Olá Luiz Carlos Fraga! Gostaria de receber uma seleção de imóveis à venda em Olinda de acordo com meu perfil.",
    isActive: true,
    viewsCount: 640,
    leadsCount: 31,
    utmPreset: {
      source: "google_ads",
      campaign: "venda-olinda-geral",
      medium: "cpc"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
