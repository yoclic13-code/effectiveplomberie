import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, User, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { getPostBySlug, type BlogSection } from '../blog/blogData';
import { BLOG_CATEGORIES } from '../blog/blogCategories';
import { useBlogSEO } from '../blog/useBlogSEO';
import { BRAND } from '../brand';

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {section.content as string}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          {section.content as string}
        </h3>
      );
    case 'p':
      return (
        <p key={i} className="text-gray-700 leading-relaxed mb-5">
          {section.content as string}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="list-disc list-inside space-y-2 mb-5 text-gray-700">
          {(section.content as string[]).map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 mb-5 text-gray-700">
          {(section.content as string[]).map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div key={i} className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-5">
          <p className="text-blue-800 text-sm leading-relaxed">💡 {section.content as string}</p>
        </div>
      );
    case 'warning':
      return (
        <div key={i} className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
          <p className="text-amber-800 text-sm leading-relaxed">⚠️ {section.content as string}</p>
        </div>
      );
    case 'table': {
      const { headers, rows } = section.content as { headers: string[]; rows: string[][] };
      return (
        <div key={i} className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((h, j) => (
                  <th key={j} className="text-left p-3 font-semibold text-gray-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  {row.map((cell, k) => (
                    <td key={k} className="p-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useBlogSEO(post);

  if (!post) return <Navigate to="/blog" replace />;

  const category = BLOG_CATEGORIES.find((c) => c.id === post.category);
  const articleUrl = `${BRAND.siteUrl}/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: `${BRAND.siteUrl}${BRAND.logoSrc}`,
    },
    datePublished: post.date,
    image: `${BRAND.siteUrl}${post.coverSrc}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BRAND.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BRAND.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  const faqSchema =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="min-h-screen bg-natural-bg">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <header className="mb-8">
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
              {category?.label}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" /> {post.readTime} min de lecture
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            {post.zones.length > 0 && (
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  Zones : {post.zones.slice(0, 5).join(', ')}
                  {post.zones.length > 5 ? '…' : ''}
                </span>
              </div>
            )}
          </header>

          <article>{post.content.map((section, i) => renderSection(section, i))}</article>

          {post.faq.length > 0 && (
            <section className="mt-10 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
              <div className="space-y-4">
                {post.faq.map((item, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                    <summary className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed text-sm">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">Besoin d&apos;un plombier à Aix ou Marseille ?</h2>
            <p className="text-blue-100 mb-6 text-sm">
              Intervention rapide dans tout le département 13 — Wissem ALAYA, artisan certifié RGE
              depuis 2019.
            </p>
            <Link
              to={post.ctaLink}
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              {post.ctaText} <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour au blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
