import { motion, AnimatePresence } from "motion/react";
import { X, Play, Heart, Star, Calendar, Clock, Sparkles } from "lucide-react";
import { AnimeShow } from "@/src/types";
import { useState } from "react";

interface AnimeDetailModalProps {
  show: AnimeShow | null;
  onClose: () => void;
}

export function AnimeDetailModal({ show, onClose }: AnimeDetailModalProps) {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Panel Container */}
        <motion.div
          id={`detail-modal-${show.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d17]/90 shadow-[0_0_80px_rgba(0,240,255,0.15)] relative text-left"
        >
          {/* Close button absolute */}
          <button
            id="close-modal-button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:text-[#00f0ff] hover:bg-black/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 h-full max-h-[85vh] overflow-y-auto">
            {/* Left Cover column */}
            <div className="md:col-span-2 relative aspect-[3/4] md:aspect-auto md:h-full bg-zinc-950 min-h-[350px]">
              <img
                src={show.image}
                alt={show.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0d17] via-transparent to-transparent md:from-transparent md:via-[#0d0d17]/30 md:to-[#0d0d17] z-10" />
              
              {/* Action Buttons overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-3">
                <button
                  id="play-trailer-button"
                  onClick={() => setIsTrailerPlaying(true)}
                  className="flex-grow py-3 px-4 rounded-xl font-display font-bold text-xs uppercase bg-neon-blue text-black hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <Play className="w-4 h-4 fill-black stroke-black" />
                  <span>PLAY TRAILER</span>
                </button>
                <button
                  id="favorite-anime-button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    isFavorite
                      ? "bg-neon-pink/20 border-neon-pink text-neon-pink shadow-[0_0_15px_rgba(255,42,116,0.2)]"
                      : "bg-black/50 border-white/10 text-white hover:border-white/20"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-neon-pink" : ""}`} />
                </button>
              </div>
            </div>

            {/* Right Information details column */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                {/* Meta Tags and Studio info */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] font-bold text-neon-blue uppercase">
                    {show.subtitle}
                  </span>
                  {show.isPopular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full text-[10px] font-bold text-white shadow-md shadow-neon-pink/15">
                      TRENDING
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/10 rounded-full text-[11px] font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    {show.rating.toFixed(1)} / 10
                  </span>
                </div>

                {/* Main Title heading info */}
                <div>
                  <h1 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-none mb-1">
                    {show.title}
                  </h1>
                  <p className="text-sm text-neon-blue font-mono">Original Broadcast Collection</p>
                </div>

                {/* Quick key value stats */}
                <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-center font-mono">
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Season length</span>
                    <span className="text-sm font-semibold text-white">{show.episodes} EPS</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Release year</span>
                    <span className="text-sm font-semibold text-white">{show.year}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Interactive rate</span>
                    <span className="text-sm font-semibold text-white">RATING-A</span>
                  </div>
                </div>

                {/* Genre Filter categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">Categories</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {show.genres.map((g) => (
                      <span key={g} className="px-3 py-1 text-xs bg-white/5 border border-white/10 text-zinc-300 rounded-lg hover:border-neon-blue/40 hover:text-neon-blue transition-all">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Long Synopsis Text descriptions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">Synopsis</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {show.description}
                  </p>
                </div>
              </div>

              {/* Simulated community reviews or extra notes */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center font-bold text-black text-[11px]">
                    SA
                  </div>
                  <div>
                    <p className="text-white font-semibold">Synced Review</p>
                    <p className="text-[10px] text-zinc-500">"Incredible fluid visual work design" — @shibuya_rider</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-xl font-mono text-[10px] text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-neon-blue" />
                  <span>Update: Just now</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Player overlay */}
        <AnimatePresence>
          {isTrailerPlaying && (
            <motion.div
              id="synced-player-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#030307] flex flex-col items-center justify-center p-6"
            >
              <button
                id="close-player-button"
                onClick={() => setIsTrailerPlaying(false)}
                className="absolute top-6 right-6 z-20 px-4 py-2 bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-400 rounded-xl font-mono text-xs text-white transition-all cursor-pointer"
              >
                DISCONNECT CHANNEL
              </button>

              <div className="w-full max-w-3xl aspect-video glass-panel rounded-2xl border border-neon-blue/30 bg-black/60 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Visual grid inside simulator */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0)_80%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40 pointer-events-none" />

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="flex flex-col items-center text-center space-y-4 px-6 z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue animate-pulse">
                    <Sparkles className="w-8 h-8 text-neon-blue" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    {show.title} — SIMULATED TRAILER LIVE
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-md">
                    Connecting to streaming frequency... The full trial player is ready. Decrypting high-definition video frames.
                  </p>
                  <p className="font-mono text-xs text-neon-blue">
                    STREAM_PORT: 3000 // DECRYTION_SUCCESS
                  </p>
                </motion.div>
                
                {/* Lower timeline simulator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
