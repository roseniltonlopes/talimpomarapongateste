"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowUpRight, WhatsApp } from "@/components/Icons";
import { SHELF, SITE, TALIMPO_LINE, formatBRL, whatsappLink } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Line() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      q<HTMLElement>(".spot").forEach((s, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap
          .timeline({ scrollTrigger: { trigger: s, start: "top 75%" }, defaults: { ease: "apple" } })
          .from(s.querySelector(".spot__product"), { y: 160, rotation: 12 * dir, autoAlpha: 0, duration: 1.4, ease: "drop" }, 0)
          .from(s.querySelectorAll(".spot__reveal"), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.2);
        gsap.fromTo(
          s.querySelector(".spot__ring"),
          { scale: 0.7, rotation: -20 },
          { scale: 1.1, rotation: 20, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      gsap.from(q(".shelf__item"), {
        y: 80,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 1,
        ease: "apple",
        scrollTrigger: { trigger: q(".shelf")[0], start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="line" id="linha" aria-labelledby="line-title">
      <header className="line__head wrap">
        <p className="eyebrow">Marca própria</p>
        <h2 id="line-title" className="section-title">
          A linha <em>talimpo</em> na lavanderia.
        </h2>
        <p className="section-lead">
          Fabricação própria, preço de loja de bairro. Para roupa branca, colorida e para o pano de chão também.
        </p>
      </header>

      <div className="line__spots wrap">
        {TALIMPO_LINE.map((p, i) => (
          <article key={p.id} className={`spot spot--${i === 0 ? "rose" : "sky"}`} aria-labelledby={`spot-${p.id}`}>
            <div className="spot__visual">
              <span className="spot__ring" aria-hidden="true" />
              <Image
                className="spot__product"
                src={p.image}
                alt={`${p.name} Talimpo`}
                width={p.w}
                height={p.h}
                sizes="(max-width: 900px) 40vw, 18vw"
              />
            </div>
            <div className="spot__info">
              <p className="spot__brand spot__reveal">talimpo</p>
              <h3 id={`spot-${p.id}`} className="spot__name spot__reveal">
                {p.name}
              </h3>
              <p className="spot__detail spot__reveal">{p.detail}</p>
              <p className="spot__price spot__reveal">
                {p.from && <small>a partir de </small>}
                {formatBRL(p.price)}
              </p>
              <a
                className="btn btn--dark spot__reveal"
                href={whatsappLink(`Olá! Quero pedir o ${p.name} Talimpo. Tem disponível?`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp width={18} height={18} />
                Pedir este
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="shelf" aria-labelledby="shelf-title">
        <div className="shelf__head wrap">
          <h3 id="shelf-title" className="shelf__title">
            Também na prateleira
          </h3>
          <a className="link-arrow" href={SITE.shop} target="_blank" rel="noopener noreferrer">
            Ver catálogo completo <ArrowUpRight width={16} height={16} />
          </a>
        </div>
        <ul className="shelf__rail" tabIndex={0} aria-label="Produtos de outras marcas, role para o lado">
          {SHELF.map((p) => (
            <li key={p.id} className="shelf__item">
              <div className="shelf__img">
                <Image src={p.image} alt={p.name} width={p.w} height={p.h} sizes="160px" />
              </div>
              <p className="shelf__name">{p.name}</p>
              <p className="shelf__detail">{p.detail}</p>
              <p className="shelf__price">
                {p.from && <small>a partir de </small>}
                {formatBRL(p.price)}
              </p>
            </li>
          ))}
        </ul>
        <p className="shelf__note wrap">
          Preços da loja online em {SITE.pricesCheckedAt}. Podem mudar; confirme no pedido.
        </p>
      </div>
    </section>
  );
}
