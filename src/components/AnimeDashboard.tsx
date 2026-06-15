import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, LogOut, Search, Sparkles, SlidersHorizontal, 
  Tv, Bookmark, Star, Play, MessageSquareOff, Compass, Smile, Flame
} from "lucide-react";
import { UserSession, AnimeShow } from "@/src/types";
import { animeData } from "@/src/data/anime";
import { FrostedGlassCard } from "@/src/components/FrostedGlassCard";
import { AnimeDetailModal } from "@/src/components/AnimeDetailModal";

interface AnimeDashboardProps {
  user: UserSession | null;
  onLogout: () => void;
}

export function AnimeDashboard({ user, onLogout }: AnimeDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedAnime, setSelectedAnime] = useState<AnimeShow | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>(["cyberpunk-nexus", "chronicles-frieren"]);

  // All available categories derived from data
  const genres = useMemo(() => {
    const allGenres = new Set<string>();
    animeData.forEach((anime) => {
      anime.genres.forEach((genre) => allGenres.add(genre));
    });
    return ["All", ...Array.from(allGenres)];
  }, []);

  // Filter shows based on query and genre selection
  const filteredAnime = useMemo(() => {
    return animeData.filter((anime) => {
      const matchesSearch = 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = 
        selectedGenre === "All" || anime.genres.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  // Find featured show
  const featuredShow = useMemo(() => {
    return animeData.find((show) => show.featured) || animeData[0];
  }, []);

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (watchlist.includes(id)) {
      setWatchlist((prev) => prev.filter((item) => item !== id));
    } else {
      setWatchlist((prev) => [...prev, id]);
    }
  };

  return (
    <div id="anime-dashboard-container" className="w-full min-h-screen bg-[#030307] text-white flex flex-col relative">
      {/* Background soft ambient orbs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40vh] left-[-100px] w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[120px] pointer-events-none" />

      {/* Decorative Matrix grid scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-15 pointer-events-none z-10" />

      {/* Primary Navigation Bar Header */}
      <header id="dashboard-header" className="sticky top-0 w-full z-40 bg-slate-950/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        {/* Branding Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center font-display font-black text-slate-950">
            A
          </div>
          <span className="font-display font-black tracking-tighter text-xl uppercase text-white">
            ANIME<span className="text-cyan-400">PORTAL</span>
          </span>
        </div>

        {/* Dynamic User Profile Context and Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Welcome profile note (Desktop) */}
          <div className="hidden md:flex flex-col text-right font-sans">
            <span className="text-xs text-zinc-500 font-medium font-mono uppercase tracking-wider">SECURE_AGENT</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              {user?.name || "Guest Diver"}
            </span>
          </div>

          {/* Quick tracker watchlist stats counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-zinc-300">
            <Bookmark className="w-3.5 h-3.5 text-neon-pink fill-neon-pink/10" />
            <span className="hidden sm:inline text-[10px] text-zinc-500 font-semibold uppercase mr-1">Watchlist</span>
            <span className="font-bold text-neon-pink">{watchlist.length}</span>
          </div>

          {/* Sign out button */}
          <button
            id="logout-button"
            onClick={onLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/15 border border-red-500/20 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/25 hover:border-red-500/40 active:scale-95 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DISCONNECT</span>
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-12">
        
        {/* Featured Anime Jumbotron Banner Section */}
        {featuredShow && (
          <section id="featured-hero-banner" className="w-full relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] min-h-[350px] max-h-[500px] flex items-end">
            {/* Background image & gradient fade overlays */}
            <div className="absolute inset-0 bg-black">
              <img
                src={featuredShow.image}
                alt={featuredShow.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 transform scale-102 filter blur-[1px] md:blur-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030307] via-[#030307]/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030307] via-transparent to-transparent z-10 hidden md:block" />
            </div>

            {/* Glowing neon borders/accents inside */}
            <div className="absolute top-4 left-4 z-20 flex gap-1.5">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-neon-blue/20 border border-neon-blue/40 text-neon-blue text-[10px] font-bold tracking-wider rounded-lg uppercase">
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                Featured Simulcast
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-white/10 text-amber-400 text-[10px] font-bold rounded-lg uppercase">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                {featuredShow.rating} Rating
              </span>
            </div>

            {/* Featured Details pane */}
            <div className="relative z-20 w-full max-w-2xl p-6 md:p-10 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-neon-blue font-mono uppercase">
                {featuredShow.subtitle}
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
                {featuredShow.title}
              </h2>
              <p className="text-sm text-zinc-300 font-normal leading-relaxed max-w-lg line-clamp-3">
                {featuredShow.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="featured-watch-now"
                  onClick={() => setSelectedAnime(featuredShow)}
                  className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 active:scale-95 text-black font-display font-bold text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  <Play className="w-4 h-4 fill-black stroke-black" />
                  <span>DECRYPT ARCHIVE</span>
                </button>
                
                <button
                  id="featured-watchlist-toggle"
                  onClick={(e) => toggleWatchlist(featuredShow.id, e)}
                  className={`px-5 py-3 rounded-xl border font-display font-bold text-xs uppercase flex items-center gap-2 transition-all cursor-pointer ${
                    watchlist.includes(featuredShow.id)
                      ? "bg-neon-pink/15 border-neon-pink/40 text-neon-pink"
                      : "bg-black/40 border-white/10 text-white hover:border-white/20"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${watchlist.includes(featuredShow.id) ? "fill-neon-pink" : ""}`} />
                  <span>{watchlist.includes(featuredShow.id) ? "TRACKED" : "ADD WATCHLIST"}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Live Filter & Selection Bar */}
        <section id="filter-selection-section" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mb-1.5 text-white">
                EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">CELESTIAL</span> VAULT
              </h1>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Curated collection of top-rated verified matrix anime</p>
            </div>

            {/* Combined Search Form */}
            <div className="flex items-center gap-3 w-full md:max-w-md relative">
              <div className="relative w-full">
                <span className="absolute left-3.5 top-3.5 text-zinc-500">
                  <Search className="w-4.5 h-4.5" />
                </span>
                <input
                  id="anime-search-input"
                  type="text"
                  placeholder="Search series title, genre, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl font-sans text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-all duration-200"
                />
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-neon-blue cursor-pointer transition-colors">
                <SlidersHorizontal className="w-4.5 h-4.5" />
              </div>
            </div>
          </div>

          {/* Genre Category badges row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {genres.map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  id={`genre-filter-${genre.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold"
                      : "bg-[#0b0b14]/50 border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </section>

        {/* Responsive Grid Results */}
        <section id="anime-grid-section" className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredAnime.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredAnime.map((anime) => (
                  <div key={anime.id} className="relative group/card-wrapper">
                    {/* Floating mini-button overlay to togglewatchlist directly */}
                    <button
                      id={`watchlist-cap-${anime.id}`}
                      onClick={(e) => toggleWatchlist(anime.id, e)}
                      className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover/card-wrapper:opacity-100 cursor-pointer ${
                        watchlist.includes(anime.id)
                          ? "bg-neon-pink border-neon-pink text-white shadow-md shadow-neon-pink/25"
                          : "bg-black/60 border-white/15 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Plus className={`w-3.5 h-3.5 transform transition-transform duration-200 ${watchlist.includes(anime.id) ? "rotate-45" : ""}`} />
                    </button>

                    <FrostedGlassCard
                      title={anime.title}
                      subtitle={anime.subtitle}
                      image={anime.image}
                      rating={anime.rating}
                      episodes={anime.episodes}
                      year={anime.year}
                      genre={anime.genres}
                      description={anime.description}
                      isPopular={anime.isPopular}
                      onClick={() => setSelectedAnime(anime)}
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full py-16 px-4 text-center rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 text-zinc-500">
                  <MessageSquareOff className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">No archives aligned with search criteria</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    Adjust your tag filters or check for spelling errors inside the query.
                  </p>
                </div>
                <button
                  id="reset-filter-button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("All");
                  }}
                  className="px-4 py-2 rounded-lg border border-white/10 text-xs font-mono text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/30 active:scale-95 transition-all cursor-pointer"
                >
                  RESET_MATRIC_COGNITION
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer copyright note */}
      <footer className="w-full border-t border-white/5 py-8 text-center bg-[#040409]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center justify-center sm:justify-start gap-1">
            <Tv className="w-3.5 h-3.5 text-zinc-600" />
            <span>ANIME PORTAL CORP © 2026. ALL SECTIONS SYNCED.</span>
          </div>
          <div>
            Built with React, Vite, Tailwind CSS & Motion. Powered by Antigravity core engines.
          </div>
        </div>
      </footer>

      {/* Integrated Modal Details trigger */}
      <AnimeDetailModal
        show={selectedAnime}
        onClose={() => setSelectedAnime(null)}
      />
    </div>
  );
}
