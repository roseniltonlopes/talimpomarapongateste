/**
 * Dados reais da Talimpo Maraponga Oficial, coletados em 16/11/2026 no
 * Instagram (@talimpomarapongaoficial), na página de links e na loja online.
 * Preços mudam: confira na loja antes de publicar uma nova versão.
 */

export const SITE = {
  name: "Talimpo Maraponga Oficial",
  slogan: "Facilitando sua vida",
  url: "https://talimpomarapongaoficial.com.br",
  shop: "https://loja.talimpomarapongaoficial.com.br/",
  whatsapp: "5585981667890",
  whatsappLabel: "(85) 98166-7890",
  address: {
    street: "R. Carlos Juaçaba, 1518",
    district: "Maraponga",
    city: "Fortaleza",
    state: "CE",
    zip: "60710-715",
  },
  maps: "https://www.google.com/maps?q=Rua+Carlos+Jua%C3%A7aba,+1518,+Maraponga,+Fortaleza,+CE",
  delivery: "Frete grátis acima de R$ 29,90 em um raio de até 2 km",
  pricesCheckedAt: "16/11/2026",
  social: {
    instagram: "https://www.instagram.com/talimpomarapongaoficial/",
    facebook: "https://www.facebook.com/talimpomarapongaoficial",
    tiktok: "https://www.tiktok.com/@talimpomarapongaoficial",
  },
} as const;

/** Link do WhatsApp com mensagem pronta. */
export function whatsappLink(message = "Olá! Gostaria de falar com a equipe da Talimpo Maraponga.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export interface Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  image: string;
  w: number;
  h: number;
  /** "a partir de" quando há mais de um tamanho */
  from?: boolean;
}

/** Produto da hero: marca própria. Texto do rótulo, sem promessas extras. */
export const HERO_PRODUCT = {
  name: "Alvejante sem Cloro Talimpo Premium",
  size: "3 L",
  price: 29.9,
  image: "/img/produtos/talimpo-premium.png",
  w: 473,
  h: 1085,
  claims: [
    { id: "o2", title: "Poder O₂ ativo", text: "Oxigênio ativo no lugar do cloro." },
    { id: "cloro", title: "Sem cloro", text: "Cuida da cor enquanto tira a mancha." },
    { id: "tecidos", title: "Brancas, coloridas e diversos tecidos", text: "Seguro para as peças do dia a dia, como diz o rótulo." },
    { id: "litros", title: "3 litros", text: "Galão com alça, para a lavanderia de casa." },
  ],
};

export const TALIMPO_LINE: Product[] = [
  {
    id: "alvejante-premium",
    name: "Alvejante sem Cloro Premium",
    detail: "Galão de 3 L · Poder O₂ ativo",
    price: 29.9,
    image: "/img/produtos/talimpo-premium.png",
    w: 473,
    h: 1085,
  },
  {
    id: "lava-roupas-coco",
    name: "Detergente Lava Roupas Coco",
    detail: "2 L e 5 L · Para máquina e tanque",
    price: 22.9,
    from: true,
    image: "/img/produtos/lavaroupas-coco.png",
    w: 295,
    h: 877,
  },
];

export const SHELF: Product[] = [
  { id: "azulim", name: "Azulim Chá Branco", detail: "Limpador perfumado 1 L", price: 14.9, image: "/img/produtos/azulim.png", w: 308, h: 958 },
  { id: "clearon", name: "Seven Clearon", detail: "Desinfetante clorado 1 L", price: 31.9, from: true, image: "/img/produtos/clearon.png", w: 261, h: 793 },
  { id: "gel-pinho", name: "Gel Pinho LimpeBem", detail: "Limpeza pesada 1 kg", price: 14.9, from: true, image: "/img/produtos/gelpinho.png", w: 266, h: 860 },
  { id: "magic", name: "Seven Magic 3 em 1", detail: "Limpa, desinfeta e perfuma", price: 49.9, from: true, image: "/img/produtos/sevengel.png", w: 212, h: 680 },
  { id: "percarbonato", name: "Percarbonato de Sódio", detail: "Alvejante sem cloro 1 kg", price: 32.9, image: "/img/produtos/percarbonato.png", w: 536, h: 690 },
  { id: "sintra", name: "Sintra Fast Vonixx", detail: "Limpador bactericida 500 ml", price: 28.9, image: "/img/produtos/sintra.png", w: 354, h: 991 },
  { id: "vfloc", name: "Shampoo V-Floc Vonixx", detail: "Lavagem automotiva 500 ml", price: 27.9, image: "/img/produtos/vfloc.png", w: 227, h: 935 },
  { id: "intense", name: "Intense Vonixx", detail: "Renovador de plásticos 500 ml", price: 37.9, image: "/img/produtos/intense.png", w: 210, h: 831 },
];

/** Categorias de problema usadas na loja online, com fotos do nicho. */
export const PROBLEMS = [
  { id: "gordura", title: "Tirar gordura", text: "Desengordurantes e multiuso para cozinha e churrasqueira.", image: "/img/cenas/cozinha.jpg" },
  { id: "manchas", title: "Manchas e encardido", text: "Percarbonato e alvejantes sem cloro para roupas e panos.", image: "/img/cenas/roupas.jpg" },
  { id: "banheiro", title: "Banheiro limpo e cheiroso", text: "Desinfetantes, limpadores perfumados e água sanitária.", image: "/img/cenas/banheiro.jpg" },
  { id: "obra", title: "Limpeza pós-obra", text: "Removedores de cimento, ácidos e desincrustantes.", image: "/img/cenas/balde.jpg" },
  { id: "carro", title: "Lavar o carro em casa", text: "Shampoo, pretinho para pneus e cuidado interno.", image: "/img/cenas/carro.jpg" },
] as const;

export const RITUAL = [
  { n: "01", title: "Separe", text: "Junte as peças do dia a dia e confira a etiqueta de cada tecido.", image: "/img/cenas/cesto.jpg" },
  { n: "02", title: "Dose", text: "Use a medida indicada no rótulo, junto com o seu sabão de sempre.", image: "/img/cenas/toalhas.jpg" },
  { n: "03", title: "Lave", text: "Na máquina ou no tanque. O oxigênio ativo trabalha nas manchas.", image: "/img/cenas/lavanderia.jpg" },
  { n: "04", title: "Seque", text: "Varal, sol de Fortaleza e a roupa volta pra gaveta limpa de verdade.", image: "/img/cenas/varal.jpg" },
] as const;

export const BUSINESS_ITEMS = [
  "Papel toalha",
  "Papel higiênico",
  "Sacos de lixo 100 e 200 L",
  "Sabonete líquido",
  "Álcool 70 e álcool gel",
  "Dispensers e saboneteiras",
] as const;
