"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowUpRight, Pin, ShirtSparkle, WhatsApp } from "@/components/Icons";
import { HERO_PRODUCT, SITE, formatBRL, whatsappLink } from "@/data/site";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { MOBILE_QUERY, prefersReducedMotion } from "@/lib/motion";

const ORDER_MSG = `Olá! Quero pedir o ${HERO_PRODUCT.name} ${HERO_PRODUCT.size}. Pode me passar o valor da entrega?`;

/** Bolhas de vidro, eco das bolhas do logotipo. [x%, y%, tamanho px, profundidade] */
const BUBBLES: [number, number, number, number][] = [
  [8, 62, 54, 0.6],
  [18, 30, 18, 1.4],
  [44, 18, 26, 1],
  [58, 70, 14, 1.6],
  [84, 22, 70, 0.5],
  [92, 58, 22, 1.2],
  [70, 40, 12, 1.8],
];

function priceParts(v: number) {
  const [int, dec] = formatBRL(v).replace("R$", "").trim().split(",");
  return { int, dec };
}

export function HeroFlight() {
  const root = useRef<HTMLDivElement>(null);
  const price = priceParts(HERO_PRODUCT.price);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const hero = q<HTMLElement>(".hero")[0];
      const formula = q<HTMLElement>(".formula")[0];
      const heroSlot = q<HTMLElement>(".hero__slot")[0];
      const pin = q<HTMLElement>(".formula__pin")[0];
      const slot = q<HTMLElement>(".formula__slot")[0];
      const bottle = q<HTMLElement>(".bottle")[0];

      /* o CSS esconde o conteúdo até aqui (html.motion) para a entrada não piscar */
      gsap.set(q(".hero__inner, .bottle, .hero__arc-inner"), { visibility: "visible" });

      /* ── entrada da hero ─────────────────────────────── */
      const split = SplitText.create(q(".hero__title"), { type: "chars,words", mask: "chars" });
      const intro = gsap.timeline({ defaults: { ease: "apple" }, delay: 0.15 });
      intro
        .from(q(".hero__bg-img"), { scale: 1.18, duration: 2.4, ease: "power2.out" }, 0)
        .from(q(".hero__disc"), { scale: 0.4, autoAlpha: 0, duration: 1.4, transformOrigin: "0% 0%" }, 0.05)
        .from(q(".hero__arc"), { yPercent: 60, duration: 1.4 }, 0.1)
        .from(q(".hero__script"), { clipPath: "inset(0 100% 0 0)", duration: 1.3, ease: "power2.inOut" }, 0.35)
        .from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.035 }, 0.45)
        .from(q(".hero__reveal"), { autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 1, stagger: 0.09 }, 0.75)
        .from(q(".bottle__intro"), { y: 220, rotation: 10, autoAlpha: 0, duration: 1.5, ease: "drop" }, 0.4)
        .from(q(".hero__icon"), { scale: 0, rotation: -40, duration: 1, ease: "back.out(1.8)" }, 1.0)
        .from(q(".hero__badge"), { scale: 0, rotation: 30, duration: 1, ease: "back.out(1.6)" }, 1.15)
        .from(q(".hero__bubble"), { scale: 0, autoAlpha: 0, duration: 1.2, stagger: 0.06, ease: "back.out(2)" }, 0.9);

      const mm = gsap.matchMedia();

      mm.add({ mobile: MOBILE_QUERY, desktop: "(min-width: 901px)" }, (ctx) => {
        const { mobile } = ctx.conditions as { mobile: boolean };

        /* flutuação ociosa do frasco: camada própria, não briga com o voo */
        gsap.to(q(".bottle__float"), {
          y: mobile ? -6 : -12,
          rotation: 1.2,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        /* ── o voo ──────────────────────────────────────────
           O frasco mora no palco da seção de baixo. Medimos onde o encaixe
           da hero e o encaixe do palco ficam no documento e partimos do
           deslocamento entre os dois: no topo da página ele aparece na hero
           e, com a rolagem, pousa no lugar dele. Tudo em coordenadas do
           documento, então funciona igual em qualquer largura. */
        const measure = () => {
          const sy = window.scrollY;
          const h = heroSlot.getBoundingClientRect();
          const s = slot.getBoundingClientRect();
          const p = pin.getBoundingClientRect();
          const f = formula.getBoundingClientRect();
          const slotTopInPin = s.top - p.top;
          const fromCx = h.left + h.width / 2;
          const toCx = s.left + s.width / 2;
          const fromCy = h.top + sy + h.height / 2;
          const toCy = f.top + sy + slotTopInPin + s.height / 2;
          return { x: fromCx - toCx, y: fromCy - toCy, scale: h.height / s.height };
        };
        const flight = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            endTrigger: formula,
            end: "top top",
            scrub: mobile ? 0.4 : 0.9,
            invalidateOnRefresh: true,
          },
        });
        flight
          .fromTo(
            bottle,
            { x: () => measure().x, y: () => measure().y, scale: () => measure().scale },
            { x: 0, y: 0, scale: 1, ease: "power1.inOut", duration: 1 },
            0,
          )
          .fromTo(
            q(".bottle__spin"),
            { rotation: -8 },
            { keyframes: { rotation: [-8, 7, 0], ease: "sine.inOut" }, duration: 1 },
            0,
          )
          .fromTo(q(".bottle__shadow"), { autoAlpha: 0, scaleX: 0.5 }, { autoAlpha: 1, scaleX: 1, duration: 0.3 }, 0.7);

        /* a hero se desmancha por baixo do frasco */
        gsap.timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        })
          .fromTo(
            q(mobile ? ".hero__copy > *" : ".hero__copy"),
            { y: 0, autoAlpha: 1 },
            { y: mobile ? -60 : -120, autoAlpha: 0, ease: "none", immediateRender: false },
            0,
          )
          .to(q(".hero__badge, .hero__icon"), { scale: 0.4, autoAlpha: 0, ease: "power1.in", duration: 0.5 }, 0)
          .to(q(".hero__bg-img"), { yPercent: 14, ease: "none" }, 0)
          .to(q(".hero__disc"), { yPercent: -30, ease: "none" }, 0);

        q<HTMLElement>(".hero__bubble").forEach((b) => {
          const depth = Number(b.dataset.depth ?? 1);
          gsap.to(b, {
            yPercent: -260 * depth,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
        });

        /* ── palco do produto (sticky) ───────────────────── */
        const callouts = q<HTMLElement>(".callout");
        const stage = gsap.timeline({
          defaults: { ease: "apple" },
          scrollTrigger: { trigger: formula, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        stage.fromTo(q(".formula__word"), { yPercent: 0 }, { yPercent: mobile ? -10 : -25, ease: "none", duration: 4 }, 0);
        callouts.forEach((c, i) => {
          const fromLeft = c.dataset.side === "left";
          stage
            .fromTo(
              c,
              { autoAlpha: 0, x: mobile ? 0 : fromLeft ? -40 : 40, y: mobile ? 24 : 0, filter: "blur(10px)" },
              { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)", duration: 0.7 },
              0.2 + i * 0.6,
            )
            .fromTo(
              c.querySelector(".callout__line"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, ease: "power2.out" },
              0.35 + i * 0.6,
            );
        });
        stage.fromTo(q(".formula__o2"), { y: mobile ? 60 : 120, autoAlpha: 0 }, { y: mobile ? -140 : -260, autoAlpha: 1, stagger: 0.12, duration: 2.4, ease: "none" }, 0.2);

        return () => {
          gsap.set(bottle, { clearProps: "transform" });
        };
      });

      /* título da seção do produto entra uma vez */
      const fsplit = SplitText.create(q(".formula__title"), { type: "lines", mask: "lines" });
      gsap.from(fsplit.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: "apple",
        scrollTrigger: { trigger: formula, start: "top 20%" },
      });

      /* imagens e fontes mudam alturas: re-mede tudo quando carregarem */
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      document.fonts?.ready.then(onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flight">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="hero" id="topo" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <Image
            className="hero__bg-img"
            src="/img/cenas/seda.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="hero__tint" />
        </div>

        <div className="hero__disc" aria-hidden="true" />

        {BUBBLES.map(([x, y, s, d], i) => (
          <span
            key={i}
            className="hero__bubble"
            data-depth={d}
            aria-hidden="true"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
          />
        ))}

        <div className="hero__inner wrap">
          <div className="hero__copy">
            <p className="hero__eyebrow hero__reveal">
              Talimpo Premium <span aria-hidden="true">·</span> Alvejante {HERO_PRODUCT.size}
            </p>
            <p className="hero__script" aria-hidden="true">
              Sem cloro,
            </p>
            <h1 className="hero__title" id="hero-title">
              <span className="sr-only">Sem cloro, </span>
              Tudo limpo.
            </h1>
            <p className="hero__lead hero__reveal">
              Poder O₂ ativo que remove as manchas do dia a dia sem danificar as cores.
              <span className="hero__lead-extra"> Da nossa prateleira na Maraponga direto pra sua porta.</span>
            </p>
            <div className="hero__ctas hero__reveal">
              <a className="btn btn--primary" href={whatsappLink(ORDER_MSG)} target="_blank" rel="noopener noreferrer">
                <WhatsApp width={20} height={20} />
                Pedir no WhatsApp
              </a>
              <a
                className="btn btn--glass"
                href={SITE.shop}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver na loja online"
              >
                <span className="hero__shop-long">Ver na loja online</span>
                <span className="hero__shop-short" aria-hidden="true">Loja</span>
                <ArrowUpRight width={18} height={18} />
              </a>
            </div>
          </div>

          <div className="hero__stage">
            <div className="hero__slot">
              {/* visível sem JS e com "reduzir movimento"; com o voo ativo, o frasco real vem da seção de baixo */}
              <Image
                className="hero__static"
                src={HERO_PRODUCT.image}
                alt={`${HERO_PRODUCT.name} ${HERO_PRODUCT.size}`}
                width={HERO_PRODUCT.w}
                height={HERO_PRODUCT.h}
                sizes="(max-width: 900px) 42vw, 22vw"
              />
            </div>
            <div className="hero__icon" aria-hidden="true">
              <ShirtSparkle width={46} height={46} />
            </div>
            <div className="hero__badge">
              <span className="hero__badge-tag">Na loja online</span>
              <span className="hero__badge-size">Galão {HERO_PRODUCT.size}</span>
              <span className="hero__badge-price">
                <small>R$</small>
                {price.int}
                <sup>,{price.dec}</sup>
              </span>
              <span className="hero__badge-note">preço de {SITE.pricesCheckedAt}</span>
            </div>
          </div>
        </div>

        <div className="hero__arc">
          <div className="hero__arc-inner">
            <a className="hero__phone" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsApp width={22} height={22} />
              {SITE.whatsappLabel}
            </a>
            <a className="hero__address" href={SITE.maps} target="_blank" rel="noopener noreferrer">
              <Pin width={16} height={16} />
              {SITE.address.street}, {SITE.address.district} · {SITE.address.city}
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────── PALCO DO PRODUTO ─────────────────────── */}
      <section className="formula" id="produto" aria-labelledby="formula-title">
        <div className="formula__pin">
          <p className="formula__word" aria-hidden="true">
            PREMIUM
          </p>
          <div className="formula__head wrap">
            <p className="eyebrow">O que tem dentro do galão</p>
            <h2 className="formula__title" id="formula-title">
              Oxigênio ativo na mancha. Cor no lugar.
            </h2>
          </div>

          <div className="formula__stage wrap">
            <div className="formula__slot">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="formula__o2" aria-hidden="true">
                  O₂
                </span>
              ))}
              <div className="bottle">
                <div className="bottle__intro">
                  <div className="bottle__spin">
                    <div className="bottle__float">
                      <Image
                        src={HERO_PRODUCT.image}
                        alt=""
                        width={HERO_PRODUCT.w}
                        height={HERO_PRODUCT.h}
                        priority
                        sizes="(max-width: 900px) 46vw, 26vw"
                        quality={90}
                      />
                    </div>
                  </div>
                </div>
                <span className="bottle__shadow" aria-hidden="true" />
              </div>
            </div>

            <ul className="formula__callouts">
              {HERO_PRODUCT.claims.map((c, i) => (
                <li key={c.id} className={`callout callout--${i}`} data-side={i % 2 === 0 ? "left" : "right"}>
                  <span className="callout__line" aria-hidden="true" />
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
