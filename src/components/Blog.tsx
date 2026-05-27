import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { BLOG_POSTS } from '../blog/blogData';
import { BLOG_CATEGORIES } from '../blog/blogCategories';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-natural-bg">
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-200 text-sm font-medium mb-2 uppercase tracking-widest">
            Conseils & expertise
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Blog plomberie — Aix-en-Provence & Marseille
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Conseils pratiques, guides techniques et actualités de la plomberie et du chauffage
            dans le département 13, par Wissem ALAYA.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrer par catégorie">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
            }`}
            aria-pressed={activeCategory === 'all'}
          >
            Tous les articles ({BLOG_POSTS.length})
          </button>
          {BLOG_CATEGORIES.map((cat) => {
            const count = BLOG_POSTS.filter((p) => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden h-full"
                aria-label={`Lire : ${post.title}`}
              >
                <div className="h-44 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={post.coverSrc}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-blue-300 text-4xl font-bold opacity-30 pointer-events-none">
                    {BLOG_CATEGORIES.find((c) => c.id === post.category)?.label.charAt(0)}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {BLOG_CATEGORIES.find((c) => c.id === post.category)?.label}
                  </span>
                  <h2 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime} min
                    </span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
