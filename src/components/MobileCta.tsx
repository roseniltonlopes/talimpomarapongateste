"use client";

import { useEffect, useState } from "react";

import { WhatsApp } from "@/components/Icons";
import { HERO_PRODUCT, formatBRL, whatsappLink } from "@/data/site";

/** Barra fixa no celular: aparece depois da hero e some no rodapé, onde já há CTA. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - window.innerHeight * 0.8;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mcta${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <div className="mcta__info">
        <strong>Talimpo Premium {HERO_PRODUCT.size}</strong>
        <span>{formatBRL(HERO_PRODUCT.price)} na loja online</span>
      </div>
      <a
        className="btn btn--primary btn--sm"
        href={whatsappLink(`Olá! Quero pedir o ${HERO_PRODUCT.name} ${HERO_PRODUCT.size}.`)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        <WhatsApp width={18} height={18} />
        Pedir
      </a>
    </div>
  );
}
