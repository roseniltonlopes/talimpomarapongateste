"use client";

import Image from "next/image";
import { useRef } from "react";

import { RITUAL } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP_QUERY, MOBILE_QUERY, prefersReducedMotion } from "@/lib/motion";

/**
 * "Do cesto ao varal": no desktop a seção trava e as etapas correm na
 * horizontal; no celular viram painéis verticais que se abrem ao rolar.
 */
export function Ritual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        const track = q<HTMLElement>(".ritual__track")[0];
        const distance = () => track.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".ritual__pin")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance(), ease: "none" }, 0).to(q(".ritual__bar-fill"), { scaleX: 1, ease: "none" }, 0);
        q<HTMLElement>(".step").forEach((s) => {
          gsap.fromTo(
            s.querySelector(".step__img"),
            { xPercent: -7, scale: 1.2 },
            {
              xPercent: 7,
              scale: 1.2,
              ease: "none",
              scrollTrigger: { trigger: s, containerAnimation: tl, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(s.querySelectorAll(".step__reveal"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "apple",
            scrollTrigger: { trigger: s, containerAnimation: tl, start: "left 70%" },
          });
        });
      });

      mm.add(MOBILE_QUERY, () => {
        q<HTMLElement>(".step").forEach((s) => {
          gsap.fromTo(
            s.querySelector(".step__media"),
            { clipPath: "inset(18% 10% 18% 10% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              ease: "none",
              scrollTrigger: { trigger: s, start: "top 92%", end: "top 35%", scrub: true },
            },
          );
          gsap.fromTo(
            s.querySelector(".step__img"),
            { yPercent: -8, scale: 1.18 },
            { yPercent: 8, scale: 1.18, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } },
          );
          gsap.from(s.querySelectorAll(".step__reveal"), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "apple",
            scrollTrigger: { trigger: s, start: "top 60%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="ritual" id="como-usar" aria-labelledby="ritual-title">
      <div className="ritual__pin">
        <div className="ritual__track">
          <header className="ritual__intro">
            <p className="eyebrow eyebrow--light">Como usar</p>
            <h2 id="ritual-title" className="ritual__title">
              Do cesto
              <br />
              ao varal.
            </h2>
            <p className="ritual__lead">
              Quatro passos, o mesmo de sempre. A diferença está no que vai na máquina. Na dúvida, o rótulo manda e a
              gente explica no WhatsApp.
            </p>
            <div className="ritual__bar" aria-hidden="true">
              <span className="ritual__bar-fill" />
            </div>
          </header>

          <ol className="ritual__steps">
            {RITUAL.map((s, i) => (
              <li key={s.n} className="step">
                <div className="step__media">
                  <Image
                    className="step__img"
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 92vw, 46vw"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="step__shade" aria-hidden="true" />
                  <span className="step__n" aria-hidden="true">
                    {s.n}
                  </span>
                </div>
                <div className="step__body">
                  <h3 className="step__title step__reveal">
                    <span className="sr-only">Passo {s.n}: </span>
                    {s.title}
                  </h3>
                  <p className="step__text step__reveal">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
