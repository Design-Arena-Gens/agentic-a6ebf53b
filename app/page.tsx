'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type Pulse = {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
};

const pulses: Pulse[] = new Array(12).fill(null).map((_, index) => ({
  id: index,
  x: Math.random() * 100,
  y: Math.random() * 100,
  scale: Math.random() * 0.8 + 0.4,
  delay: Math.random() * 4
}));

const spiritLevels = [
  {
    label: 'Base',
    ki: 12,
    hue: 'from-ki-200 via-ki-400 to-ki-200',
    descriptor: 'Calm determination'
  },
  {
    label: 'Surge',
    ki: 45,
    hue: 'from-plasma-200 via-plasma-400 to-plasma-200',
    descriptor: 'Rising storm'
  },
  {
    label: 'Nova',
    ki: 87,
    hue: 'from-yellow-200 via-rose-400 to-yellow-200',
    descriptor: 'Blazing resolve'
  },
  {
    label: 'Limit Break',
    ki: 100,
    hue: 'from-white via-sky-200 to-plasma-200',
    descriptor: 'Unstoppable radiance'
  }
];

const battleBeats = [
  {
    title: 'Frame 001',
    description: 'Wind tears across the battlefield as aura sparks ignite the horizon.',
    stat: 'Crackle Intensity',
    value: '92%'
  },
  {
    title: 'Frame 047',
    description: 'The fighters vanish into streaks of light, only shockwaves remain.',
    stat: 'Velocity',
    value: 'Mach 8'
  },
  {
    title: 'Frame 128',
    description: 'Planetary ki funnels into a singular blast of incandescent force.',
    stat: 'Ki Output',
    value: 'Over 9000'
  }
];

const moveList = [
  {
    name: 'Galactic Railgun',
    subtitle: 'Triple-stage plasma discharge',
    highlight: 'Impact Diameter',
    metric: '4.3 km',
    description:
      'Three-phase energy spiral that compresses atmospheric ions into a neon rail of unstoppable force.'
  },
  {
    name: 'Nova Nova Shatterstep',
    subtitle: 'Temporal displacement dash',
    highlight: 'Afterimage Trail',
    metric: '9 layers',
    description:
      'Fractures time to strike from every angle, leaving a lattice of light that overwhelms the senses.'
  },
  {
    name: 'Soul Furnace Requiem',
    subtitle: 'Planet-grade finishing move',
    highlight: 'Resonance Level',
    metric: '∞',
    description:
      'Harnesses the chorus of every warrior spirit, detonating in a crescendo of unstoppable resonance.'
  }
];

function useReactiveCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      cursorX.set(event.clientX / innerWidth - 0.5);
      cursorY.set(event.clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [cursorX, cursorY]);

  return mounted
    ? {
        rotateX: useTransform(smoothY, value => value * -16),
        rotateY: useTransform(smoothX, value => value * 16),
        glowShiftX: useTransform(smoothX, value => `${value * 10}px`),
        glowShiftY: useTransform(smoothY, value => `${value * 10}px`)
      }
    : {
        rotateX: 0,
        rotateY: 0,
        glowShiftX: '0px',
        glowShiftY: '0px'
      };
}

