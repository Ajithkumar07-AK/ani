export interface AnimeShow {
  id: string;
  title: string;
  subtitle: string; // Studio or Creator group
  description: string;
  image: string;
  rating: number;
  episodes: number;
  year: string;
  genres: string[];
  isPopular: boolean;
  featured?: boolean;
}

export const animeData: AnimeShow[] = [
  {
    id: "cyberpunk-nexus",
    title: "Cyberpunk: Nexus",
    subtitle: "TRIGGER NEON",
    description: "In the neon-drenched skies of Tokyo's Underbelly, a rebellious augmented teenager fights to climb the grid and expose corporate consciousness hacking before his biochip burns out.",
    image: "/src/assets/images/cyberpunk_nexus_1781513849922.jpg",
    rating: 9.4,
    episodes: 10,
    year: "2025",
    genres: ["Cyberpunk", "Action", "Sci-Fi"],
    isPopular: true,
    featured: true,
  },
  {
    id: "chronicles-frieren",
    title: "Chronicles of Frieren",
    subtitle: "MADHOUSE STYLE",
    description: "A timeless, emotional exploration of friendship, mortality, and the quiet spaces left behind after heroes complete their legendary ten-year world-saving journey.",
    image: "/src/assets/images/frieren_meadow_1781513866122.jpg",
    rating: 9.8,
    episodes: 28,
    year: "2024",
    genres: ["Fantasy", "Adventure", "Drama"],
    isPopular: true,
  },
  {
    id: "cybernetic-arise",
    title: "Ghost Protocol: Arise",
    subtitle: "PRODUCTION I.G.",
    description: "A deep-dive brain-hacker espionage squad navigates neural-net security alerts and quantum-mechanical ghosts to catch a mysterious shadow entity.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop",
    rating: 9.1,
    episodes: 12,
    year: "2024",
    genres: ["Sci-Fi", "Cyberpunk", "Mecha"],
    isPopular: false,
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Shinobu",
    subtitle: "UFOTABLE INC",
    description: "Traditional breathing-style swordplay meets modern aesthetic visual fury. Warriors protect the boundary of life and death under a historic demon-haunted violet sky.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop",
    rating: 9.3,
    episodes: 24,
    year: "2023",
    genres: ["Action", "Historical", "Fantasy"],
    isPopular: true,
  },
  {
    id: "tokyo-chronostasis",
    title: "Tokyo Chronostasis",
    subtitle: "MAPPA FLIGHT",
    description: "An isolated high-school student stumbles upon the 'Midnight Hour', a hidden time distortion when Shibuya freezes entirely, leaving him targets of time-devouring entities.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600&auto=format&fit=crop",
    rating: 8.9,
    episodes: 12,
    year: "2024",
    genres: ["Sci-Fi", "Action", "Mystery"],
    isPopular: false,
  },
  {
    id: "synthwave-mech",
    title: "Vivid Genesis",
    subtitle: "GAINAX CORE",
    description: "Pilots harness emotional resonance and synthetic synchronization matrices to interface with the world's last line of bio-mechanical defenders.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    rating: 8.7,
    episodes: 26,
    year: "1995",
    genres: ["Mecha", "Sci-Fi", "Psychological"],
    isPopular: false,
  },
  {
    id: "the-silent-sakura",
    title: "Silent Sakura Alleys",
    subtitle: "CLANNAD LIGHT",
    description: "A gorgeous, contemplative romantic high school story under falling petals where two classmates build a secret skyward rooftop garden to share words they cannot speak.",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop",
    rating: 9.2,
    episodes: 13,
    year: "2023",
    genres: ["Drama", "Romance", "Slice of Life"],
    isPopular: false,
  },
  {
    id: "leveling-void",
    title: "Leveling the Void",
    subtitle: "A-1 PICTURES",
    description: "A bottom-tier dungeon raider inherits a celestial blue-screen custom user interface, letting him level up his core stats indefinitely in a world bound by classes.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    rating: 9.5,
    episodes: 12,
    year: "2025",
    genres: ["Action", "Fantasy", "Adventure"],
    isPopular: true,
  },
];
