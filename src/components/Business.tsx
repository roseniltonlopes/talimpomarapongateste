"use client";

import Image from "next/image";
import { useRef } from "react";

import { Check, WhatsApp } from "@/components/Icons";
import { BUSINESS_ITEMS, whatsappLink } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const QUOTE_MSG =
  "Olá! Sou de uma empresa/condomínio e quero uma cotação de produtos de limpeza e higiene. Segue minha lista:";

export function Business() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap.fromTo(
        q(".business__img"),
        { yPercent: -10, scale: 1.15 },
        { yPercent: 10, scale: 1.15, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from(q(".business__reveal"), {
        y: 34,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 1,
        ease: "apple",
        scrollTrigger: { trigger: el, start: "top 65%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="business" id="empresas" aria-labelledby="business-title">
      <div className="business__media" aria-hidden="true">
        <Image className="business__img" src="/img/cenas/chao.jpg" alt="" fill sizes="100vw" />
        <div className="business__shade" />
      </div>

      <div className="wrap business__inner">
        <div className="business__panel">
          <p className="eyebrow eyebrow--light business__reveal">Para empresas e condomínios</p>
          <h2 id="business-title" className="section-title section-title--light business__reveal">
            Reposição de limpeza e higiene sem complicação.
          </h2>
          <p className="business__lead business__reveal">
            Linha profissional, embalagens econômicas e entrega na Maraponga e região. Mande sua lista que a gente
            monta a cotação.
          </p>
          <ul className="business__items">
            {BUSINESS_ITEMS.map((item) => (
              <li key={item} className="business__reveal">
                <Check width={16} height={16} />
                {item}
              </li>
            ))}
          </ul>
          <a className="btn btn--primary business__reveal" href={whatsappLink(QUOTE_MSG)} target="_blank" rel="noopener noreferrer">
            <WhatsApp width={20} height={20} />
            Pedir cotação pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
