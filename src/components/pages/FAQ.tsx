import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Phone, Mail, MessageSquare } from 'lucide-react';
import { useSEO } from '../../seo/useSEO';
import { trackPhoneCall } from '../../analytics/ga4';
import { BRAND } from '../../brand';
import {
  FAQ_DATA,
  ALL_FAQ_QUESTIONS,
  getFaqSchema,
  type FAQItem,
} from '../../faq/faqData';

function FAQAccordion({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors ${
        isOpen ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-trigger-${index}`}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={`font-medium text-sm leading-snug ${
            isOpen ? 'text-blue-700' : 'text-gray-900'
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1">
              <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  useSEO({ view: 'faq' });

  const [activeCategory, setActiveCategory] = useState('general');
  const [openIndexes, setOpenIndexes] = useState<Record<string, number | null>>({});
  const [search, setSearch] = useState('');

  const currentCategory = FAQ_DATA.find((c) => c.id === activeCategory)!;
  const questionCount = ALL_FAQ_QUESTIONS.length;

  const searchResults =
    search.length >= 3
      ? FAQ_DATA.flatMap((cat) =>
          cat.questions
            .filter(
              (q) =>
                q.question.toLowerCase().includes(search.toLowerCase()) ||
                q.answer.toLowerCase().includes(search.toLowerCase()),
            )
            .map((q) => ({ ...q, category: cat.label })),
        )
      : [];

  const toggleQuestion = (catId: string, index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [catId]: prev[catId] === index ? null : index,
    }));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema()) }}
      />

      <div className="min-h-screen bg-natural-bg">
        <div className="bg-blue-700 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-blue-300 text-sm font-medium mb-2 uppercase tracking-widest">
              Toutes vos questions
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Foire Aux Questions</h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              {questionCount} questions répondues sur la plomberie, le chauffage et les sanitaires
              à Aix-en-Provence et dans tout le 13.
            </p>

            <div className="relative max-w-lg mx-auto">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Chercher une question... (ex: chaudière, urgence, devis)"
                aria-label="Rechercher une question dans la FAQ"
                className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-xl px-5 py-4 pr-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <span className="absolute right-4 top-4 text-gray-400 text-sm" aria-hidden="true">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {search.length >= 3 && (
            <section aria-live="polite" className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {searchResults.length > 0
                  ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} pour « ${search} »`
                  : `Aucun résultat pour « ${search} »`}
              </h2>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.question}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                  <p className="text-gray-500 mb-4">
                    Votre question n&apos;est pas encore dans notre FAQ.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    Poser votre question directement
                  </Link>
                </div>
              )}
            </section>
          )}

          {search.length < 3 && (
            <div className="flex flex-col lg:flex-row gap-8">
              <nav aria-label="Catégories FAQ" className="lg:w-56 flex-shrink-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                  Catégories
                </p>
                <ul className="flex lg:flex-col gap-2 flex-wrap">
                  {FAQ_DATA.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        aria-current={activeCategory === cat.id ? 'true' : undefined}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          activeCategory === cat.id
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <span aria-hidden="true">{cat.emoji}</span>
                        <span>{cat.label}</span>
                        <span
                          className={`ml-auto text-xs font-mono ${
                            activeCategory === cat.id ? 'text-blue-200' : 'text-gray-400'
                          }`}
                        >
                          {cat.questions.length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {currentCategory.emoji} {currentCategory.label}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{currentCategory.description}</p>
                </div>

                <div className="space-y-3" role="list">
                  {currentCategory.questions.map((item, i) => (
                    <div key={i} role="listitem">
                      <FAQAccordion
                        item={item}
                        isOpen={openIndexes[activeCategory] === i}
                        onToggle={() => toggleQuestion(activeCategory, i)}
                        index={i}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Votre question n&apos;est pas listée ?
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              Contactez Wissem directement — réponse sous 2h en semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${BRAND.phoneTel}`}
                onClick={() => trackPhoneCall({ location: 'cta' })}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Appeler — {BRAND.phone}
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Formulaire de contact
              </Link>
              <Link
                to="/devis"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
