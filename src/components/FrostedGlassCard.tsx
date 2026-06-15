import { motion } from "motion/react";
import { Play, Star, Calendar, Layers } from "lucide-react";

export interface FrostedGlassCardProps {
  image: string;
  title: string;
  subtitle: string;
  rating?: number;
  episodes?: number | string;
  year?: string;
  genre?: string[];
  description?: string;
  isPopular?: boolean;
  onClick?: () => void;
}

export function FrostedGlassCard({
  image,
  title,
  subtitle,
  rating = 8.5,
  episodes = "12",
  year = "2024",
  genre = ["Action", "Sci-Fi"],
  description = "An incredible journey of discovery and destiny that will challenge everything they know.",
  isPopular = false,
  onClick,
}: FrostedGlassCardProps) {
  return (
    <motion.div
      id={`anime-card-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      className="glass-panel group relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md cursor-pointer transition-all duration-300"
      whileHover={{
        y: -8,
        borderColor: "rgba(6, 182, 212, 0.5)",
        boxShadow: "0 12px 30px rgba(6, 182, 212, 0.2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
    >
      {/* Popular Indicator Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {isPopular && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/20">
            TRENDING
          </span>
        )}
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 border border-white/10 text-amber-400">
          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Card Cover Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover glass fade & action buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play Icon hover action overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div 
            className="w-14 h-14 rounded-full bg-neon-blue/20 backdrop-blur-md border border-neon-blue/60 flex items-center justify-center text-neon-blue"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 240, 255, 0.4)" }}
          >
            <Play className="w-6 h-6 fill-neon-blue stroke-neon-blue ml-0.5" />
          </motion.div>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="flex flex-col flex-grow p-4 bg-gradient-to-b from-transparent to-[#0a0a14]/90">
        {/* Studio / Subtitle */}
        <span className="text-[11px] font-medium tracking-wider text-neon-blue uppercase mb-1">
          {subtitle}
        </span>

        {/* Anime Show Title */}
        <h3 className="font-display font-bold text-lg leading-snug text-white group-hover:text-neon-blue transition-colors duration-200 line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Short Synopsis Description */}
        <p className="text-xs text-zinc-400 font-normal line-clamp-2 mb-4 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Micro Meta Information badges */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span>{episodes} EP</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{year}</span>
          </div>
          <div className="flex gap-1">
            {genre.slice(0, 1).map((g) => (
              <span key={g} className="px-1.5 py-0.2 bg-white/5 border border-white/10 rounded">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
