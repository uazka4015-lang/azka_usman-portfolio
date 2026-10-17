import React, { useState } from 'react';
import { X, Film, Sparkles, Sliders, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SampleMovie {
  id: string;
  title: string;
  genres: string[];
  director: string;
  cast: string[];
  keywords: string[];
  recommendations: {
    title: string;
    similarity: number;
    matchReason: string;
    genres: string[];
  }[];
}

const SAMPLE_MOVIES: SampleMovie[] = [
  {
    id: 'inception',
    title: 'Inception (2010)',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    keywords: ['dream within a dream', 'heist', 'subconscious', 'mind manipulation'],
    recommendations: [
      {
        title: 'Interstellar (2014)',
        similarity: 0.942,
        matchReason: 'Christopher Nolan direction, high-concept sci-fi, philosophical themes',
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
      },
      {
        title: 'Shutter Island (2010)',
        similarity: 0.887,
        matchReason: 'Leonardo DiCaprio lead, psychological thriller, perception distortion',
        genres: ['Mystery', 'Thriller'],
      },
      {
        title: 'The Prestige (2006)',
        similarity: 0.865,
        matchReason: 'Christopher Nolan, obsessive rivalry, non-linear psychological puzzle',
        genres: ['Drama', 'Mystery', 'Sci-Fi'],
      },
      {
        title: 'Source Code (2011)',
        similarity: 0.831,
        matchReason: 'Time-loop investigation, reality manipulation, high stakes thriller',
        genres: ['Sci-Fi', 'Action'],
      },
    ],
  },
  {
    id: 'dark-knight',
    title: 'The Dark Knight (2008)',
    genres: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    keywords: ['gotham city', 'joker', 'anarchy', 'vigilante justice'],
    recommendations: [
      {
        title: 'The Dark Knight Rises (2012)',
        similarity: 0.965,
        matchReason: 'Direct Nolan trilogy sequel, Christian Bale, Gotham vigilante lore',
        genres: ['Action', 'Crime', 'Drama'],
      },
      {
        title: 'Batman Begins (2005)',
        similarity: 0.932,
        matchReason: 'Nolan trilogy origin, identical core creative team and thematic weight',
        genres: ['Action', 'Crime'],
      },
      {
        title: 'The Departed (2006)',
        similarity: 0.841,
        matchReason: 'Intense crime drama, moral ambiguity, corrupt city systems',
        genres: ['Crime', 'Drama', 'Thriller'],
      },
      {
        title: 'Heat (1995)',
        similarity: 0.814,
        matchReason: 'Primary stylistic inspiration for Nolan’s Gotham bank heist sequence',
        genres: ['Action', 'Crime', 'Drama'],
      },
    ],
  },
  {
    id: 'interstellar',
    title: 'Interstellar (2014)',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    keywords: ['wormhole', 'black hole', 'relativity', 'space exploration', 'time dilation'],
    recommendations: [
      {
        title: 'Contact (1997)',
        similarity: 0.898,
        matchReason: 'Kip Thorne astrophysics roots, deep space radio signals, Matthew McConaughey',
        genres: ['Drama', 'Mystery', 'Sci-Fi'],
      },
      {
        title: '2001: A Space Odyssey (1968)',
        similarity: 0.884,
        matchReason: 'Cosmic existential journey, artificial intelligence, monumental sci-fi scale',
        genres: ['Adventure', 'Sci-Fi'],
      },
      {
        title: 'Arrival (2016)',
        similarity: 0.867,
        matchReason: 'Non-linear time mechanics, emotional human core amidst alien contact',
        genres: ['Drama', 'Sci-Fi'],
      },
      {
        title: 'The Martian (2015)',
        similarity: 0.822,
        matchReason: 'Realistic space survival, engineering resilience, planetary isolation',
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
      },
    ],
  },
];

export const MovieRecDemoModal: React.FC<MovieModalProps> = ({ isOpen, onClose }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>('inception');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentMovie = SAMPLE_MOVIES.find((m) => m.id === selectedMovieId) || SAMPLE_MOVIES[0];

  const handleSelectMovie = (id: string) => {
    setIsCalculating(true);
    setSelectedMovieId(id);
    setTimeout(() => {
      setIsCalculating(false);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">
                TMDB 5000 Movie Recommendation Engine
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Content-Based Vector Space Modeling & Cosine Similarity Matrix
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dataset Explanation */}
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-zinc-300 font-sans space-y-1.5">
          <p>
            <strong>How the system works:</strong> We ingest the TMDB 5000 dataset, extract metadata tags (genres, plot keywords, director, and top 3 cast members), generate a unified textual fingerprint, tokenize with Scikit-learn’s <code className="text-cyan-300 font-mono">CountVectorizer</code> (stopping words removed), and compute pairwise angles via <code className="text-cyan-300 font-mono">cosine_similarity(matrix, matrix)</code>.
          </p>
        </div>

        {/* Movie Selector */}
        <div className="mt-6">
          <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
            Select a Source Movie to Vectorize:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_MOVIES.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelectMovie(movie.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedMovieId === movie.id
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm text-white">{movie.title}</div>
                <div className="text-[11px] font-mono text-cyan-400/90 mt-1">
                  Dir: {movie.director}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Movie Metadata Soup */}
        <div className="mt-6 bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-xs space-y-2">
          <div className="text-cyan-300 font-semibold flex items-center justify-between">
            <span>Engineered Metadata Vector Representation:</span>
            <span className="text-[10px] text-zinc-500">TMDB-5000 NLP Pipeline</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-zinc-500">Director:</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 text-sky-300 border border-sky-500/30">
              {currentMovie.director}
            </span>
            <span className="text-zinc-500 ml-2">Genres:</span>
            {currentMovie.genres.map((g) => (
              <span key={g} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-white/10">
                {g}
              </span>
            ))}
            <span className="text-zinc-500 ml-2">Keywords:</span>
            {currentMovie.keywords.map((k) => (
              <span key={k} className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-cyan-500/20">
                #{k}
              </span>
            ))}
          </div>
        </div>

        {/* Recommendations Output */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
            <span>TOP SIMILARITY MATCHES (COSINE DISTANCE):</span>
            {isCalculating && (
              <span className="text-cyan-400 flex items-center gap-1 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" /> Computing matrix dot products...
              </span>
            )}
          </div>

          <div className="space-y-3">
            {currentMovie.recommendations.map((rec, idx) => (
              <div
                key={rec.title}
                className="p-4 rounded-xl bg-zinc-950/70 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                    <h4 className="font-bold text-white text-sm">{rec.title}</h4>
                    <div className="flex gap-1">
                      {rec.genres.map((g) => (
                        <span key={g} className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">
                    {rec.matchReason}
                  </p>
                </div>

                {/* Similarity Score Meter */}
                <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-cyan-300">
                      {(rec.similarity * 100).toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block">Similarity</span>
                  </div>
                  <div className="w-24 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full"
                      style={{ width: `${rec.similarity * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Python + Scikit-learn + Streamlit</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold"
          >
            Close Engine
          </button>
        </div>
      </div>
    </div>
  );
};
