"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your ideal home atmosphere?",
    options: [
      { id: "A", text: "Calm & serene" },
      { id: "B", text: "Bold & dramatic" },
      { id: "C", text: "Warm & cosy" },
      { id: "D", text: "Clean & minimal" },
    ],
  },
  {
    id: 2,
    question: "Which colour palette speaks to you?",
    options: [
      { id: "A", text: "Neutral earth tones — beige, cream, sand" },
      { id: "B", text: "Dark moody tones — navy, black, charcoal" },
      { id: "C", text: "Warm rich tones — terracotta, rust, gold" },
      { id: "D", text: "Light airy tones — white, grey, sage" },
    ],
  },
  {
    id: 3,
    question: "What flooring appeals to you most?",
    options: [
      { id: "A", text: "Timber / wood" },
      { id: "B", text: "Marble / stone" },
      { id: "C", text: "Concrete screed" },
      { id: "D", text: "Patterned tiles" },
    ],
  },
  {
    id: 4,
    question: "How do you feel about clutter?",
    options: [
      { id: "A", text: "Minimal — less is more" },
      { id: "B", text: "Curated display is fine" },
      { id: "C", text: "Cosy layers of meaningful items" },
      { id: "D", text: "Purely functional storage" },
    ],
  },
  {
    id: 5,
    question: "Your dream kitchen style?",
    options: [
      { id: "A", text: "Open concept, sleek handleless cabinets" },
      { id: "B", text: "Classic with upper cabinets & statement island" },
      { id: "C", text: "Industrial with raw materials & open shelving" },
      { id: "D", text: "Colourful, statement kitchen with personality" },
    ],
  },
  {
    id: 6,
    question: "What lighting do you prefer?",
    options: [
      { id: "A", text: "Warm ambient cove lights, soft glow" },
      { id: "B", text: "Dramatic pendants & targeted accent lights" },
      { id: "C", text: "Natural light, minimal artificial lighting" },
      { id: "D", text: "Smart colour-changing LED lights" },
    ],
  },
  {
    id: 7,
    question: "Which material palette resonates with you?",
    options: [
      { id: "A", text: "Oak, linen, stone — natural & tactile" },
      { id: "B", text: "Marble, brass, velvet — refined luxury" },
      { id: "C", text: "Concrete, steel, glass — raw & honest" },
      { id: "D", text: "Rattan, terracotta, jute — earthy & organic" },
    ],
  },
] as const;

type AnswerId = "A" | "B" | "C" | "D";

const RESULTS: Record<
  AnswerId,
  {
    style: string;
    slug: string;
    description: string;
    characteristics: string[];
    palette: string[];
  }
> = {
  A: {
    style: "Japandi / Scandinavian",
    slug: "japandi",
    description:
      "Your home is a sanctuary of quiet beauty. Japandi blends Japanese minimalism and wabi-sabi philosophy with Scandinavian warmth and functionality. The result: serene spaces with natural textures, restrained palettes and deeply intentional design. Every object earns its place.",
    characteristics: [
      "Natural timber, stone and linen textures",
      "Muted neutral palette — beige, off-white, warm grey",
      "Low-profile furniture with clean silhouettes",
      "Warm ambient lighting, no harsh overhead glare",
      "Decluttered surfaces with purposeful decor",
    ],
    palette: ["#D4C5A9", "#9C8B72", "#6B6055", "#3D3530", "#F5F0E8"],
  },
  B: {
    style: "Contemporary / Luxury",
    slug: "contemporary",
    description:
      "You gravitate toward spaces with presence and polish. Contemporary luxury design combines refined materials — marble, brass, velvet — with bold architectural gestures. Dramatic lighting and statement pieces create an environment that's effortlessly sophisticated and visually commanding.",
    characteristics: [
      "Premium materials: marble, brass, lacquer",
      "Feature walls and architectural ceiling details",
      "Statement lighting as art",
      "Rich jewel tones or moody dark palettes",
      "Custom joinery and bespoke furniture",
    ],
    palette: ["#1A1A2E", "#16213E", "#C8881F", "#E8E8E0", "#8B7355"],
  },
  C: {
    style: "Warm Modern / Wabi-Sabi",
    slug: "warm-modern",
    description:
      "You believe a home should feel lived-in and loved. Warm modern design celebrates imperfection and authenticity — raw concrete alongside terracotta, hand-thrown ceramics next to linen throws. Spaces feel curated but never staged, comfortable yet quietly beautiful.",
    characteristics: [
      "Textured surfaces: plaster, concrete, limewash",
      "Warm earthy tones — terracotta, rust, ochre, clay",
      "Organic shapes and handcrafted elements",
      "Layered textiles and meaningful objects",
      "Biophilic touches: indoor plants, natural materials",
    ],
    palette: ["#C44B36", "#D4845A", "#E8C4A0", "#8B5E3C", "#4A3728"],
  },
  D: {
    style: "Minimalist / Industrial",
    slug: "minimalist",
    description:
      "Form follows function in your ideal home. You appreciate the elegance of restraint — raw industrial materials like concrete and steel paired with clean-lined architecture. Spaces breathe. There's nowhere to hide, and nothing that doesn't serve a purpose. It's design at its most honest.",
    characteristics: [
      "Exposed concrete, steel, and glass",
      "Strict neutral palette: whites, greys, blacks",
      "Open-plan layouts with strong sightlines",
      "Functional built-ins and hidden storage",
      "Industrial fixtures: factory pendants, black matte fittings",
    ],
    palette: ["#2D2D2D", "#4A4A4A", "#767676", "#B0B0B0", "#E8E8E8"],
  },
};

