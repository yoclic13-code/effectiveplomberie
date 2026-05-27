import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, X, Trash2, Mail, Phone, Calendar, AlertTriangle } from 'lucide-react';
import { ContactSubmission, DevisSubmission } from '../types';

export default function AdminSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'devis'>('contact');

  const [contactList, setContactList] = useState<ContactSubmission[]>([]);
  const [devisList, setDevisList] = useState<DevisSubmission[]>([]);

  const loadData = () => {
    try {
      setContactList(JSON.parse(localStorage.getItem('contactSubmissions') || '[]'));
      setDevisList(JSON.parse(localStorage.getItem('devisSubmissions') || '[]'));
    } catch {
      // safe fallback
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const deleteSubmission = (type: 'contact' | 'devis', id: string) => {
    const key = type === 'contact' ? 'contactSubmissions' : 'devisSubmissions';
    const list = type === 'contact' ? contactList : devisList;
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    loadData();
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'faible':
        return 'bg-slate-100 text-slate-600 font-sans';
      case 'moyen':
        return 'bg-blue-50 text-[#2563eb] font-sans';
      case 'urgent':
        return 'bg-orange-50 text-orange-600 border border-orange-100 font-sans';
      case 'critique':
        return 'bg-rose-50 text-rose-600 border border-rose-100 animate-pulse font-sans';
      default:
        return 'bg-slate-100 text-slate-600 font-sans';
    }
  };

  return (
    <>
      <button
        id="admin-widget-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white border border-natural-border hover:border-natural-primary/50 hover:bg-slate-50 p-3 rounded-full text-natural-primary transition-all shadow-xl flex items-center gap-2 cursor-pointer group"
        title="Visualiser les envois de formulaires (test local)"
      >
        <Database className="w-5 h-5 group-hover:rotate-12 transition-transform text-[#2563eb]" />
        <span className="text-xs font-bold pr-1 hidden sm:inline text-natural-heading">
          Inspecteur Demandes
        </span>
        {(contactList.length > 0 || devisList.length > 0) && (
          <span className="w-2.5 h-2.5 bg-[#2563eb] rounded-full animate-pulse absolute top-0.5 right-0.5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="admin-panel-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900 z-50"
            />

            <motion.div
              id="admin-side-sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white border-l border-natural-border shadow-2xl z-50 flex flex-col justify-between font-sans"
            >
              <div className="p-5 border-b border-natural-border bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-natural-primary flex items-center justify-center">
                    <Database className="w-4.5 h-4.5 text-[#2563eb]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-natural-heading tracking-tight">
                      Demandes reçues (local)
                    </h3>
                    <span className="block text-[10px] uppercase text-slate-500 font-mono">
                      Contact & devis
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 pt-3 flex border-b border-natural-border text-xs font-mono bg-slate-50">
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'contact'
                      ? 'border-natural-primary text-natural-primary font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Contact ({contactList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('devis')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'devis'
                      ? 'border-natural-primary text-natural-primary font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Devis ({devisList.length})
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                {activeTab === 'contact' &&
                  (contactList.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs space-y-2">
                      <AlertTriangle className="w-8 h-8 mx-auto text-slate-400 animate-pulse" />
                      <p>Aucune demande de contact.</p>
                    </div>
                  ) : (
                    contactList.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-xl bg-slate-50 border border-natural-border space-y-2 text-xs relative group-host hover:border-slate-300 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => deleteSubmission('contact', c.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="pr-6 text-left">
                          <span className="block text-natural-heading font-bold">{c.name}</span>
                          <span className="block text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {c.date}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-slate-200 pb-1.5 font-mono text-left">
                          <span className="text-slate-600 flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 shrink-0" />
                            {c.email}
                          </span>
                          <span className="text-slate-600 flex items-center gap-1 truncate">
                            <Phone className="w-3 h-3 shrink-0" />
                            {c.phone}
                          </span>
                        </div>
                        <p className="text-slate-700 bg-white border border-slate-100 p-2.5 rounded-lg text-xs italic leading-relaxed text-left">
                          &ldquo;{c.message}&rdquo;
                        </p>
                      </div>
                    ))
                  ))}

                {activeTab === 'devis' &&
                  (devisList.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs space-y-2">
                      <AlertTriangle className="w-8 h-8 mx-auto text-slate-400 animate-pulse" />
                      <p>Aucune demande de devis.</p>
                    </div>
                  ) : (
                    devisList.map((d) => (
                      <div
                        key={d.id}
                        className="p-4 rounded-xl bg-slate-50 border border-natural-border space-y-2 text-xs relative hover:border-slate-300 transition-colors font-sans"
                      >
                        <button
                          type="button"
                          onClick={() => deleteSubmission('devis', d.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="pr-6 text-left">
                          <span className="block text-natural-heading font-bold">{d.clientName}</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            <span className="text-[10px] font-bold font-mono uppercase bg-blue-50 text-natural-primary px-2 py-0.5 rounded-full">
                              {d.serviceType}
                            </span>
                            <span
                              className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${getUrgencyBadge(d.urgency)}`}
                            >
                              {d.urgency}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-1.5 border-t border-b border-slate-200 text-[11px] font-mono text-slate-600 text-left">
                          <div>
                            📍 {d.address}
                          </div>
                          <div className="flex gap-4 mt-0.5">
                            <span>📞 {d.phone}</span>
                            <span>📅 {d.approximateDate}</span>
                          </div>
                        </div>
                        {d.details && (
                          <p className="text-slate-700 bg-white border border-slate-100 p-2.5 rounded-lg text-xs italic leading-relaxed text-left">
                            &ldquo;{d.details}&rdquo;
                          </p>
                        )}
                        <div className="text-[10px] text-slate-500 font-mono mt-2">Reçu : {d.date}</div>
                      </div>
                    ))
                  ))}
              </div>

              <div className="p-4 border-t border-natural-border bg-slate-50 text-[10px] text-slate-500 font-mono text-center">
                Données stockées localement dans le navigateur (test).
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
