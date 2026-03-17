/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const DuckLogo = ({ className }: { className?: string }) => (
  <img src="/assets/logo.png" alt="duckduckgoose logo" className={`${className} object-contain`} referrerPolicy="no-referrer" />
);

const DuckAsset = ({ color, className }: { color: "yellow" | "red" | "blue" | "green"; className?: string }) => {
  const srcMap = {
    yellow: "/assets/duckyellow.png",
    red: "/assets/duckred.png",
    blue: "/assets/duckblue.png",
    green: "/assets/duckgreen.png",
  };
  return <img src={srcMap[color]} alt={`${color} duck`} className={`${className} object-contain`} referrerPolicy="no-referrer" />;
};

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-12 px-6 max-w-6xl mx-auto ${className}`}>
    {children}
  </section>
);


interface GameImage {
  src: string;
  alt: string;
  caption: string;
}

const TeacherDashboardExplorer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = [
    { 
      title: "Live Overview", 
      desc: "Monitor classroom activity as it happens.",
      src: "/assets/teacher/Teacher_ Base.png", 
      alt: "Teacher Dashboard Base" 
    },
    { 
      title: "Game Customization", 
      desc: "Tailor game settings to your lesson plan.",
      src: "/assets/teacher/Teacher_ game options.png", 
      alt: "Teacher Game Options" 
    },
    { 
      title: "Content Management", 
      desc: "Update your curriculum content on the fly.",
      src: "/assets/teacher/Teacher_ Edit Question Bank.png", 
      alt: "Edit Question Bank" 
    },
    { 
      title: "Performance Analytics", 
      desc: "Review past results to identify learning gaps.",
      src: "/assets/teacher/Teacher_ Past Game Results.png", 
      alt: "Past Game Results" 
    },
    { 
      title: "Student Insights", 
      desc: "Drill down into individual student metrics.",
      src: "/assets/teacher/Teacher_ Past Game Results-1.png", 
      alt: "Detailed Performance View" 
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="relative group">
        <div className="bg-slate-800 rounded-t-xl p-3 flex gap-1.5 border-x border-t border-white/20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <div className="aspect-[16/10] bg-slate-900 rounded-b-3xl overflow-hidden border border-white/20 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              <img 
                src={features[activeIndex].src} 
                alt={features[activeIndex].alt}
                className="max-w-full max-h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
        {features.map((feature, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`text-left p-4 rounded-2xl transition-all border ${
              i === activeIndex 
                ? 'bg-white/10 border-white/20 shadow-lg' 
                : 'bg-transparent border-transparent hover:bg-white/5'
            }`}
          >
            <h5 className={`font-bold text-sm mb-1 ${i === activeIndex ? 'text-white' : 'text-white/60'}`}>
              {feature.title}
            </h5>
            <p className="text-xs text-white/40 line-clamp-1">{feature.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const MiniGameCard = ({ title, description, color, longDescription, duckColor, images = [] }: { 
  title: string; 
  description: string; 
  color: string; 
  longDescription: string; 
  duckColor: "yellow" | "red" | "blue" | "green";
  images?: GameImage[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="nintendo-card p-8 flex flex-col gap-4 cursor-pointer group transition-all"
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border-2 transition-transform group-hover:rotate-12 shadow-sm" style={{ borderColor: color }}>
          <DuckAsset color={duckColor} className="w-10 h-auto" />
        </div>
        <h3 className="text-2xl font-hanken tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color }}>
          Learn More <ArrowRight size={14} />
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ddg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl border-4 flex flex-col md:flex-row"
              style={{ borderColor: color }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
              >
                <X size={24} />
              </button>

              {/* Carousel Section */}
              <div className="w-full md:w-1/2 bg-slate-100 relative aspect-square md:aspect-auto flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
                {images.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full h-full p-8 flex flex-col"
                      >
                        <div className="flex-1 flex items-center justify-center relative">
                          <img 
                            src={images[currentImageIndex].src} 
                            alt={images[currentImageIndex].alt}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-6 text-center">
                          <p className="text-sm font-medium text-slate-600 bg-white/50 py-2 px-4 rounded-full inline-block">
                            {images[currentImageIndex].caption}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all"
                        >
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'w-4' : 'opacity-30'}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-slate-400 font-hanken uppercase tracking-widest">No Screenshots Available</div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-12 flex flex-col">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white border-4 mb-8 shadow-md" style={{ borderColor: color }}>
                  <DuckAsset color={duckColor} className="w-14 h-14" />
                </div>
                <h2 className="text-5xl mb-6 font-hanken">{title}</h2>
                <div className="prose prose-slate max-w-none flex-1">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {longDescription}
                  </p>
                </div>
                <div className="mt-10 flex gap-4">
                  <div className="flex-1 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-slate-400">Team Size</h4>
                    <p className="text-lg font-medium">3-5 Students</p>
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-slate-400">Duration</h4>
                    <p className="text-lg font-medium">5-8 Minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  React.useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Update URL hash without jumping
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen selection:bg-ddg-blue selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <DuckLogo className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-8 font-hanken text-xs uppercase tracking-widest text-slate-400">
            <a href="#problem" className="hover:text-ddg-blue transition-colors">Problem</a>
            <a href="#games" className="hover:text-ddg-blue transition-colors">Games</a>
            <a href="#teachers" className="hover:text-ddg-blue transition-colors">Teachers</a>
            <a href="#demo" className="hover:text-ddg-blue transition-colors">Demo</a>
            <a href="#process" className="hover:text-ddg-blue transition-colors">Process</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Section className="relative pt-28 pb-20 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <DuckLogo className="max-w-2xl mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-medium text-slate-400 tracking-tight mb-12">
            Connecting Classroom Communities Through Play
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#demo" className="bg-slate-50 text-slate-600 px-10 py-5 rounded-full font-hanken text-lg hover:bg-slate-100 transition-all border border-slate-200">
              View Demo
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Core Pillars */}
      <div className="border-y border-slate-100 overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-y-8">
            <div id="problem" className="grid grid-cols-1 md:grid-rows-subgrid md:row-span-3 bg-ddg-red/5 p-12 border-r border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-ddg-red/20 mb-8 md:mb-0">
                <DuckAsset color="red" className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-hanken mb-6 md:mb-0">The Problem</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Current classroom games focus on a multiple-choice format. Students are hyper-focused on their individual screens, and metrics fail to assess student depth of knowledge.
              </p>
            </div>
            <div id="research" className="grid grid-cols-1 md:grid-rows-subgrid md:row-span-3 bg-ddg-yellow/5 p-12 border-r border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-ddg-yellow/20 mb-8 md:mb-0">
                <DuckAsset color="yellow" className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-hanken mb-6 md:mb-0">Research Findings</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We interviewed teachers and surveyed students. 48.3% of students report little to no interaction and 37.1% of students feel isolated playing games.
              </p>
            </div>
            <div id="solution" className="grid grid-cols-1 md:grid-rows-subgrid md:row-span-3 bg-ddg-green/5 p-12">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-ddg-green/20 mb-8 md:mb-0">
                <DuckAsset color="green" className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-hanken mb-6 md:mb-0">Our Solution</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A new classroom game experience defined by collaboration. Our mini-games test students' creativity, teamwork, and knowledge.
              </p>
            </div>
          </div>
      </div>

      {/* Mini Games */}
      <div id="games" className="bg-white relative overflow-hidden">
        <Section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl mb-4">4 Uniquely Fun Mini-Games</h2>
              <p className="text-slate-500">
                Each game is designed to force interaction, discussion, and collective decision-making.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-ddg-red"></div>
              <div className="w-3 h-3 rounded-full bg-ddg-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-ddg-green"></div>
              <div className="w-3 h-3 rounded-full bg-ddg-blue"></div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <MiniGameCard 
              title="Justify" 
              color="#47C8EC"
              duckColor="blue"
              description="Students brainstorm individually, then collaborate within their groups to pick and refine the best answer."
              longDescription="Justify challenges students to think critically about their own ideas before merging them with the group. It fosters a culture of 'why' over 'what', ensuring that every final answer is backed by collective reasoning."
              images={[
                { src: "/assets/justify/Justify - Student - Question.png", alt: "Justify Question Screen", caption: "Brainstorming initial ideas individually." },
                { src: "/assets/justify/Justify - Student - Team.png", alt: "Justify Team Screen", caption: "Teammates review ideas together" },
                { src: "/assets/justify/Justify - Student - Other Option - Editing.png", alt: "Justify Tean Editing Screen", caption: "Teammates can refine ideas together." },
                { src: "/assets/justify/Justify - Student - Voting.png", alt: "Justify Voting Screen", caption: "Voting on the best team justification." }
              ]}
            />
            <MiniGameCard 
              title="Form Up" 
              color="#FFD436"
              duckColor="yellow"
              description="Each student is assigned one sentence of a paragraph. Groups must coordinate to create a cohesive whole."
              longDescription="Form Up is the ultimate test of coordination. By giving each student a unique piece of the puzzle, it ensures 100% participation."
              images={[
                { src: "/assets/form up/Form Up - Student - Question.png", alt: "Form Up Question Screen", caption: "Students individually write one part of a process." },
                { src: "/assets/form up/Form Up - Student - Formation.png", alt: "Form Up Formation Screen", caption: "Teammates need to be in sync to form a cohesive process." },
                { src: "/assets/form up/Form Up - Team Responses.png", alt: "Form Up Results Screen", caption: "The best formation is voted upon." }
              ]}
            />
            <MiniGameCard 
              title="Stack'd Up" 
              color="#F93C4C"
              duckColor="red"
              description="Rapid-fire multiple choice where incorrect answers break the blocks your group is standing on."
              longDescription="Stack'd Up brings high-stakes energy to review sessions. It's not just about knowing the answer; it's about trusting your teammates. One wrong move and the whole group falls—literally!"
              images={[
                { src: "/assets/stack'd up/Stack'd Up - Student - MCQ - 1.png", alt: "Stack'd Up MCQ Screen", caption: "Rapid-fire individual multiple choice." },
                { src: "/assets/stack'd up/Stack'd Up - Student - MCQ - 1 - Reveal.png", alt: "Stack'd Up Reveal Screen", caption: "Correct answer is revealed" },
                { src: "/assets/stack'd up/Stack'd Up - Towers.png", alt: "Stack'd Up Towers Screen", caption: "Teammates need to work together to keep their tower tall." }
              ]}
            />
            <MiniGameCard 
              title="Picture This" 
              color="#9CC912"
              duckColor="green"
              description="A collaborative Pictionary twist involving drawing, guessing, and identifying concepts as a team."
              longDescription="Picture This leverages visual learning. Students must translate abstract concepts into drawings that their teammates can recognize. It's a fun, creative break that reinforces key terminology."
              images={[
                { src: "/assets/picture this/Picture This - Student Drawing Screen.png", alt: "Picture This Drawing Screen", caption: "Drawing the concept for the team." },
                { src: "/assets/picture this/Picture This - Student Guessing Screen.png", alt: "Picture This Guessing Screen", caption: "Team members guessing in real-time." },
                { src: "/assets/picture this/Picture This - Team Vote.png", alt: "Picture This Voting Screen", caption: "Teams submit one strip to the classroom" },
                { src: "/assets/picture this/Picture This - Results.png", alt: "Picture This Results Screen", caption: "Celebrating creative success." }
              ]}
            />
          </div>
        </Section>
      </div>

      {/* Teacher Section */}
      <div id="teachers" className="bg-ddg-blue text-white py-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ddg-green/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <Section className="relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="w-full flex flex-col gap-8">
              <div>
                <h2 className="text-5xl md:text-6xl mb-6 font-hanken leading-tight">Why teachers will love duckduckgoose</h2>
                <p className="text-xl text-white/80 leading-relaxed">
                  We didn't just build this for students. We built it to solve the biggest headaches teachers face during interactive lessons.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { duck: "red", title: "Zero Isolation", desc: "Every game mechanic encourages teamwork and collaboration." },
                  { duck: "blue", title: "Actionable Data", desc: "Get powerful insights into which concepts the class is struggling with collectively." },
                  { duck: "green", title: "Easy Setup", desc: "Launch a game in seconds with AI that transforms lesson plans into classroom fun." },
                  { duck: "yellow", title: "Positive Energy", desc: "Transform classroom management from 'quiet down' to 'collaborate effectively'." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-14 h-14 flex-shrink-0 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <DuckAsset color={item.duck as any} className="w-10 h-8" />
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full bg-white/5 backdrop-blur-md p-4 md:p-8 rounded-[48px] border border-white/10 shadow-2xl">
              <TeacherDashboardExplorer />
            </div>
          </div>
        </Section>
      </div>

      {/* Videos Section */}
      <div className="bg-slate-50 py-20">
        <Section id="demo">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <h2 className="text-5xl mb-4 font-hanken">Concept Video</h2>
                <p className="text-slate-500 text-lg">
                  Understand the vision behind duckduckgoose and how we're reimagining classroom interaction.
                </p>
              </div>
              <div className="aspect-video bg-ddg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/W1CTeITLYfo" 
                  title="duckduckgoose Concept Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <h2 className="text-5xl mb-4 font-hanken">Demo Video</h2>
                <p className="text-slate-500 text-lg">
                  Watch a walkthrough of the mini-games and see gameplay mechanics and collaborative features up close.
                </p>
              </div>
              <div className="aspect-video bg-ddg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/p7V3qgs-hBg" 
                  title="duckduckgoose Game Walkthrough" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Figma Embed */}
      <div className="bg-slate-50 py-16">
        <Section className="py-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl">Interactive Prototype</h2>
            <a href="https://www.figma.com/design/Q31EJpH0ZtA7eXnVY1TzKg/DuckDuckGoose" target="_blank" rel="noopener noreferrer" className="text-ddg-blue font-hanken text-sm flex items-center gap-2 hover:underline">
              Open in Figma <ArrowRight size={16} />
            </a>
          </div>
          <div className="aspect-[16/9] bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
            <iframe 
              style={{ border: 'none' }} 
              width="100%" 
              height="100%" 
              src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/Q31EJpH0ZtA7eXnVY1TzKg/DuckDuckGoose?node-id=0-1&t=ghnye9yl1yvTzmHf-1" 
              allowFullScreen
            ></iframe>
          </div>
        </Section>
      </div>

      {/* Design Process */}
      <div className="bg-ddg-green/5 py-16 border-y border-slate-100 relative overflow-hidden">
        <Section id="process" className="py-0">
          <div className="text-center mb-10">
            <h2 className="text-6xl mb-4 font-hanken">Our Design Process</h2>
            <p className="text-slate-500 text-xl">From initial sketches to a high-fidelity digital solution.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Sketching", duck: "red", desc: "Exploring diverse interaction models and game mechanics on paper.", color: "#F93C4C", image: "/assets/process/sketchboard.png" },
              { step: "02", title: "Storyboard", duck: "yellow", desc: "Visualizing the student journey and classroom dynamics.", color: "#FFD436", image: "/assets/process/storyboard.png" },
              { step: "03", title: "Paper Prototype", duck: "green", desc: "Testing core mechanics with physical artifacts to validate collaboration.", color: "#9CC912", image: "/assets/process/paperprototype.png" }
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-white rounded-3xl border-2 border-slate-100 hover:border-transparent transition-all relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 translate-x-12 -translate-y-12 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: item.color }}></div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <DuckAsset color={item.duck as any} className="w-12 h-12" />
                  </div>
                  <div className="h-px flex-1 bg-slate-100"></div>
                  <span className="text-5xl font-hanken text-slate-100 group-hover:opacity-100 transition-colors" style={{ color: item.color }}>{item.step}</span>
                </div>
                <h3 className="text-2xl mb-4 font-hanken">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-2">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Team */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-10">
            <div>
              <h2 className="text-6xl mb-4">The Team</h2>
              <p className="text-slate-400 text-lg">
                CSE 440 • University of Washington • Winter 2026
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { name: "Jonah Kowal" },
                { name: "Michelle Chung" },
                { name: "Fatima Sheikh" }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xl font-semibold">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100 gap-8">
            <div className="flex items-center">
              <DuckLogo className="h-8 w-auto" />
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-ddg-red"></div>
              <div className="w-2 h-2 rounded-full bg-ddg-yellow"></div>
              <div className="w-2 h-2 rounded-full bg-ddg-green"></div>
              <div className="w-2 h-2 rounded-full bg-ddg-blue"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