const AuraBackdrop = () => {
  const { glowShiftX, glowShiftY } = useReactiveCursor();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 50%, rgba(13, 143, 255, 0.22), transparent 70%)'
      }}
    >
      <motion.div
        className="absolute inset-0 blur-[160px] bg-gradient-to-br from-ki-400/70 via-plasma-400/60 to-orange-300/30"
        style={{ x: glowShiftX, y: glowShiftY }}
      />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-energy-grid bg-grid-lg opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-energy-grid bg-grid-sm opacity-25 mix-blend-screen" />
      </div>
      {pulses.map(pulse => (
        <motion.div
          key={pulse.id}
          className="absolute size-[240px] rounded-full bg-gradient-to-tr from-ki-300/50 via-plasma-300/40 to-white/10 blur-[60px]"
          animate={{
            scale: [pulse.scale, pulse.scale * 1.25, pulse.scale],
            opacity: [0.5, 0.85, 0.5]
          }}
          transition={{
            duration: 6,
            delay: pulse.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ top: `${pulse.y}%`, left: `${pulse.x}%` }}
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { rotateX, rotateY } = useReactiveCursor();

  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-16 px-6 text-center md:gap-24"
        style={{ rotateX, rotateY }}
      >
        <div className="relative mx-auto flex flex-col gap-6">
          <motion.div
            className="scanline-blink inline-flex items-center justify-center gap-3 self-center rounded-full border border-white/20 bg-white/5 px-6 py-2 uppercase tracking-[0.35em] text-[0.68rem] text-ki-100/80 shadow-lg backdrop-blur"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-1 w-1 rounded-full bg-ki-300 shadow-[0_0_12px_rgba(13,143,255,0.8)]" />
            Battle Archive 20XX
          </motion.div>

          <motion.h1
            className="font-display text-outline text-4xl leading-tight text-white drop-shadow-[0_25px_60px_rgba(13,143,255,0.55)] sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            KI SURGE: LEGEND OF THE HYPERION FIST
          </motion.h1>

          <motion.p
            className="mx-auto max-w-2xl text-balance text-lg text-ki-100/80 md:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            A love letter to the raw grit of 90s battle anime—where every frame is a
            supernova, every roar shatters the heavens, and destiny is forged in kinetic
            light.
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-[1px] backdrop-blur"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative rounded-[23px] border border-white/10 bg-gradient-to-br from-black/40 via-black/70 to-black/40 p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
            <motion.div
              className="absolute -left-32 top-1/2 hidden h-[120%] w-48 -translate-y-1/2 transform bg-gradient-to-b from-white/0 via-white/15 to-white/0 blur-3xl md:block"
              animate={{ x: ['0%', '160%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
              <div className="flex flex-col gap-6">
                <p className="text-left text-sm uppercase tracking-[0.35em] text-ki-200/80">
                  Combat feed
                </p>
                <p className="text-left text-lg leading-relaxed text-ki-100/85 md:text-xl">
                  <span className="font-semibold text-white">Hyperion</span> vs{' '}
                  <span className="text-plasma-200">Nemesis Omega</span>. Mountain peaks
                  crumble under the first exchange. Camera drones can barely hold focus
                  as the sky fractures with every strike.
                </p>
                <div className="relative flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full border border-ki-300/60 bg-gradient-to-br from-ki-300/40 to-plasma-300/30 shadow-[0_0_20px_rgba(13,143,255,0.5)]" />
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.45em] text-ki-200/70">
                      Aura pressure
                    </p>
                    <div className="relative mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-ki-400 via-plasma-400 to-amber-200 shadow-[0_0_25px_rgba(233,92,255,0.5)]"
                        animate={{ width: ['78%', '91%', '82%'] }}
                        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <motion.div
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-ki-500/10 via-plasma-500/20 to-white/5 p-6 text-left backdrop-blur-md"
                  animate={{ boxShadow: ['0 0 30px rgba(13,143,255,0.35)', '0 0 60px rgba(233,92,255,0.45)', '0 0 30px rgba(13,143,255,0.35)'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-ki-200/80">
                    Fight Data
                  </p>
                  <div className="mt-4 grid gap-3 text-sm">
                    <p className="flex justify-between text-ki-100/80">
                      <span>Shockwave Radius</span>
                      <span className="font-semibold text-white">12 km</span>
                    </p>
                    <p className="flex justify-between text-ki-100/80">
                      <span>Frame Time Distortion</span>
                      <span className="font-semibold text-white">318%</span>
                    </p>
                    <p className="flex justify-between text-ki-100/80">
                      <span>Scouter Resonance</span>
                      <span className="font-semibold text-white">Amber</span>
                    </p>
                  </div>
                </motion.div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-left">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-ki-200/70">
                      Episode 37
                    </p>
                    <p className="mt-1 font-display text-2xl text-white">THE COSMOS WARBURN</p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <motion.span
                      className="text-sm uppercase tracking-[0.5em] text-plasma-200/80"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      00:19:47
                    </motion.span>
                    <span className="text-xs text-ki-100/60">playback remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const KiMeter = () => (
  <section className="relative z-10 mx-auto mt-10 max-w-5xl px-6">
    <div className="card-border relative overflow-hidden rounded-3xl bg-black/70 px-8 py-10 shadow-[0_20px_60px_rgba(13,143,255,0.3)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-60" />
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.45em] text-ki-200/80">
            Spirit telemetry
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Aura Amplification Index
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {spiritLevels.map(level => (
            <div
              key={level.label}
              className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 px-6 py-6"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em] text-ki-100/70">
                <span>{level.label}</span>
                <span>{level.ki}%</span>
              </div>
              <div className="relative h-32 overflow-hidden rounded-xl bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${level.hue}`}
                  animate={{ height: ['68%', `${level.ki}%`, '72%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-1 bg-white/60"
                  animate={{ opacity: [0.1, 0.8, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <p className="text-sm text-ki-100/80">{level.descriptor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MoveCards = () => (
  <section className="relative z-10 mx-auto mt-24 max-w-6xl px-6">
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.45em] text-ki-100/70">
            Signature techniques
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">Battle Codex</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.4em] text-ki-100/60">
          <span className="rounded-full border border-white/20 px-4 py-1">Hyperion</span>
          <span className="rounded-full border border-white/20 px-4 py-1">Nemesis Omega</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {moveList.map(move => (
          <motion.article
            key={move.name}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 px-7 py-8 backdrop-blur"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ki-400/10 via-transparent to-plasma-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.45em] text-ki-200/70">{move.subtitle}</p>
              <h3 className="font-display text-2xl text-white">{move.name}</h3>
              <p className="text-sm text-ki-100/75">{move.description}</p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.45em] text-ki-100/70">
                <span>{move.highlight}</span>
                <span className="font-display text-lg text-white">{move.metric}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const BattleTimeline = () => (
  <section className="relative z-10 mx-auto mt-24 max-w-5xl px-6">
    <div className="card-border relative overflow-hidden rounded-[32px] bg-black/70 px-10 py-14 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,92,255,0.18),transparent_70%)]" />
      <div className="relative flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.45em] text-ki-100/70">
            Frame breakdown
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Cinematic Key Moments
          </h2>
          <p className="max-w-xl text-sm text-ki-100/80">
            Rendered in the gritty analog magic of the 90s: expect film scratches,
            hand-painted speed lines, and impact frames that freeze the universe.
          </p>
        </div>
        <div className="grid gap-6 md:gap-10">
          {battleBeats.map((beat, index) => (
            <motion.div
              key={beat.title}
              className="retro-lines relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/50 to-black/80 px-7 py-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -left-1 top-0 h-full w-1 bg-gradient-to-b from-ki-400 via-plasma-400 to-amber-200 shadow-[0_0_20px_rgba(233,92,255,0.6)]" />
              <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-ki-200/70">
                    {beat.title}
                  </p>
                  <p className="mt-3 text-lg text-ki-100/85 md:text-xl">{beat.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-xs uppercase tracking-[0.45em] text-ki-100/60">
                    {beat.stat}
                  </span>
                  <span className="font-display text-2xl text-white md:text-3xl">
                    {beat.value}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6 pb-32">
    <motion.div
      className="group relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-black/60 via-black/40 to-black/60 px-10 py-14 text-center shadow-[0_25px_80px_rgba(13,143,255,0.25)] backdrop-blur"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.35 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ki-400/30 via-transparent to-plasma-400/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-b from-white/20 to-transparent blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative flex flex-col gap-4">
        <span className="text-xs uppercase tracking-[0.5em] text-ki-100/70">
          Continue the saga
        </span>
        <h2 className="font-display text-3xl text-white md:text-4xl">
          Tune in next arc: Stardust Rebellion
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-ki-100/75">
          New allies, forbidden techniques, and a battle so intense it warps color itself.
          Brace for kinetic compositions, film grain overlays, and untamed aura storms.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
          <button className="relative overflow-hidden rounded-full bg-gradient-to-r from-ki-500 via-plasma-500 to-amber-300 px-8 py-3 font-display text-lg uppercase tracking-[0.4em] text-black shadow-[0_12px_40px_rgba(233,92,255,0.35)] transition-transform duration-300 hover:scale-105">
            Watch Trailer
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
          </button>
          <button className="rounded-full border border-white/30 px-8 py-3 text-sm uppercase tracking-[0.45em] text-ki-100/80 transition duration-300 hover:border-white hover:text-white">
            Activate Scouter
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

export default function Page() {
  const { rotateX, rotateY } = useReactiveCursor();
  const auraVariants = useMemo(
    () => ({
      animate: {
        scale: [1, 1.06, 1],
        opacity: [0.5, 0.9, 0.5],
        boxShadow: [
          '0 0 30px rgba(13,143,255,0.25)',
          '0 0 50px rgba(233,92,255,0.45)',
          '0 0 30px rgba(13,143,255,0.25)'
        ],
        transition: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }
      }
    }),
    []
  );

  return (
    <main className="relative overflow-hidden">
      <AuraBackdrop />
      <div className="absolute inset-x-0 top-0 -z-10 h-[40vh] bg-gradient-to-b from-black via-transparent to-transparent" />
      <section className="relative">
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 blur-[140px]"
          style={{ rotateX, rotateY }}
          variants={auraVariants}
          animate="animate"
        >
          <div className="absolute left-1/2 top-16 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-ki-400 via-white/40 to-plasma-400 opacity-40" />
        </motion.div>
        <Hero />
      </section>
      <KiMeter />
      <MoveCards />
      <BattleTimeline />
      <CallToAction />
      <footer className="border-t border-white/5 bg-black/70 py-10 text-center text-xs uppercase tracking-[0.45em] text-ki-100/60">
        Hyperion Studios © 20XX — Digitally remastered for infinite hype.
      </footer>
    </main>
  );
}
