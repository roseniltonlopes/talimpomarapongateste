"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowUpRight, Facebook, Instagram, TikTok, WhatsApp } from "@/components/Icons";
import { SITE, whatsappLink } from "@/data/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const split = SplitText.create(q(".closing__title"), { type: "chars", mask: "chars" });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%" }, defaults: { ease: "apple" } });
      tl.from(q(".closing__script"), { clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power2.inOut" }, 0)
        .from(split.chars, { yPercent: 115, stagger: 0.03, duration: 1 }, 0.2)
        .from(q(".closing__reveal"), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.5)
        .from(q(".closing__bottle"), { y: 200, rotation: 14, autoAlpha: 0, duration: 1.4, ease: "drop" }, 0.3);
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="closing" aria-labelledby="closing-title">
      <div className="closing__bg" aria-hidden="true">
        <Image src="/img/cenas/seda.jpg" alt="" fill sizes="100vw" />
        <div className="closing__tint" />
      </div>

      <div className="wrap closing__inner">
        <div className="closing__copy">
          <p className="closing__script" aria-hidden="true">
            Facilitando
          </p>
          <h2 id="closing-title" className="closing__title">
            <span className="sr-only">Facilitando </span>sua vida.
          </h2>
          <p className="closing__lead closing__reveal">
            Pede pelo WhatsApp que a gente separa, confirma o frete e leva até você.
          </p>
          <div className="closing__ctas closing__reveal">
            <a className="btn btn--primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsApp width={20} height={20} />
              {SITE.whatsappLabel}
            </a>
            <a className="btn btn--glass" href={SITE.shop} target="_blank" rel="noopener noreferrer">
              Loja online <ArrowUpRight width={18} height={18} />
            </a>
          </div>
        </div>
        <div className="closing__bottle" aria-hidden="true">
          <Image src="/img/produtos/talimpo-premium.png" alt="" width={473} height={1085} sizes="(max-width: 900px) 34vw, 16vw" />
        </div>
      </div>

      <div className="wrap closing__base">
        <Image className="closing__logo" src="/brand/logo-white.webp" alt="Talimpo Maraponga Oficial" width={834} height={480} sizes="140px" />
        <address className="closing__address">
          {SITE.address.street} · {SITE.address.district}
          <br />
          {SITE.address.city} - {SITE.address.state} · {SITE.address.zip}
        </address>
        <ul className="closing__social" aria-label="Redes sociais">
          <li>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
          </li>
          <li>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook />
            </a>
          </li>
          <li>
            <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTok />
            </a>
          </li>
        </ul>
        <p className="closing__legal">
          © {new Date().getFullYear()} {SITE.name}. Preços consultados na loja online em {SITE.pricesCheckedAt}, sujeitos a
          alteração. Leia sempre o rótulo antes de usar.
        </p>
      </div>
    </footer>
  );
}
