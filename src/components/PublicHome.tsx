import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Flame, Play, Star, Calendar, Layers, Clock, 
  Tv, Compass, LogIn, ChevronRight, Volume2, ShieldAlert, Heart,
  Shuffle, ArrowRight
} from "lucide-react";
import { animeData, AnimeShow } from "@/src/data/anime";

interface PublicHomeProps {
  onOpenLogin: () => void;
}

export function PublicHome({ onOpenLogin }: PublicHomeProps) {
  const [activePromoId, setActivePromoId] = useState<string | null>(null);
  const [localLiked, setLocalLiked] = useState<string[]>([]);
  
  // Year & Genre Showcase Filters
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("All");
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>("All");

  // Guessing Predictor Tool State Engine
  const [guessingGenre, setGuessingGenre] = useState<string>("Action");
  const [guessState, setGuessState] = useState<"idle" | "scanning" | "result">("idle");
  const [guessedAnime, setGuessedAnime] = useState<AnimeShow | null>(null);
  const [scanStep, setScanStep] = useState<string>("");

  // Filter shows based on both year AND genre
  const filteredAnime = useMemo(() => {
    let result = animeData;
    
    // Apply year decade filter
    if (selectedYearFilter !== "All") {
      if (selectedYearFilter === "2020s") {
        result = result.filter((show) => parseInt(show.year) >= 2020);
      } else if (selectedYearFilter === "2010s") {
        result = result.filter((show) => parseInt(show.year) >= 2010 && parseInt(show.year) < 2020);
      } else if (selectedYearFilter === "2000s") {
        result = result.filter((show) => parseInt(show.year) >= 2000 && parseInt(show.year) < 2010);
      }
    }

    // Apply category/genre filter
    if (selectedGenreFilter !== "All") {
      result = result.filter((show) => 
        show.genres.some(g => g.toLowerCase() === selectedGenreFilter.toLowerCase())
      );
    }
    
    return result;
  }, [selectedYearFilter, selectedGenreFilter]);

  // Handler to compute the category matching guess with simulated matrix processing ticks
  const triggerMatrixGuess = () => {
    setGuessState("scanning");
    setScanStep("⚡ INITIALIZING CHRONO-PORTAL SIGNAL...");
    
    setTimeout(() => {
      setScanStep(`🔍 SCANNING DECADES (2000-2026) FOR "${guessingGenre.toUpperCase()}" MATCHES...`);
      
      setTimeout(() => {
        setScanStep("🧬 SYNCHRONIZING WITH ORIGINAL HIGH-FIDELITY PROMO FEEDS...");
        
        setTimeout(() => {
          // Select randomized entry for the selected guessing category
          const candidates = animeData.filter((show) => 
            show.genres.some((g) => g.toLowerCase() === guessingGenre.toLowerCase())
          );
          
          const source = candidates.length > 0 ? candidates : animeData;
          const randomIndex = Math.floor(Math.random() * source.length);
          const picked = source[randomIndex];
          
          setGuessedAnime(picked);
          setGuessState("result");
        }, 600);
      }, 650);
    }, 600);
  };

  const toggleLike = (id: string) => {
    if (localLiked.includes(id)) {
      setLocalLiked((prev) => prev.filter((i) => i !== id));
    } else {
      setLocalLiked((prev) => [...prev, id]);
    }
  };

  return (
    <div id="public-home-wrapper" className="w-full min-h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-900/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-[-100px] w-[600px] h-[600px] rounded-full bg-purple-950/10 blur-[150px] pointer-events-none z-0" />

      {/* Primary Landing Navigation Header */}
      <nav id="public-navbar" className="h-18 w-full flex items-center justify-between px-6 md:px-10 bg-slate-950/45 backdrop-blur-md border-b border-white/10 relative z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center font-display font-black text-slate-950 text-base">
            A
          </div>
          <span className="font-display font-black text-xl tracking-tighter uppercase text-white">
            ANIME<span className="text-cyan-400">PORTAL</span>
          </span>
        </div>

        {/* Global navigation tabs */}
        <div className="hidden md:flex gap-8 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
          <span className="text-cyan-400 border-b-2 border-cyan-400 pb-1 cursor-default">Home</span>
          <span className="hover:text-white cursor-pointer transition-colors" onClick={onOpenLogin}>Exclusive Vault</span>
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => {
            const elm = document.getElementById("anime-list-section");
            if (elm) elm.scrollIntoView({ behavior: "smooth" });
          }}>Master Timeline</span>
        </div>

        {/* Sync Trigger button */}
        <div className="flex items-center gap-4">
          <button
            id="portal-sync-header-btn"
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display uppercase bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            <span>SYNC DATABASE</span>
          </button>
        </div>
      </nav>

      {/* Hero Section containing Luffy Image & "Welcome to the world of anime" */}
      <header id="welcome-luffy-hero" className="relative w-full aspect-[21/10] min-h-[420px] max-h-[620px] overflow-hidden flex items-center z-10 border-b border-white/10 bg-slate-950">
        {/* Background artwork of Luffy generated */}
        <div className="absolute inset-0 bg-slate-950">
          <img
            src="/src/assets/images/luffy_gear_five_1781516604552.jpg"
            alt="Luffy Key Visual"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 transform scale-[1.01]"
          />
          {/* Shading gradients to blend edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/25 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]/50" />
        </div>

        {/* High-end design layout wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col justify-end h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-5"
          >
            {/* Top micro pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold font-mono tracking-widest uppercase rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>GEAR_FIVE_RESONANCE // DETECTED</span>
            </div>

            {/* Title Requirement: "Welcome to the world of anime" */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter text-white uppercase italic leading-[0.9] drop-shadow-xl select-none">
              Welcome to <br />
              the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500">world of anime</span>
            </h1>

            {/* Supporting descriptive bio */}
            <p className="text-sm md:text-base text-slate-300 max-w-lg leading-relaxed font-sans font-medium">
              Experience a stunning curation of legendary anime across decades (2000 — 2026). Explore dynamic previews, plot tags, and original promos in a high-tech retro-editorial interface.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-scroll-trigger"
                onClick={() => {
                  const el = document.getElementById("anime-list-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full text-xs font-bold font-mono uppercase bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <span>ENTER ARCHIVE TIMELINE</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="hero-portal-trigger"
                onClick={onOpenLogin}
                className="px-6 py-3 rounded-full text-xs font-bold font-display uppercase bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>SYNC MATRIX ACCOUNT</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Dynamic Guesser: CELESTIAL GUESSING PORTAL */}
      <section id="guessing-portal-section" className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-4 relative z-20">
        <div className="glass-panel rounded-3xl p-6 md:p-8 bg-slate-900/40 border border-white/10 relative overflow-hidden">
          
          {/* Ambient light streak */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Header / Intro info of Guessing Portal */}
            <div className="max-w-md space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-bold font-mono tracking-widest uppercase rounded">
                <Shuffle className="w-3 h-3 animate-spin text-cyan-400" />
                CELESTIAL CHRONO-PORTAL PREDICTOR
              </span>
              <h2 className="font-display font-black text-2.5xl md:text-3.5xl text-white uppercase tracking-tight italic">
                GUESS YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">DESTINY ANIME</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                Choose a timeline category below. The system will parse classic masterpieces from 2000 to 2026 and guess the ideal match with its official promo.
              </p>

              {/* Interactive Category Selector buttons for guessing */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider block uppercase font-bold">1. CHOOSE GUESSING CATEGORY:</span>
                <div className="flex flex-wrap gap-2">
                  {["Action", "Romance", "Sci-Fi", "Fantasy", "Adventure"].map((cat) => {
                    const sel = guessingGenre === cat;
                    return (
                      <button
                        id={`guess-cat-${cat.toLowerCase()}`}
                        key={cat}
                        onClick={() => {
                          setGuessingGenre(cat);
                          if (guessState === "result") setGuessState("idle");
                        }}
                        className={`px-3 py-1.5 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                          sel 
                            ? "bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                            : "bg-slate-950/60 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="pt-2">
                <button
                  id="trigger-guess-btn"
                  onClick={triggerMatrixGuess}
                  disabled={guessState === "scanning"}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold font-display text-xs tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  <Shuffle className="w-4 h-4 text-slate-950" />
                  <span>{guessState === "scanning" ? "DECRYPTION ACTIVE..." : "GUESS SHOW FOR ME"}</span>
                </button>
              </div>
            </div>

            {/* Simulation Terminal Render Interface */}
            <div className="flex-grow lg:max-w-xl xl:max-w-2xl bg-slate-950/60 rounded-2xl border border-white/10 p-5 md:p-6 min-h-[220px] flex flex-col justify-center relative z-10">
              <div className="absolute top-3 right-3 font-mono text-[9px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                CONSOLE_FEED // READY
              </div>

              <AnimatePresence mode="wait">
                {guessState === "idle" && (
                  <motion.div
                    key="idle-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-2 text-slate-400"
                  >
                    <Tv className="w-10 h-10 mx-auto text-slate-500 animate-pulse stroke-[1.5]" />
                    <p className="font-mono text-xs text-cyan-400">SYSTEM READY FOR QUANTUM GUESS</p>
                    <p className="text-[11px] max-w-sm mx-auto font-medium text-slate-400">
                      Configure your frequency category above and command the portal analyzer to guess a tailored show.
                    </p>
                  </motion.div>
                )}

                {guessState === "scanning" && (
                  <motion.div
                    key="scanning-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin" />
                      <p className="font-mono text-xs text-cyan-400 font-semibold uppercase animate-pulse">
                        {scanStep}
                      </p>
                    </div>

                    {/* Faux signal status indicators */}
                    <div className="space-y-1.5 font-mono text-[10px] text-slate-500">
                      <div className="flex justify-between">
                        <span>PORTAL ACCURACY</span>
                        <span className="text-cyan-400">99.7% ALIGNED</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-cyan-500 h-full"
                          initial={{ width: "10%" }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-[8px]">
                        <span>SIGNAL_LOCK: SECURE</span>
                        <span>YEAR_RANGE: 2000 — 2026</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {guessState === "result" && guessedAnime && (
                  <motion.div
                    key="result-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col sm:flex-row gap-5"
                  >
                    {/* Small thumbnail artwork */}
                    <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 relative">
                      <img
                        src={guessedAnime.image}
                        alt={guessedAnime.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-slate-1000/95 rounded text-[9px] font-mono font-bold text-white">
                        {guessedAnime.year}
                      </div>
                    </div>

                    {/* Guessed Anime metadata details */}
                    <div className="flex-grow space-y-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold font-mono text-purple-400 uppercase">
                            {guessedAnime.subtitle}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                            {guessedAnime.rating}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-xl text-white uppercase tracking-tight leading-snug">
                          {guessedAnime.title}
                        </h4>
                      </div>

                      {/* Display original Promo feedback tag clearly */}
                      <div className="p-2.5 bg-cyan-400/5 border border-cyan-400/20 rounded-lg">
                        <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase block tracking-wider mb-1">
                          🎭 THE GUESSED PROMO TEASER:
                        </span>
                        <p className="text-xs font-serif italic text-slate-200 leading-normal line-clamp-3">
                          {guessedAnime.promo || "Original release teaser broadcast channel scheduled."}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <button
                          id="scroll-to-guess"
                          onClick={() => {
                            // Find element and scroll to it
                            const el = document.getElementById(`public-anime-node-${guessedAnime.id}`);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "center" });
                              // Highlight or play promo
                              setActivePromoId(guessedAnime.id);
                            }
                          }}
                          className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold font-mono text-[10px] rounded hover:bg-cyan-400 transition-colors uppercase cursor-pointer"
                        >
                          LOCATE SHOW & SIMULATE PROMO
                        </button>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          GENRE MATCH: {guessingGenre}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Filter Controls */}
      <section id="anime-list-section" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-8 relative z-10">
        
        {/* Editorial Heading Section */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
              LEGENDARY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">SHOWCASE</span> <span className="text-xs font-mono font-bold text-cyan-400 not-italic uppercase ml-2 px-2 py-0.5 border border-cyan-400/30 rounded-md bg-cyan-400/5">YEARS 2000 — 2026</span>
            </h2>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Curated chronological collection with actual original promotional tags</p>
          </div>

          {/* DUAL MASTER FILTER CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center font-mono">
            {/* Decade Filters */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">1. DECADE EPOCH</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {["All", "2020s", "2010s", "2000s"].map((dec) => {
                  const active = selectedYearFilter === dec;
                  return (
                    <button
                      id={`decade-pill-${dec.toLowerCase()}`}
                      key={dec}
                      onClick={() => setSelectedYearFilter(dec)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        active
                          ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : "bg-[#0b0f19] border-white/5 text-slate-400 hover:text-slate-100 hover:border-white/10"
                      }`}
                    >
                      {dec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category / Genre Filters */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">2. CATEGORY LIMITER</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {["All", "Action", "Romance", "Sci-Fi", "Fantasy", "Adventure"].map((genre) => {
                  const active = selectedGenreFilter === genre;
                  return (
                    <button
                      id={`genre-pill-${genre.toLowerCase()}`}
                      key={genre}
                      onClick={() => setSelectedGenreFilter(genre)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        active
                          ? "bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                          : "bg-[#0b0f19] border-white/5 text-slate-400 hover:text-slate-100 hover:border-white/10"
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Rich Anime list containing shows from 2000 to 2026 with explicit display of PROMOS */}
        {filteredAnime.length === 0 ? (
          <div className="w-full text-center py-16 px-6 bg-[#090e1a]/40 border border-white/5 rounded-3xl flex flex-col items-center justify-center space-y-3">
            <ShieldAlert className="w-12 h-12 text-zinc-500 animate-pulse stroke-[1.5]" />
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">NO TIMELINE ALIGNMENTS DETECTED</p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The selected decade epoch and category limiter configuration yielded zero active simulation files. Try cycling another frequency slot.
            </p>
            <button
              id="reset-grid-filters-btn"
              onClick={() => {
                setSelectedYearFilter("All");
                setSelectedGenreFilter("All");
              }}
              className="mt-2 px-4 py-2 border border-white/10 uppercase text-[10px] font-mono text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              RESET FREQUENCY REELS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAnime.map((anime) => {
              const isLiked = localLiked.includes(anime.id);
              const showPromoLive = activePromoId === anime.id;

              return (
                <motion.div
                  id={`public-anime-node-${anime.id}`}
                  key={anime.id}
                  layout
                  className="glass-panel rounded-2xl border border-white/10 shadow-xl overflow-hidden bg-slate-950/40 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.06)] transition-all duration-300 flex flex-col sm:flex-row relative group"
                >
                  {/* Year Indicator tag absolute */}
                  <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-slate-900/90 backdrop-blur-md rounded-lg border border-white/10 font-mono text-xs font-bold text-white shadow-md">
                    {anime.year}
                  </div>

                  {/* Left image column */}
                  <div className="w-full sm:w-[170px] aspect-[3/4] sm:aspect-auto relative bg-slate-900 flex-shrink-0">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  {/* Right detailed info column */}
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-widest leading-none">
                          {anime.subtitle}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          {anime.rating}
                        </span>
                      </div>

                      <h3 className="font-display font-black text-xl text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                        {anime.title}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">
                        {anime.description}
                      </p>
                    </div>

                    {/* HIGHLY VISIBLE PROMO BLOCK - Requirement: "add its promo for each anime" */}
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                          <Volume2 className="w-3 h-3 animate-pulse" />
                          OFFICIAL SCREEN PROMO
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">broadcast preview</span>
                      </div>
                      <p className="text-xs font-serif italic text-slate-300 leading-normal">
                        {anime.promo || "Original release teaser broadcast channel scheduled."}
                      </p>
                    </div>

                    {/* Interactive actions for promo */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-slate-500 font-mono">
                      <button
                        id={`promo-trigger-${anime.id}`}
                        onClick={() => setActivePromoId(showPromoLive ? null : anime.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          showPromoLive 
                            ? "bg-cyan-500/15 border-cyan-500 text-cyan-400 shadow-md"
                            : "bg-[#0b101b] border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{showPromoLive ? "CONNECTING..." : "LIVE SIM"}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button 
                          id={`like-arch-${anime.id}`}
                          onClick={() => toggleLike(anime.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isLiked 
                              ? "bg-red-500/10 border-red-500 text-red-500" 
                              : "border-white/10 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />
                        </button>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{anime.genres[0]}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Dynamic simulator overlay for promo live simulation */}
        <AnimatePresence>
          {activePromoId && (() => {
            const showDetail = animeData.find((a) => a.id === activePromoId);
            if (!showDetail) return null;
            return (
              <motion.div
                id="live-promo-matrix-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full glass-panel border border-cyan-500/30 rounded-2xl bg-slate-950/90 overflow-hidden relative"
              >
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <h4 className="font-mono text-sm font-bold text-cyan-400 tracking-wide">
                        CELESTIAL_DECRYPT_CHANNEL // {showDetail.title.toUpperCase()}
                      </h4>
                    </div>
                    <button
                      id="close-sim-panel"
                      onClick={() => setActivePromoId(null)}
                      className="text-xs font-mono text-slate-400 hover:text-red-400 transition-colors border border-white/10 px-2.5 py-1 rounded bg-white/5 cursor-pointer"
                    >
                      DISCONNECT
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-3">
                      <p className="text-xs font-mono text-slate-400">
                        DECADE MATRIX COORDINATES: <span className="text-white">{showDetail.year} Broadcast Era</span>
                      </p>
                      <p className="text-base text-slate-100 font-semibold italic font-serif">
                        "{showDetail.promo}"
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                        {showDetail.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#090e1a] border border-white/10 text-center space-y-4">
                      <h5 className="font-mono text-xs font-bold text-slate-400">PROMO FEEDS ACCESS</h5>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        To access full seasonal broadcasts, digital scripts, high fidelity soundtracks, or log personal favorites, please authenticate your session.
                      </p>
                      <button
                        id="promo-gate-login"
                        onClick={onOpenLogin}
                        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-xs font-bold text-slate-950 hover:opacity-90 active:scale-95 transition-all text-center cursor-pointer block"
                      >
                        SYNC TO VIEW FULL TRAILER
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* Landing footer */}
      <footer className="w-full border-t border-white/10 py-10 text-center bg-slate-950 relative z-20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center justify-center md:justify-start gap-1">
            <Tv className="w-4 h-4 text-cyan-500" />
            <span>ANIME NEXUS MATRIX © 2000 — 2026. THE TIMELINE GATE IS STABLE.</span>
          </div>
          <div>
            Adhering to strict editorial aesthetic guidelines. Built for the world of anime.
          </div>
        </div>
      </footer>
    </div>
  );
}
