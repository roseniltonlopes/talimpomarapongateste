"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowUpRight, Instagram, Pin, Store as StoreIcon, Truck } from "@/components/Icons";
import { SITE } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Store() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 65%" }, defaults: { ease: "apple" } });
      tl.from(q(".store__photo--main"), { clipPath: "inset(100% 0 0 0 round 32px)", duration: 1.4 }, 0)
        .from(q(".store__photo--side"), { y: 120, rotation: 8, autoAlpha: 0, duration: 1.3 }, 0.2)
        .from(q(".store__tata"), { y: 200, rotation: -14, duration: 1.4, ease: "back.out(1.3)" }, 0.45)
        .from(q(".store__bubble"), { scale: 0, transformOrigin: "100% 100%", duration: 0.8, ease: "back.out(2)" }, 1)
        .from(q(".store__reveal"), { y: 30, autoAlpha: 0, stagger: 0.07, duration: 1 }, 0.15);

      gsap.to(q(".store__photo--side"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="store" id="loja" aria-labelledby="store-title">
      <div className="wrap store__grid">
        <div className="store__collage">
          <figure className="store__photo store__photo--main">
            <Image
              src="/img/loja/inauguracao.jpg"
              alt="Equipe da Talimpo Maraponga na porta da loja, com arco de balões azuis e brancos na inauguração"
              fill
              sizes="(max-width: 900px) 70vw, 30vw"
            />
          </figure>
          <figure className="store__photo store__photo--side">
            <Image
              src="/img/loja/atendimento.jpg"
              alt="Atendente da Talimpo mostrando um desinfetante clorado na frente das prateleiras"
              fill
              sizes="(max-width: 900px) 42vw, 16vw"
            />
          </figure>
          <div className="store__tata">
            <Image src="/brand/tata.webp" alt="Tatá, a onça mascote da Talimpo, fazendo joinha" width={922} height={1019} sizes="(max-width: 900px) 40vw, 15vw" />
          </div>
          <p className="store__bubble">
            Oi, eu sou a Tatá! Tem dica de limpeza toda semana no Insta.
          </p>
        </div>

        <div className="store__info">
          <p className="eyebrow store__reveal">Unidade Maraponga · Fortaleza-CE</p>
          <h2 id="store-title" className="section-title store__reveal">
            Loja de bairro, com atendimento de quem entende.
          </h2>
          <p className="section-lead store__reveal">
            Produto de limpeza para casa e para empresa, linha automotiva e piscina. Passa aqui, chama no WhatsApp ou
            monta o carrinho na loja online.
          </p>

          <ul className="store__facts">
            <li className="store__reveal">
              <Truck width={22} height={22} />
              <div>
                <strong>Entrega em Fortaleza e Região Metropolitana</strong>
                <span>{SITE.delivery}.</span>
              </div>
            </li>
            <li className="store__reveal">
              <StoreIcon width={22} height={22} />
              <div>
                <strong>Retirada na loja</strong>
                <span>Durante o horário de atendimento.</span>
              </div>
            </li>
            <li className="store__reveal">
              <Pin width={22} height={22} />
              <div>
                <strong>{SITE.address.street}</strong>
                <span>
                  {SITE.address.district}, {SITE.address.city} - {SITE.address.state}, {SITE.address.zip}
                </span>
              </div>
            </li>
          </ul>

          <div className="store__ctas store__reveal">
            <a className="btn btn--blue" href={SITE.maps} target="_blank" rel="noopener noreferrer">
              <Pin width={18} height={18} />
              Como chegar
            </a>
            <a className="btn btn--ghost" href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram width={18} height={18} />
              @talimpomarapongaoficial
              <ArrowUpRight width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