function getResult(answers: Record<number, AnswerId>): AnswerId {
  const counts: Record<AnswerId, number> = { A: 0, B: 0, C: 0, D: 0 };
  Object.values(answers).forEach((a) => counts[a]++);
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as AnswerId);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function StyleQuizClient() {
  const [current, setCurrent] = useState(0); // 0 = landing, 1-7 = questions, 8 = result
  const [answers, setAnswers] = useState<Record<number, AnswerId>>({});
  const [selected, setSelected] = useState<AnswerId | null>(null);

  const totalQuestions = QUESTIONS.length;
  const isLanding = current === 0;
  const isResult = current === totalQuestions + 1;
  const questionIndex = current - 1;
  const question = !isLanding && !isResult ? QUESTIONS[questionIndex] : null;
  const progress = isResult ? 100 : isLanding ? 0 : ((current - 1) / totalQuestions) * 100;

  function handleStart() {
    setCurrent(1);
    setSelected(null);
  }

  function handleSelect(id: AnswerId) {
    setSelected(id);
  }

  function handleNext() {
    if (!selected || !question) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current === totalQuestions) {
      setCurrent(totalQuestions + 1);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function handleReset() {
    setCurrent(0);
    setAnswers({});
    setSelected(null);
  }

  const resultKey = isResult ? getResult(answers) : null;
  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* Hero */}
      <section className="pt-32 pb-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-3">Free Tool</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            What&apos;s Your{" "}
            <span className="text-[#c8881f]">Design Style?</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Answer 7 questions and discover which interior design style fits your personality — then find Singapore firms that specialise in it.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          {!isLanding && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>{isResult ? "Complete!" : `Question ${current} of ${totalQuestions}`}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#c8881f] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Card */}
          <AnimatePresence mode="wait">
            {/* Landing */}
            {isLanding && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0a0e1a] border border-white/8 rounded-3xl p-8 sm:p-12 text-center"
              >
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-xs mx-auto">
                  {["Japandi / Scandi", "Contemporary", "Warm Modern", "Minimalist"].map((s) => (
                    <div key={s} className="bg-[#070b14] border border-white/8 rounded-xl px-3 py-2 text-xs text-white/60 text-center">
                      {s}
                    </div>
                  ))}
                </div>
                <h2 className="text-2xl font-black text-white mb-3">Ready to find your style?</h2>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                  7 quick questions. Takes less than 2 minutes. We&apos;ll match you with the perfect interior design aesthetic.
                </p>
                <button onClick={handleStart} className="btn-accent">
                  Start the Quiz
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Question */}
            {question && (
              <motion.div
                key={`q-${current}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="bg-[#0a0e1a] border border-white/8 rounded-3xl p-6 sm:p-8"
              >
                <p className="text-[#c8881f] text-xs font-bold uppercase tracking-widest mb-4">
                  Question {current} / {totalQuestions}
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-6 leading-tight">
                  {question.question}
                </h2>
                <div className="space-y-3 mb-8">
                  {question.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id as AnswerId)}
                      className={`w-full flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 cursor-pointer ${
                        selected === opt.id
                          ? "border-[#c8881f] bg-[#c8881f]/10"
                          : "border-white/8 bg-[#070b14] hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black border transition-colors ${
                          selected === opt.id
                            ? "bg-[#c8881f] border-[#c8881f] text-white"
                            : "border-white/20 text-white/40"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className={`text-sm font-medium ${selected === opt.id ? "text-white" : "text-white/70"}`}>
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`btn-accent w-full justify-center transition-opacity ${!selected ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {current === totalQuestions ? "See My Style" : "Next Question"}
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Result */}
            {isResult && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0a0e1a] border border-[#c8881f]/30 rounded-3xl p-6 sm:p-8"
              >
                <div className="text-center mb-8">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-bold">Your Style is</p>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#c8881f] mb-4 leading-tight">
                    {result.style}
                  </h2>
                  {/* Palette dots */}
                  <div className="flex justify-center gap-2 mb-6">
                    {result.palette.map((hex) => (
                      <div
                        key={hex}
                        className="w-8 h-8 rounded-full border border-white/10"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed max-w-lg mx-auto">
                    {result.description}
                  </p>
                </div>

                <div className="bg-[#070b14] rounded-2xl p-5 mb-6">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Key Characteristics</h3>
                  <ul className="space-y-2.5">
                    {result.characteristics.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c8881f] mt-2 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/firms?style=${result.slug}`}
                    className="btn-accent flex-1 justify-center"
                  >
                    Find {result.style} Specialists
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={handleReset}
                    className="btn-glass flex-1 justify-center"
                  >
                    <RotateCcw size={15} />
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
