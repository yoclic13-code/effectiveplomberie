import { BRAND } from '../brand';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  emoji: string;
  description: string;
  questions: FAQItem[];
}

function faqText(text: string): string {
  return text
    .replace(/\[TELEPHONE\]/g, BRAND.phone)
    .replace(/\[EMAIL_PATRON\]/g, BRAND.email);
}

const RAW_FAQ: FAQCategory[] = [
  {
    id: 'general',
    label: 'Général & Urgences',
    emoji: '⚡',
    description: "Tout ce qu'il faut savoir sur nos interventions, délais et zones couvertes",
    questions: [
      {
        question: 'Dans quelles villes intervenez-vous dans le département 13 ?',
        answer:
          "EFFECTIVE'PLOMBERIE intervient dans tout le département des Bouches-du-Rhône : Aix-en-Provence (13080, 13090, 13100), Marseille (tous les arrondissements 13001 à 13016), Aubagne, Vitrolles, Marignane, Gardanne, Cassis, Allauch, Bouc-Bel-Air, Éguilles, Venelles, Martigues, Istres, Salon-de-Provence, Gémenos, Trets, Rousset, Fuveau et toutes les communes du 13. Si votre commune n'est pas listée, appelez-nous — nous étudions chaque demande.",
      },
      {
        question: 'Intervenez-vous en urgence 24h/24 et 7j/7 ?',
        answer:
          "Oui. Pour les urgences plomberie (fuite d'eau, canalisation bouchée, panne chaudière en hiver, dégât des eaux), nous intervenons 7 jours sur 7. Appelez directement le [TELEPHONE]. Les interventions nocturnes et week-end sont majorées de 20 à 25% — ce supplément est systématiquement annoncé avant toute intervention.",
      },
      {
        question: "Quel est le délai d'intervention pour une urgence à Aix-en-Provence ?",
        answer:
          'Basés à Aix-en-Provence, nous intervenons généralement en 15 à 30 minutes dans la ville. Pour les communes proches (Éguilles, Venelles, Bouc-Bel-Air, Gardanne), comptez 15 à 25 minutes. Pour Marseille, le délai est de 45 minutes à 1 heure selon le trafic. Pour les urgences, nous faisons tout notre possible pour intervenir le plus rapidement possible.',
      },
      {
        question: 'Êtes-vous disponible le week-end pour des travaux non urgents ?',
        answer:
          'Le samedi, nous intervenons de 8h à 17h pour les travaux planifiés et les urgences. Le dimanche est réservé aux urgences uniquement. Pour planifier une intervention le samedi, contactez-nous en semaine afin de réserver votre créneau.',
      },
      {
        question: 'Comment prendre rendez-vous ?',
        answer:
          'Trois façons : (1) le formulaire de devis en ligne sur ce site — réponse sous 24h, (2) par téléphone au [TELEPHONE] — disponible du lundi au vendredi 7h30-19h, samedi 8h-17h, (3) par email à [EMAIL_PATRON]. Pour les urgences, le téléphone est toujours le moyen le plus rapide.',
      },
      {
        question: 'Puis-je avoir un créneau horaire précis pour mon intervention ?',
        answer:
          "Oui. Pour les interventions planifiées, nous fixons un créneau de 2 heures avec vous (ex : 9h-11h ou 14h-16h). Nous vous prévenons par SMS environ 30 minutes avant notre arrivée. Pour les urgences, le délai est naturellement moins prévisible.",
      },
    ],
  },
  {
    id: 'devis-tarifs',
    label: 'Devis & Tarifs',
    emoji: '💰',
    description: 'Informations sur nos tarifs, devis gratuits et modalités de paiement',
    questions: [
      {
        question: 'Le devis est-il vraiment gratuit et sans engagement ?',
        answer:
          "Oui, totalement. Nous nous déplaçons gratuitement pour établir un devis, sans aucune obligation de votre part. Le devis est détaillé : il indique séparément la main-d'œuvre, les matériaux et les éventuels frais de déplacement. Aucun frais de déplacement pour les communes dans un rayon de 20 km d'Aix-en-Provence.",
      },
      {
        question: "Quel est le prix d'une intervention de dépannage ?",
        answer:
          "Les tarifs de dépannage varient selon le type d'intervention. À titre indicatif : remplacement d'un joint (50-80 €), réparation fuite sous évier (80-150 €), débouchage canalisation au furet (80-150 €), remplacement flexible de chasse (60-100 €). Chaque intervention fait l'objet d'un devis ou d'un accord verbal avant démarrage. Pas de mauvaise surprise.",
      },
      {
        question: 'Y a-t-il des frais de déplacement ?',
        answer:
          "Pour les communes à moins de 20 km d'Aix-en-Provence, le déplacement est inclus dans le tarif de la prestation. Au-delà, des frais kilométriques peuvent s'appliquer (0,50 €/km) — systématiquement indiqués dans le devis. Pour une urgence nocturne, une majoration de déplacement peut s'ajouter.",
      },
      {
        question: 'Quels sont vos modes de paiement ?',
        answer:
          'Nous acceptons le règlement par virement bancaire, chèque et espèces. Nous ne prenons pas encore le paiement par carte bancaire directement sur chantier. Pour les gros chantiers (rénovation salle de bain, installation chaudière), un acompte de 30% est demandé à la commande, le solde à la réception des travaux.',
      },
      {
        question: 'Proposez-vous un paiement en plusieurs fois ?',
        answer:
          "Pour les travaux importants (au-delà de 3 000 €), nous pouvons étudier un échelonnement du paiement. Nous vous orientons également vers des solutions de financement : éco-PTZ (prêt à taux zéro pour les travaux d'économie d'énergie) et prêts travaux bancaires pour lesquels nous fournissons tous les justificatifs nécessaires.",
      },
      {
        question: 'Puis-je obtenir une estimation de prix sans visite ?',
        answer:
          "Pour une première idée, décrivez votre besoin via notre formulaire de demande de devis gratuit en ligne — nous vous recontactons sous 24 h avec une proposition personnalisée, sans tarif automatique affiché. Pour les chantiers complexes (rénovation complète, grosse installation), une visite est indispensable pour un devis précis.",
      },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications & Garanties',
    emoji: '🏆',
    description: 'Nos qualifications, certifications RGE et couvertures d\'assurance',
    questions: [
      {
        question: 'Quelles sont vos certifications professionnelles ?',
        answer:
          "EFFECTIVE'PLOMBERIE détient les certifications suivantes : Qualibat RGE (Reconnu Garant de l'Environnement) — permet à nos clients de bénéficier de MaPrimeRénov' et des CEE, PG Gaz (Professionnel du Gaz) — habilitation obligatoire pour tout travail sur les installations gaz, QualiPAC — qualification pour l'installation de pompes à chaleur. Toutes nos attestations sont disponibles sur demande et vérifiables sur qualibat.com et qualit-enr.org.",
      },
      {
        question: "Êtes-vous assurés ? Qu'est-ce que couvre la garantie décennale ?",
        answer:
          "Oui, EFFECTIVE'PLOMBERIE dispose d'une assurance responsabilité civile professionnelle et d'une garantie décennale. La garantie décennale couvre pendant 10 ans les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination (défaut d'étanchéité, effondrement, vice caché). Elle s'applique à tous nos travaux de plomberie, chauffage et sanitaires. Nous pouvons vous fournir l'attestation sur simple demande.",
      },
      {
        question: 'Pourquoi est-il important de choisir un artisan certifié PG Gaz ?',
        answer:
          "La certification PG Gaz (anciennement Qualigaz) est obligatoire pour tout travail sur une installation gaz en France. Un artisan non certifié ne peut légalement pas intervenir sur vos tuyaux gaz. En cas d'accident (fuite, incendie, explosion) dû à une intervention non certifiée, votre assurance habitation peut refuser la prise en charge. EFFECTIVE'PLOMBERIE est certifié PG Gaz — demandez toujours à vérifier cette certification avant tout travail gaz.",
      },
      {
        question: "Que couvre la certification RGE pour mes aides de l'État ?",
        answer:
          "La certification RGE (Reconnu Garant de l'Environnement) est la condition sine qua non pour bénéficier de MaPrimeRénov', des Certificats d'Économies d'Énergie (CEE) et de l'éco-PTZ. Concrètement, si vous installez une pompe à chaleur, un chauffe-eau thermodynamique ou un chauffe-eau solaire avec EFFECTIVE'PLOMBERIE, vous pouvez prétendre à ces aides. Sans artisan RGE, aucune aide n'est possible.",
      },
      {
        question: 'Quelle est la durée de votre garantie sur les travaux réalisés ?',
        answer:
          "Outre la garantie décennale (10 ans sur les gros œuvres), nous offrons une garantie de parfait achèvement d'un an sur tous nos travaux. Cela signifie que si un défaut lié à notre intervention apparaît dans l'année suivant le chantier, nous intervenons gratuitement pour le corriger. Pour les équipements installés (chaudières, chauffe-eaux), la garantie fabricant s'applique en plus (2 à 5 ans selon les marques).",
      },
    ],
  },
  {
    id: 'salle-de-bain',
    label: 'Salle de bain & Sanitaires',
    emoji: '🚿',
    description: 'Rénovation, création, équipements — tout sur vos travaux de salle de bain',
    questions: [
      {
        question: 'Combien coûte une rénovation complète de salle de bain à Aix-en-Provence ?',
        answer:
          "Pour une salle de bain de 5 m², les fourchettes de prix 2025 sont les suivantes : rafraîchissement simple (peinture + faïence) : 3 000 à 6 000 €, rénovation complète sans déplacement de plomberie : 6 000 à 12 000 €, rénovation avec déplacement des équipements : 10 000 à 18 000 €, création d'une nouvelle salle de bain : 12 000 à 25 000 €. Ces tarifs incluent la main-d'œuvre, les matériaux standards et l'évacuation des gravats. Ils varient selon le choix des équipements (entrée de gamme vs haut de gamme).",
      },
      {
        question: 'Combien de temps dure une rénovation de salle de bain ?',
        answer:
          'Pour une rénovation complète d\'une salle de bain de 5 m², comptez 5 à 8 jours ouvrés. Un rafraîchissement simple (carrelage + équipements, sans modification de plomberie) peut se faire en 2 à 3 jours. Nous vous remettons un planning détaillé avec le devis, avec les dates de début et de fin prévisionnelles.',
      },
      {
        question: 'Fournissez-vous les équipements ou dois-je les acheter moi-même ?',
        answer:
          "Les deux options sont possibles. Nous pouvons fournir l'ensemble des équipements (robinetterie, receveur, paroi de douche, sanitaires, meuble vasque) avec une sélection de produits de qualité chez nos fournisseurs partenaires (Grohe, Geberit, Villeroy & Boch, Ideal Standard). Vous pouvez aussi acheter vos équipements vous-même — nous les posons. Dans ce cas, attention à vérifier les dimensions et la compatibilité avant achat.",
      },
      {
        question: "Faites-vous aussi la pose de carrelage lors d'une rénovation de salle de bain ?",
        answer:
          "Oui, nous réalisons la pose de carrelage sol et faïence murale dans le cadre de nos chantiers de rénovation de salle de bain. La prestation est complète : démolition de l'existant, préparation des supports, pose du nouveau carrelage, joints et finitions. Nous travaillons avec tous les formats de carrelage jusqu'au grand format (60x120 cm).",
      },
      {
        question: "Installez-vous des douches à l'italienne (douche de plain-pied) ?",
        answer:
          "Oui, c'est l'une de nos réalisations les plus fréquentes. La douche à l'italienne nécessite une attention particulière à l'évacuation au sol et à l'étanchéité (bac à douche ou receveur extra-plat). Avant tout chantier, nous vérifions la faisabilité technique : niveau du plancher, hauteur disponible sous dalle, position de l'évacuation existante. Coût de pose d'une douche à l'italienne : 800 à 2 500 € selon la complexité, hors carrelage.",
      },
      {
        question: 'Réalisez-vous des salles de bain PMR (accessibles aux personnes à mobilité réduite) ?',
        answer:
          "Oui, c'est une spécialité dans laquelle nous intervenons de plus en plus. Une salle de bain PMR comprend : douche de plain-pied avec sol antidérapant R11, barres d'appui normées (diamètre 32-45 mm, charge 100 kg), siège de douche rabattable, mitigeur thermostatique, espace de rotation de 150 cm de diamètre. Ces travaux ouvrent droit à des aides spécifiques : MaPrimeRénov' Sénior, aide ANAH Habiter Facile, aide de la CNAV.",
      },
    ],
  },
  {
    id: 'chaudiere-chauffage',
    label: 'Chaudière & Chauffage',
    emoji: '🔥',
    description: 'Installation, remplacement et entretien de vos systèmes de chauffage',
    questions: [
      {
        question: "Quelle est la durée de vie d'une chaudière gaz ?",
        answer:
          "Une chaudière gaz classique a une durée de vie de 15 à 20 ans avec un entretien annuel régulier. Une chaudière à condensation bien entretenue peut durer 20 à 25 ans. Au-delà de 15 ans, même si elle fonctionne encore, le remplacement devient souvent plus économique que la réparation : les pièces détachées coûtent cher, la consommation augmente avec l'âge et les nouveaux modèles sont 30 à 40% plus économes. Nous vous donnons un avis honnête : réparer ou remplacer.",
      },
      {
        question: 'Quelle différence entre une chaudière classique et une chaudière à condensation ?',
        answer:
          "Une chaudière classique a un rendement de 85 à 90% — elle perd 10 à 15% d'énergie dans les fumées. Une chaudière à condensation récupère les calories des fumées d'échappement et atteint un rendement de 105 à 110%. En pratique, elle consomme 15 à 20% de gaz en moins pour le même confort. Elle est aujourd'hui obligatoire pour tout remplacement de chaudière gaz en France, et ouvre droit à MaPrimeRénov'.",
      },
      {
        question: "L'entretien annuel de chaudière est-il obligatoire ?",
        answer:
          "Oui. L'entretien annuel des chaudières gaz est obligatoire par la loi (décret du 9 juin 2009) pour toute chaudière dont la puissance est comprise entre 4 et 400 kW — ce qui couvre la quasi-totalité des chaudières résidentielles. L'attestation d'entretien est à conserver et peut être demandée par votre assureur. Un défaut d'entretien peut invalider votre assurance habitation en cas de sinistre lié à la chaudière.",
      },
      {
        question: "Quels sont les avantages d'une pompe à chaleur par rapport à une chaudière gaz ?",
        answer:
          "La pompe à chaleur air/eau présente plusieurs avantages majeurs : économies d'énergie (coefficient de performance de 3 à 4 : 1 kWh électrique produit 3 à 4 kWh de chaleur), pas de combustion (zéro risque gaz, zéro émission CO2 directe), éligible à MaPrimeRénov' jusqu'à 4 000 €, et peut aussi rafraîchir en été (modèles réversibles). Inconvénient : investissement initial plus élevé (6 000 à 13 000 € installée) et moins efficace par grand froid sous -5°C — rare en Provence.",
      },
      {
        question: "Puis-je bénéficier d'aides pour remplacer ma vieille chaudière ?",
        answer:
          "Oui, plusieurs aides sont cumulables en 2025 : MaPrimeRénov' (1 000 à 4 000 € selon revenus et type d'équipement), prime CEE versée par les fournisseurs d'énergie (300 à 700 €), TVA à 5,5% sur les équipements éligibles (au lieu de 20%), éco-PTZ jusqu'à 30 000 € sans intérêts. EFFECTIVE'PLOMBERIE étant certifié RGE, vos travaux sont éligibles à toutes ces aides. Nous vous aidons à constituer votre dossier.",
      },
    ],
  },
  {
    id: 'eau-chaude-calcaire',
    label: 'Eau chaude & Calcaire',
    emoji: '💧',
    description: "Ballons d'eau chaude, chauffe-eaux solaires et problèmes de calcaire",
    questions: [
      {
        question: 'Quel type de chauffe-eau choisir à Aix-en-Provence ou Marseille ?',
        answer:
          "Avec plus de 300 jours de soleil par an dans les Bouches-du-Rhône, deux solutions se démarquent. Le chauffe-eau thermodynamique (COP 3 à 4, économies de 60 à 70% vs électrique, aide MaPrimeRénov' jusqu'à 1 200 €) est idéal si vous manquez de surface de toiture. Le chauffe-eau solaire individuel (CESI) est la solution la plus rentable sur 20 ans en Provence (60 à 70% de l'eau chaude couverte gratuitement), parfait pour les maisons avec toiture orientée sud. Nous réalisons l'étude d'orientation gratuitement.",
      },
      {
        question: 'Mon eau est très calcaire à Aix — que peut-on faire ?',
        answer:
          "L'eau d'Aix-en-Provence affiche une dureté de 25 à 30°f (très calcaire). Sans traitement, le calcaire détériore les chauffe-eaux, chaudières, robinetterie et appareils électroménagers en 5 à 8 ans. Solutions selon votre situation : adoucisseur d'eau échangeur d'ions (solution complète, 800 à 1 500 € installé), filtre à polyphosphates sous évier (50 à 150 €, protection ciblée lave-vaisselle), filtre à osmose inverse (300 à 700 €, eau pure au robinet), cartouche anti-calcaire magnétique (solution légère, 100 à 200 €). Nous vous conseillons selon votre installation et budget.",
      },
      {
        question: "Combien de temps dure l'installation d'un chauffe-eau thermodynamique ?",
        answer:
          "L'installation d'un chauffe-eau thermodynamique prend une journée complète. La première partie de la matinée est consacrée à la dépose de l'ancien appareil, le reste de la journée à la mise en place et au raccordement du nouveau. Nous veillons à ce que vous ayez de l'eau chaude le soir même.",
      },
      {
        question: 'Quelle capacité de ballon eau chaude choisir pour ma famille ?',
        answer:
          'La règle générale : 50 litres par personne pour un cumulus électrique (100L pour 2 personnes, 150L pour 3, 200L pour 4+). Pour un chauffe-eau thermodynamique, les capacités standards sont 200L ou 270L — un 200L suffit pour une famille de 4 personnes car le thermodynamique chauffe plus rapidement. Pour un chauffe-eau solaire, le dimensionnement dépend aussi de la surface de capteurs solaires.',
      },
      {
        question: 'Mon ballon eau chaude fuit — est-ce réparable ?',
        answer:
          "Cela dépend de l'origine et de la localisation de la fuite. Une fuite sur le groupe de sécurité (soupape qui goutte) est normale lors du chauffage et se règle souvent par un remplacement du groupe (50 à 100 €). Une fuite sur la résistance peut être réparée. En revanche, une fuite sur la cuve elle-même (rouille, corrosion) signifie que le ballon est en fin de vie et doit être remplacé — la réparation n'est pas possible et serait de toute façon risquée. Nous diagnostiquons gratuitement lors de notre intervention.",
      },
    ],
  },
];

export const FAQ_DATA: FAQCategory[] = RAW_FAQ.map((cat) => ({
  ...cat,
  questions: cat.questions.map((q) => ({
    question: faqText(q.question),
    answer: faqText(q.answer),
  })),
}));

export const ALL_FAQ_QUESTIONS = FAQ_DATA.flatMap((cat) => cat.questions);

export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQ_QUESTIONS.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
