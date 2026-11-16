"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { ArrowUpRight } from "@/components/Icons";
import { PROBLEMS, SITE } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Problems() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap.from(q(".problems__frame"), {
        clipPath: "inset(12% 12% 12% 12% round 40px)",
        duration: 1.6,
        ease: "apple",
        scrollTrigger: { trigger: q(".problems__frame")[0], start: "top 80%" },
      });
      gsap.from(q(".problem"), {
        y: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: "apple",
        scrollTrigger: { trigger: q(".problems__list")[0], start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="problems" aria-labelledby="problems-title">
      <div className="wrap problems__grid">
        <header className="problems__head">
          <p className="eyebrow">A loja inteira</p>
          <h2 id="problems-title" className="section-title">
            Qual limpeza você precisa resolver?
          </h2>
          <p className="section-lead">
            Escolha o problema. A gente separa os produtos certos e manda na porta da sua casa, é na porta mesmo.
          </p>
        </header>

        <div className="problems__frame" aria-hidden="true">
          {PROBLEMS.map((p, i) => (
            <Image
              key={p.id}
              className={`problems__img${i === active ? " is-active" : ""}`}
              src={p.image}
              alt=""
              fill
              sizes="44vw"
            />
          ))}
          <div className="problems__glass">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <strong>{PROBLEMS[active].title}</strong>
          </div>
        </div>

        <ul className="problems__list">
          {PROBLEMS.map((p, i) => (
            <li key={p.id} className={`problem${i === active ? " is-active" : ""}`}>
              <a
                href={SITE.shop}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="problem__thumb" aria-hidden="true">
                  <Image src={p.image} alt="" fill sizes="(max-width: 900px) 92vw, 1px" />
                </span>
                <span className="problem__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="problem__body">
                  <span className="problem__title">{p.title}</span>
                  <span className="problem__text">{p.text}</span>
                </span>
                <ArrowUpRight className="problem__arrow" width={22} height={22} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
