/**
 * Hospedagem estática (GitHub Pages) não tem otimizador de imagens.
 * Servimos o arquivo original e prefixamos o basePath do repositório.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = src.startsWith("/") ? `${base}${src}` : src;
  return `${path}?w=${width}`;
}
