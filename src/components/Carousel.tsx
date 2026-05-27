import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, PARTNERS_LOGOS } from '../data';

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(slideNext, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(slideNext, 6000);
    }
  };

  const current = TESTIMONIALS[activeIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <section id="trust-carousel-section" className="w-full relative overflow-hidden">
      {/* Fond image + dégradé bleu (témoignages) */}
      <div className="relative py-16 sm:py-24">
        <img
          src="/images/depannageurgent.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/88 via-blue-800/82 to-slate-900/75" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-200 font-mono">
              Ils Nous Ont Fait Confiance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 drop-shadow-sm">
              Ce que disent nos clients
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mt-2">
              La satisfaction de nos clients est notre plus belle réussite. Découvrez les retours d'expérience sur nos prestations de dépannage, plomberie et chauffage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative px-2 sm:px-12 mb-18">
            <div className="relative min-h-[260px] sm:min-h-[220px] bg-white rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl border border-white/80">
              <div className="absolute top-6 right-8 text-blue-100 pointer-events-none">
                <Quote className="w-16 h-16 opacity-40 stroke-[1.2]" />
              </div>

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
                    « {current.quote} »
                  </p>

                  <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-200">
                    <div>
                      <span className="block text-sm font-semibold text-natural-heading">
                        {current.author}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        {current.role}
                      </span>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-mono font-semibold border border-blue-100">
                      Plomberie {current.city}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center sm:justify-between items-center gap-4 mt-6 sm:absolute sm:inset-y-0 sm:left-0 sm:right-0 sm:mt-0 sm:pointer-events-none">
              <button
                id="carousel-prev"
                onClick={() => { resetAutoplay(); slidePrev(); }}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition-all cursor-pointer shadow-lg sm:pointer-events-auto sm:-translate-x-5 active:scale-95"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="carousel-next"
                onClick={() => { resetAutoplay(); slideNext(); }}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition-all cursor-pointer shadow-lg sm:pointer-events-auto sm:translate-x-5 active:scale-95"
                aria-label="Avis suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-1.5 mt-5">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  id={`carousel-bullet-${index}`}
                  onClick={() => {
                    resetAutoplay();
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau partenaires — image + bleu */}
      <div className="relative pt-10 pb-12 overflow-hidden border-t border-blue-400/30">
        <img
          src="/images/installationchaudiere.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/92 via-blue-600/88 to-blue-800/92" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-center text-xs text-blue-100 uppercase tracking-widest font-mono mb-8 font-semibold">
            Installateurs partenaires certifiés des plus grandes marques d'équipement sanitaire
          </p>

          <div className="relative w-full overflow-hidden py-2 select-none">
            <div className="flex gap-6 w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {PARTNERS_LOGOS.map((partner, index) => (
                <div
                  key={`p1-${index}`}
                  className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-white/50 px-8 py-4 rounded-xl min-w-[160px] text-center shadow-lg"
                >
                  <span className="text-sm font-extrabold text-slate-800 font-sans tracking-wider">
                    {partner.logoText}
                  </span>
                  <span className="text-[10px] text-blue-600 font-mono mt-1 font-semibold">
                    {partner.desc}
                  </span>
                </div>
              ))}
              {PARTNERS_LOGOS.map((partner, index) => (
                <div
                  key={`p2-${index}`}
                  className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-white/50 px-8 py-4 rounded-xl min-w-[160px] text-center shadow-lg"
                >
                  <span className="text-sm font-extrabold text-slate-800 font-sans tracking-wider">
                    {partner.logoText}
                  </span>
                  <span className="text-[10px] text-blue-600 font-mono mt-1 font-semibold">
                    {partner.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
