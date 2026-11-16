"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { WhatsApp } from "@/components/Icons";
import { scrollToTarget } from "@/components/SmoothScroll";
import { whatsappLink } from "@/data/site";

const NAV = [
  { href: "#produto", label: "Produto" },
  { href: "#como-usar", label: "Como usar" },
  { href: "#linha", label: "Linha Talimpo" },
  { href: "#loja", label: "Nossa loja" },
  { href: "#empresas", label: "Empresas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header__bar">
        <a className="header__logo" href="#topo" onClick={(e) => go(e, "#topo")} aria-label="Talimpo Maraponga Oficial, voltar ao topo">
          <Image src="/brand/logo.webp" alt="" width={834} height={480} priority sizes="160px" />
        </a>

        <nav className="header__nav" aria-label="Principal">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={(e) => go(e, n.href)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="header__cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          <WhatsApp width={18} height={18} />
          <span>Pedir agora</span>
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav id="menu-mobile" className="header__sheet" aria-label="Menu" hidden={!open}>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={(e) => go(e, n.href)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
