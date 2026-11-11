# SITE IMOBILIÁRIO PREMIUM — LUIZ CARLOS FRAGA | CRECI 12234 | OLINDA/PE

Site público institucional e imobiliário de alto padrão com painel administrativo integrado para o consultor imobiliário **Luiz Carlos Fraga (CRECI 12234)**, referência em Casa Caiada, Bairro Novo, Rio Doce e adjacências em Olinda/PE.

---

## 1. Visão Geral do Projeto

- **Consultor**: Luiz Carlos Fraga | CRECI 12234
- **Instagram Oficial**: [@luizcarlosfragacorretor](https://www.instagram.com/luizcarlosfragacorretor/)
- **WhatsApp Oficial**: [+55 81 98531-3434](https://wa.me/5581985313434)
- **Endereço**: Rua Tertuliano Francisco Feitosa, 80 – Casa Caiada, Olinda, PE, CEP 53130-330
- **Atuação**: Venda, Locação, Administração e Avaliação Mercadológica de Imóveis
- **Diferencial**: Galerias ilimitadas de fotos e vídeos, busca avançada em tempo real com Firestore, geração de landing pages prontas para Instagram Stories/Bio, captação de leads qualificados e agendamento direto de visitas.

---

## 2. Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Canvas Confetti
- **Backend & Database**: Firebase Firestore (Enterprise DB provisionado e blindado por regras ABAC)
- **Autenticação**: Firebase Authentication (Google Sign-In + Credencial do Consultor)
- **Mídia**: Suporte a Vercel Blob e otimizador de fotos/vídeos via HTML5 Canvas (compressão WebP client-side sem perdas)
- **SEO & Social**: Metadados Open Graph dinâmicos, URLs amigáveis, rastreamento UTM automático para redes sociais

---

## 3. Instalação e Execução Local

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev

# 3. Compilação e verificação de tipos
npm run lint
npm run build
```

---

## 4. Configuração do Firebase & Segurança

O projeto já conta com o arquivo `firebase-applet-config.json` e o `firebase-blueprint.json` configurados com:
- `projectId`: `voltaic-compiler-08gvj`
- `firestoreDatabaseId`: `ai-studio-luizcarlosfragac-04fb72d9-5d41-48c2-83cc-362a09b94c91`

### Coleções do Firestore:
1. `siteSettings`: Dados cadastrais do corretor, CRECI, contatos, textos institucionais e identidade visual.
2. `properties`: Imóveis à venda e para locação (apartamentos, casas, coberturas, terrenos).
3. `developments`: Empreendimentos, condomínios e edifícios em Olinda (ex: Edifício Fonte Atlântico, Edifício Estação Marcos Freire).
4. `leads`: CRM com propostas, solicitações de visita e contatos recebidos com status de atendimento.
5. `landingPages`: Campanhas especiais com rastreamento UTM para Instagram, Facebook e WhatsApp.

### Regras de Segurança (`firestore.rules`):
- Leitura pública apenas para registros com `status == 'published'` ou `isPublished == true`.
- Criação pública de leads estritamente validada (sem permissão de leitura por terceiros, protegendo dados de clientes).
- Edição, exclusão e visualização de dados privados e leads restrita a administradores autenticados.

---

## 5. Acesso ao Painel Administrativo

O painel administrativo exclusivo está disponível no botão **"Painel Admin"** no cabeçalho ou através da rota `/#admin`.

- **Login via Google**: Faça login com a conta Google cadastrada.
- **Login por Chave do Consultor**: Pode ser utilizado o número oficial do CRECI (`12234`) ou chave de consultor (`lcf2026`).

### Recursos do Painel:
- **Dashboard**: Métricas de imóveis publicados, empreendimentos, leads e tráfego.
- **CRUD de Imóveis**: Cadastro, edição, duplicação, upload múltiplo de fotos com ordenação de capa, endereço privado confidencial.
- **CRUD de Empreendimentos**: Gestão de condomínios e prédios com unidades vinculadas.
- **CRM de Leads**: Pipeline com status (*Novo*, *Em atendimento*, *Visita solicitada*, *Visita confirmada*, *Proposta*, *Convertido*), notas internas e exportação para CSV.
- **Landing Pages**: Criação de páginas de campanha com links pré-formatados com UTM para Instagram Stories e Bio.
- **Personalização**: Edição de telefones, bio, WhatsApp, CRECI e textos da Home sem mexer no código.

---

## 6. Publicação e Deploy (Vercel)

1. Conecte o repositório à Vercel (`vercel.com`).
2. Defina o comando de build como `npm run build` e o diretório de saída como `dist`.
3. Adicione a variável `BLOB_READ_WRITE_TOKEN` nas variáveis de ambiente da Vercel caso deseje persistir mídias no Vercel Blob Storage.
4. Conecte o domínio próprio (ex: `luizcarlosfragaimoveis.com.br`) nas configurações de domínio da Vercel.

---

## 7. Dados Confirmados do Instagram (Novembro 2026)

- **Nome**: Luiz Carlos Fraga | CRECI 12234
- **Bio**: "Consultor de imóveis | Vende | Aluga | Administra | Avalia | Fale comigo e encontre seu imóvel"
- **WhatsApp**: +55 81 98531-3434
- **Endereço**: Rua Tertuliano Francisco Feitosa, 80 – Casa Caiada, Olinda, PE
- **Exemplos de Portfólio**:
  - Apartamento Bairro Novo (Venda a partir de R$ 275.000, 2 quartos, 1 suíte, 50 m²)
  - Apartamento Rio Doce (Venda R$ 170.000)
  - Casa Rio Doce (Venda R$ 400.000, 3 quartos, 1 suíte, 160 m²)
  - Edifício Fonte Atlântico (Venda R$ 350.000, condomínio R$ 580)
  - Edifício Estação Marcos Freire (Venda R$ 990.000, condomínio R$ 939, Alto Padrão Beira-Mar)
- *Nota Ética: Todos os itens de feed foram devidamente cadastrados com a flag "Pendente de confirmação" para garantir total transparência e segurança jurídica.*
