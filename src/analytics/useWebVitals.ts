import { useEffect } from 'react';
import { trackWebVital } from './ga4';

type VitalRating = 'good' | 'needs-improvement' | 'poor';

function send(metric: {
  name: 'LCP' | 'CLS' | 'FCP' | 'TTFB' | 'INP';
  value: number;
  rating?: VitalRating;
  delta: number;
  id: string;
}) {
  trackWebVital({
    name: metric.name,
    value: metric.value,
    rating: metric.rating ?? 'good',
    delta: metric.delta,
    id: metric.id,
  });
}

export function useWebVitals() {
  useEffect(() => {
    import('web-vitals')
      .then(({ onLCP, onCLS, onFCP, onTTFB, onINP }) => {
        onLCP((m) => send({ name: 'LCP', value: m.value, rating: m.rating, delta: m.delta, id: m.id }));
        onCLS((m) => send({ name: 'CLS', value: m.value, rating: m.rating, delta: m.delta, id: m.id }));
        onFCP((m) => send({ name: 'FCP', value: m.value, rating: m.rating, delta: m.delta, id: m.id }));
        onTTFB((m) => send({ name: 'TTFB', value: m.value, rating: m.rating, delta: m.delta, id: m.id }));
        onINP((m) => send({ name: 'INP', value: m.value, rating: m.rating, delta: m.delta, id: m.id }));
      })
      .catch(() => {
        /* web-vitals indisponible */
      });
  }, []);
}
