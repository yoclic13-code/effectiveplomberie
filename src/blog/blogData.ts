import { BRAND } from '../brand';
import { SITE_IMAGES } from '../constants/images';

export interface BlogSection {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'tip' | 'warning' | 'table';
  content: string | string[] | { headers: string[]; rows: string[][] };
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  author: string;
  authorRole: string;
  excerpt: string;
  coverAlt: string;
  coverSrc: string;
  zones: string[];
  content: BlogSection[];
  faq: BlogFAQ[];
  ctaText: string;
  ctaLink: '/devis' | '/contact';
}

type RawBlogPost = BlogPost;

const RAW_BLOG_POSTS: RawBlogPost[] = [

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Salle de bain Aix (fort volume)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'renovation-salle-de-bain-aix-en-provence',
    title: 'Rénovation salle de bain à Aix-en-Provence : guide complet 2025',
    metaTitle: 'Rénovation Salle de Bain Aix-en-Provence 2025 | Prix, Étapes, Artisan RGE',
    metaDescription: 'Tout savoir sur la rénovation de salle de bain à Aix-en-Provence (13100) : budget, étapes, douche italienne, carrelage, plomberie. Devis gratuit chez EFFECTIVE\'PLOMBERIE.',
    keywords: ['rénovation salle de bain aix en provence', 'salle de bain 13100', 'douche italienne aix', 'plombier salle de bain aix', 'coût salle de bain 13'],
    category: 'salle-de-bain',
    tags: ['rénovation', 'salle de bain', 'Aix-en-Provence', 'douche italienne', 'baignoire'],
    date: '2025-03-10',
    readTime: 7,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Vous envisagez de rénover votre salle de bain à Aix-en-Provence ? Budget, étapes, choix des équipements, aides disponibles — voici tout ce que vous devez savoir avant de commencer.',
    coverSrc: SITE_IMAGES.creationSalleDeBain,
    coverAlt: 'Rénovation salle de bain moderne à Aix-en-Provence par EFFECTIVE\'PLOMBERIE',
    zones: ['Aix-en-Provence', '13100', '13080', '13090', 'Éguilles', 'Venelles', 'Meyreuil'],
    content: [
      { type: 'p', content: 'Rénover sa salle de bain à Aix-en-Provence est l\'un des projets les plus fréquents que nous réalisons depuis 2019. Que vous habitiez le centre-ville historique, la Duranne ou les quartiers périphériques comme Jas de Bouffan ou Puyricard, les contraintes techniques varient — et le budget aussi. Ce guide vous donne toutes les clés pour anticiper votre projet sereinement.' },
      { type: 'h2', content: 'Quel budget prévoir pour une rénovation de salle de bain à Aix ?' },
      { type: 'table', content: { headers: ['Type de rénovation', 'Surface', 'Fourchette de prix'], rows: [['Rafraîchissement (peinture + faïence)', '4–6 m²', '3 000 – 6 000 €'], ['Rénovation complète sans déplacement', '4–6 m²', '6 000 – 12 000 €'], ['Rénovation complète avec déplacement', '4–6 m²', '10 000 – 18 000 €'], ['Création salle de bain (nouveau local)', 'dès 4 m²', '12 000 – 25 000 €']] } },
      { type: 'tip', content: 'Ces fourchettes incluent la main-d\'œuvre, les matériaux standards et l\'évacuation des gravats. Elles varient selon le choix des équipements (robinetterie entrée de gamme vs haut de gamme) et l\'état du logement existant.' },
      { type: 'h2', content: 'Les étapes d\'une rénovation de salle de bain' },
      { type: 'ol', content: ['Diagnostic et relevé de cotes (2–3 h)', 'Établissement du devis gratuit et du plan 2D', 'Dépose des équipements existants (1 jour)', 'Travaux de plomberie brutes (évacuations, arrivées d\'eau)', 'Pose du carrelage et faïence (2–4 jours)', 'Pose des équipements (douche, baignoire, WC, lavabo, meuble vasque)', 'Raccordement robinetterie, siphons, accessoires', 'Mise en eau, test d\'étanchéité et finitions'] },
      { type: 'h2', content: 'Douche italienne ou baignoire : que choisir à Aix-en-Provence ?' },
      { type: 'p', content: 'La douche à l\'italienne s\'est imposée comme le choix majoritaire dans nos chantiers aixois. Elle offre un gain de place précieux dans les appartements haussmanniens du centre-ville et les maisons de village autour d\'Aix. La baignoire reste pertinente pour les familles avec jeunes enfants ou les grandes salles de bain de 8 m² et plus.' },
      { type: 'h3', content: 'La douche à l\'italienne : points de vigilance' },
      { type: 'ul', content: ['L\'évacuation au sol nécessite un bon niveau de plancher — vérification obligatoire', 'Receveur extra-plat ou carrelage anti-dérapant : deux options valables', 'Indispensable : une paroi ou un rideau pour éviter les projections', 'Coût de pose : 800 à 2 500 € selon complexité'] },
      { type: 'h2', content: 'Plomberie et normes à respecter en 2025' },
      { type: 'p', content: 'À Aix-en-Provence comme partout en France, les travaux de plomberie en salle de bain doivent respecter la norme NF DTU 60.1 pour les travaux de plomberie sanitaire. L\'eau à Aix étant relativement calcaire (TH moyen de 25°f), nous recommandons systématiquement l\'installation d\'un adoucisseur ou d\'un filtre anti-calcaire sur l\'arrivée d\'eau de la douche.' },
      { type: 'warning', content: 'Si votre logement date d\'avant 1975, une vérification de l\'état des canalisations existantes (plomb, zinc) est indispensable avant toute rénovation. Le remplacement est obligatoire pour les canalisations en plomb.' },
      { type: 'h2', content: 'Aides et financement disponibles en 2025' },
      { type: 'ul', content: ['MaPrimeRénov\' : applicable si vous intégrez une douche ou baignoire PMR (salle de bain adaptée)', 'TVA à 10% sur la main-d\'œuvre pour les logements de plus de 2 ans (au lieu de 20%)', 'Aide ANAH "Habiter Mieux" pour les ménages modestes', 'Prêt travaux à taux zéro sous conditions de ressources'] },
      { type: 'h2', content: 'Pourquoi choisir un plombier local à Aix-en-Provence ?' },
      { type: 'p', content: 'Chez EFFECTIVE\'PLOMBERIE, nous intervenons exclusivement dans le département 13 depuis 2019. Cela signifie que nous connaissons les spécificités locales : pression d\'eau variable selon les quartiers d\'Aix, réseaux d\'évacuation anciens dans le centre historique, contraintes des copropriétés de la Duranne ou de Val-Saint-André. Nous vous fournissons un devis détaillé, gratuit, sous 48h.' },
    ],
    faq: [
      { question: 'Combien de temps dure une rénovation de salle de bain à Aix-en-Provence ?', answer: 'Pour une rénovation complète d\'une salle de bain de 5 m², comptez en moyenne 5 à 8 jours ouvrés. Un rafraîchissement (carrelage + équipements sans plomberie) peut se faire en 2 à 3 jours.' },
      { question: 'Faut-il un permis de construire pour rénover sa salle de bain ?', answer: 'Non, dans la grande majorité des cas. Une déclaration de travaux n\'est requise que si vous modifiez la façade ou l\'emprise au sol du bâtiment. Pour une rénovation intérieure de salle de bain, aucune autorisation administrative n\'est nécessaire.' },
      { question: 'Peut-on rénover une salle de bain en 2 phases pour étaler le budget ?', answer: 'Oui, c\'est tout à fait possible. Nous pouvons réaliser d\'abord les travaux de plomberie brute (évacuations, arrivées), puis les finitions (carrelage, équipements) dans un second temps. Nous prévoyons dans ce cas les fourreaux et attentes nécessaires.' },
    ],
    ctaText: 'Obtenir un devis salle de bain gratuit',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Ballon eau chaude
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'ballon-eau-chaude-aix-en-provence-guide',
    title: 'Ballon d\'eau chaude à Aix-en-Provence : cumulus, thermodynamique ou solaire ?',
    metaTitle: 'Ballon Eau Chaude Aix-en-Provence | Cumulus, Thermodynamique, Solaire — Prix 2025',
    metaDescription: 'Quel ballon d\'eau chaude choisir à Aix-en-Provence ? Comparatif cumulus électrique, chauffe-eau thermodynamique et solaire. Prix, aides MaPrimeRénov\', installation par plombier RGE.',
    keywords: ['ballon eau chaude aix en provence', 'chauffe-eau thermodynamique 13100', 'installation cumulus aix', 'chauffe-eau solaire 13', 'remplacement ballon eau chaude'],
    category: 'eau-chaude',
    tags: ['ballon eau chaude', 'thermodynamique', 'solaire', 'cumulus', 'Aix-en-Provence'],
    date: '2025-02-20',
    readTime: 8,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Votre ballon d\'eau chaude est en fin de vie à Aix ? Avant de le remplacer, comparez les trois solutions disponibles : cumulus classique, thermodynamique et solaire. Les conditions climatiques du 13 rendent deux d\'entre elles particulièrement rentables.',
    coverSrc: SITE_IMAGES.installationChaudiere,
    coverAlt: 'Installation ballon eau chaude thermodynamique Aix-en-Provence',
    zones: ['Aix-en-Provence', 'Marseille', 'Bouches-du-Rhône', '13'],
    content: [
      { type: 'p', content: 'Avec plus de 300 jours de soleil par an dans les Bouches-du-Rhône, le choix d\'un chauffe-eau n\'est pas anodin. À Aix-en-Provence, deux technologies se démarquent nettement des autres : le thermodynamique et le solaire. Voici un comparatif complet pour vous aider à décider.' },
      { type: 'h2', content: 'Comparatif des 3 types de chauffe-eau en 2025' },
      { type: 'table', content: { headers: ['Type', 'Prix installation', 'Coût annuel (4 pers.)', 'Durée de vie', 'Aide dispo'], rows: [['Cumulus électrique', '400 – 900 €', '450 – 700 €', '10–15 ans', 'Non'], ['Thermodynamique', '2 500 – 4 500 €', '150 – 250 €', '15–20 ans', 'MaPrimeRénov\''], ['Solaire individuel', '3 000 – 6 000 €', '60 – 120 €', '20–25 ans', 'MaPrimeRénov\' + CEE']] } },
      { type: 'h2', content: 'Le chauffe-eau thermodynamique : le choix intelligent à Aix' },
      { type: 'p', content: 'Le chauffe-eau thermodynamique fonctionne comme une pompe à chaleur : il puise les calories de l\'air ambiant pour chauffer l\'eau. À Aix-en-Provence, où la température moyenne dépasse 15°C la majeure partie de l\'année, ce système atteint un coefficient de performance (COP) de 3 à 4 — soit 1 kWh électrique qui en produit 3 à 4 thermiques.' },
      { type: 'ul', content: ['Installation possible en espace technique, garage, buanderie', 'Pas besoin de toiture ni d\'orientation particulière', 'MaPrimeRénov\' jusqu\'à 1 200 € selon revenus', 'Amortissement en 5 à 8 ans selon consommation'] },
      { type: 'h2', content: 'Le chauffe-eau solaire individuel (CESI) : rentable grâce au soleil provençal' },
      { type: 'p', content: 'Aix-en-Provence bénéficie d\'un ensoleillement annuel de 2 800 heures — parmi les plus élevés de France. Un CESI correctement dimensionné peut couvrir 60 à 70% de vos besoins en eau chaude sans énergie fossile.' },
      { type: 'tip', content: 'En maison individuelle avec toiture orientée sud (pente 30–45°), le CESI est souvent la solution la plus rentable sur 20 ans à Aix. Nous réalisons une étude d\'orientation gratuite avant tout devis.' },
      { type: 'h2', content: 'Quand remplacer son ballon d\'eau chaude ?' },
      { type: 'ul', content: ['L\'eau chaude met plus de temps à arriver', 'L\'eau est tiède malgré un thermostat au maximum', 'Présence de fuite ou de rouille sur la cuve', 'Le ballon a plus de 10 ans (cumulus) ou 15 ans (thermodynamique)', 'La résistance a déjà été changée 2 fois'] },
      { type: 'warning', content: 'Un ballon qui fuit ou montre des signes de corrosion avancée ne se répare pas. Tout remplacement doit être envisagé sans délai pour éviter un dégât des eaux.' },
    ],
    faq: [
      { question: 'Quelle capacité de ballon choisir pour ma famille à Aix ?', answer: 'Comptez environ 50 litres par personne : 100L pour 2 personnes, 150L pour 3, 200L pour 4. Pour un thermodynamique, les capacités sont souvent de 200 ou 270L pour couvrir un foyer de 4 personnes.' },
      { question: 'Combien de temps dure l\'installation d\'un ballon eau chaude ?', answer: 'Le remplacement d\'un cumulus par un autre cumulus prend en général une demi-journée. L\'installation d\'un thermodynamique ou d\'un solaire demande une journée complète, parfois deux pour le solaire selon la configuration de toiture.' },
    ],
    ctaText: 'Demander un devis chauffe-eau gratuit',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 4 — Fuite eau urgence
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'fuite-eau-que-faire-aix-marseille',
    title: 'Fuite d\'eau : que faire en urgence à Aix-en-Provence et Marseille ?',
    metaTitle: 'Fuite d\'Eau Urgence Aix-en-Provence & Marseille | Réflexes + Plombier 24h',
    metaDescription: 'Fuite d\'eau chez vous à Aix ou Marseille ? Suivez nos 5 réflexes d\'urgence, puis appelez EFFECTIVE\'PLOMBERIE — intervention sous 2h dans tout le 13. Certifié, assuré.',
    keywords: ['fuite eau aix en provence urgence', 'plombier urgence marseille', 'dégât des eaux 13', 'fuite canalisation aix', 'dépannage plomberie marseille nuit'],
    category: 'depannage',
    tags: ['fuite eau', 'urgence', 'dépannage', 'Aix-en-Provence', 'Marseille'],
    date: '2025-04-05',
    readTime: 5,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Une fuite d\'eau peut causer des milliers d\'euros de dégâts en quelques heures. Voici les 5 gestes à faire dans les premières minutes, et comment nous joindre pour une intervention rapide.',
    coverSrc: SITE_IMAGES.depannageUrgent,
    coverAlt: 'Intervention urgence fuite d\'eau Aix-en-Provence',
    zones: ['Aix-en-Provence', 'Marseille', 'Aubagne', 'Vitrolles', 'département 13'],
    content: [
      { type: 'h2', content: '5 réflexes immédiats en cas de fuite d\'eau' },
      { type: 'ol', content: ['Couper l\'arrivée d\'eau générale (vanne sous l\'évier ou au compteur)', 'Couper le disjoncteur si l\'eau est proche d\'une installation électrique', 'Récupérer l\'eau avec des serviettes et des seaux pour limiter les dégâts', 'Prendre des photos de tous les dégâts pour votre déclaration assurance', 'Appeler votre plombier d\'urgence — puis votre assurance habitaiton'] },
      { type: 'warning', content: 'Ne rallumez jamais le courant électrique si de l\'eau a pu atteindre les installations. Attendez l\'intervention d\'un professionnel.' },
      { type: 'h2', content: 'Où se trouve le robinet d\'arrêt général ?' },
      { type: 'p', content: 'Dans la plupart des logements d\'Aix-en-Provence et Marseille, le robinet d\'arrêt général se trouve sous l\'évier de la cuisine ou dans un placard technique. En copropriété, le coupe-eau de l\'immeuble est généralement en cave ou dans un regard extérieur. Repérez-le avant qu\'une urgence survienne.' },
      { type: 'h2', content: 'Types de fuites les plus courantes dans le 13' },
      { type: 'ul', content: ['Joint de robinet défaillant (la plus courante, souvent réparable rapidement)', 'Fuite sous évier ou siphon (joint usé, raccord desserré)', 'Fuite sur tuyauterie encastrée (nécessite détection non destructive)', 'Rupture de flexible de chasse ou de douche', 'Fuite sur chauffe-eau ou cumulus (clapet de sécurité, résistance)'] },
      { type: 'tip', content: 'Un robinet qui goutte peut gaspiller jusqu\'à 100 litres d\'eau par jour — soit 3 m³ par mois, soit 6 à 9 € de plus sur votre facture. À Aix-en-Provence, l\'eau est facturée environ 3€/m³.' },
    ],
    faq: [
      { question: 'Intervenez-vous la nuit pour une fuite à Marseille ou Aix ?', answer: 'Oui, EFFECTIVE\'PLOMBERIE intervient en urgence 7j/7, y compris le soir et le week-end, sur Marseille, Aix-en-Provence et tout le département 13. Appelez le [TELEPHONE].' },
      { question: 'Ma fuite vient de chez le voisin du dessus : que faire ?', answer: 'Prenez des photos immédiates, prévenez votre voisin et votre syndic si vous êtes en copropriété. Déclarez le sinistre à votre assurance dans les 5 jours ouvrés. Notre intervention peut établir un constat de fuite utile pour votre dossier.' },
    ],
    ctaText: 'Appeler pour une urgence plomberie',
    ctaLink: '/contact',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 5 — Plomberie cuisine
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'plomberie-cuisine-aix-en-provence',
    title: 'Plomberie cuisine à Aix-en-Provence : raccordements, évier et lave-vaisselle',
    metaTitle: 'Plomberie Cuisine Aix-en-Provence | Évier, Lave-Vaisselle, Robinet — Devis Gratuit',
    metaDescription: 'Installation et raccordement plomberie cuisine à Aix-en-Provence : évier, lave-vaisselle, robinet mitigeur, filtre eau. Artisan qualifié intervenant dans tout le 13.',
    keywords: ['plomberie cuisine aix en provence', 'installation évier aix', 'raccordement lave-vaisselle 13100', 'robinet cuisine marseille', 'filtre eau cuisine aix'],
    category: 'cuisine',
    tags: ['cuisine', 'évier', 'lave-vaisselle', 'raccordement', 'Aix-en-Provence'],
    date: '2025-02-01',
    readTime: 5,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Rénovation de cuisine, changement d\'évier, installation d\'un lave-vaisselle encastrable ou d\'un robinet mitigeur à Aix-en-Provence — voici ce que notre équipe réalise au quotidien.',
    coverSrc: SITE_IMAGES.cuisine,
    coverAlt: 'Installation plomberie cuisine moderne Aix-en-Provence',
    zones: ['Aix-en-Provence', '13100', 'Éguilles', 'Venelles', 'Meyreuil', 'Pertuis'],
    content: [
      { type: 'p', content: 'La plomberie de cuisine est souvent sous-estimée lors d\'une rénovation. Pourtant, un mauvais raccordement d\'évier ou un siphon mal posé peut provoquer des fuites pendant des mois avant qu\'elles soient détectées. Voici ce que nous vérifions systématiquement lors de nos interventions.' },
      { type: 'h2', content: 'Installation d\'un évier : les étapes clés' },
      { type: 'ol', content: ['Vérification de la compatibilité du meuble et du plan de travail', 'Découpe aux dimensions de l\'évier (si meuble neuf)', 'Pose du siphon et du trop-plein', 'Raccordement eau froide et eau chaude (flexibles ou cuivre)', 'Raccordement évacuation (PVC DN 40 ou 50)', 'Test d\'étanchéité et vérification débit d\'évacuation'] },
      { type: 'h2', content: 'Raccordement lave-vaisselle' },
      { type: 'p', content: 'L\'installation d\'un lave-vaisselle nécessite trois raccordements : arrivée d\'eau froide, évacuation d\'eau usée et alimentation électrique (branchement sur prise 16A avec terre). Nous réalisons la partie plomberie et préparons le raccordement pour l\'électricien si nécessaire.' },
      { type: 'tip', content: 'À Aix-en-Provence, l\'eau est particulièrement calcaire (dureté de 25 à 30°f). L\'installation d\'un adoucisseur ou d\'un filtre anti-calcaire en amont du lave-vaisselle double sa durée de vie. Nous proposons cette option systématiquement.' },
      { type: 'h2', content: 'Filtre eau à osmose inverse : la tendance à Aix' },
      { type: 'p', content: 'De plus en plus de nos clients à Aix-en-Provence nous demandent l\'installation d\'un système de filtration par osmose inverse sous l\'évier. Ce système élimine 95% des impuretés, du calcaire et du chlore. Résultat : une eau de qualité égale à celle en bouteille, au robinet. Coût d\'installation : 300 à 700 €.' },
    ],
    faq: [
      { question: 'Combien coûte l\'installation d\'un évier à Aix-en-Provence ?', answer: 'La pose d\'un évier avec ses raccordements (hors fourniture) coûte entre 150 et 350 € selon la complexité. Si l\'évier est fourni par nos soins, comptez 250 à 800 € tout compris selon le modèle choisi.' },
    ],
    ctaText: 'Demander un devis cuisine',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 6 — MaPrimeRénov'
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'maprimerénov-plomberie-chauffage-bouches-du-rhone',
    title: 'MaPrimeRénov\' 2025 dans les Bouches-du-Rhône : ce qui change pour la plomberie et le chauffage',
    metaTitle: 'MaPrimeRénov\' 2025 Bouches-du-Rhône | Aide Chaudière & Chauffage — Plombier RGE',
    metaDescription: 'MaPrimeRénov\' 2025 dans le 13 : montants, conditions, travaux éligibles (chaudière, PAC, ballon thermodynamique). Faites appel à un artisan RGE à Aix-en-Provence. Devis gratuit.',
    keywords: ['maprimerénov 2025 bouches du rhône', 'aide chaudière aix en provence', 'artisan rge aix', 'prime rénovation énergétique 13', 'cee chauffage marseille'],
    category: 'aides-financement',
    tags: ['MaPrimeRénov', 'aides', 'RGE', 'financement', 'Bouches-du-Rhône'],
    date: '2025-01-05',
    readTime: 6,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'En 2025, MaPrimeRénov\' évolue encore. Voici ce qui s\'applique concrètement à vos projets de plomberie et chauffage dans les Bouches-du-Rhône, avec les montants réels selon votre situation.',
    coverSrc: SITE_IMAGES.banniere,
    coverAlt: 'Aide MaPrimeRénov pour travaux chauffage Bouches-du-Rhône',
    zones: ['Bouches-du-Rhône', 'Aix-en-Provence', 'Marseille', 'département 13'],
    content: [
      { type: 'p', content: 'MaPrimeRénov\' est le dispositif d\'aide de l\'État pour financer la rénovation énergétique des logements. En 2025, plusieurs modifications impactent directement les propriétaires du 13 qui souhaitent changer leur système de chauffage ou installer un ballon eau chaude thermodynamique.' },
      { type: 'h2', content: 'Travaux éligibles à MaPrimeRénov\' en plomberie et chauffage' },
      { type: 'ul', content: ['Pompe à chaleur air/eau (remplacement chaudière fioul/gaz)', 'Chauffe-eau thermodynamique (remplacement cumulus électrique)', 'Chauffe-eau solaire individuel (CESI)', 'Climatisation réversible', 'Salle de bain PMR (sous conditions d\'adaptation logement)'] },
      { type: 'h2', content: 'Pourquoi faire appel à un artisan RGE ?' },
      { type: 'p', content: 'C\'est une condition obligatoire : seuls les travaux réalisés par un artisan certifié RGE (Reconnu Garant de l\'Environnement) ouvrent droit à MaPrimeRénov\'. EFFECTIVE\'PLOMBERIE est certifié Qualibat RGE et QualiPAC, ce qui couvre l\'ensemble des travaux éligibles en plomberie et chauffage.' },
      { type: 'tip', content: 'Nous vous accompagnons dans la constitution de votre dossier MaPrimeRénov\' et vérifions votre éligibilité avant le devis, gratuitement.' },
    ],
    faq: [
      { question: 'Peut-on cumuler MaPrimeRénov\' et les CEE sur le même chantier ?', answer: 'Oui, ces deux aides sont cumulables. C\'est même recommandé : la prime CEE est versée par les fournisseurs d\'énergie et vient s\'ajouter à MaPrimeRénov\'. Dans le cas d\'une pompe à chaleur, le cumul peut atteindre 5 000 à 8 000 € selon les revenus.' },
    ],
    ctaText: 'Vérifier mon éligibilité MaPrimeRénov\'',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 7 — Plombier Aix 13100 (ancrage géo fort)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'plombier-aix-en-provence-13100',
    title: 'Plombier à Aix-en-Provence (13100) : artisan local depuis 2019',
    metaTitle: 'Plombier Aix-en-Provence 13100 | EFFECTIVE\'PLOMBERIE — Artisan Local & Certifié',
    metaDescription: 'Plombier à Aix-en-Provence (13100) depuis 2019 : Wissem ALAYA et son équipe interviennent pour tous vos travaux de plomberie, chauffage et sanitaires. Devis gratuit sous 24h.',
    keywords: ['plombier aix en provence 13100', 'artisan plombier aix', 'plombier local aix en provence', 'plomberie 13100', 'dépannage plombier aix'],
    category: 'depannage',
    tags: ['Aix-en-Provence', '13100', 'artisan local', 'plombier certifié'],
    date: '2025-03-25',
    readTime: 4,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Entrepreneur individuel basé à Aix-en-Provence depuis 2019, Wissem ALAYA intervient pour tous vos travaux de plomberie et chauffage dans le 13100 et alentours. Voici comment nous travaillons.',
    coverSrc: SITE_IMAGES.banniere,
    coverAlt: 'Wissem ALAYA plombier artisan à Aix-en-Provence',
    zones: ['Aix-en-Provence', '13100', '13080', '13090', 'Éguilles', 'Bouc-Bel-Air', 'Gardanne'],
    content: [
      { type: 'p', content: 'Installé à Aix-en-Provence depuis novembre 2019, EFFECTIVE\'PLOMBERIE est un entrepreneur individuel qui réalise des travaux de plomberie, chauffage et sanitaires dans tout le département 13. Nous ne sommes pas une grande franchise — nous sommes un artisan local qui connaît son territoire.' },
      { type: 'h2', content: 'Notre zone d\'intervention principale autour d\'Aix' },
      { type: 'ul', content: ['Aix-en-Provence centre et tous les quartiers (Mazarin, Jas de Bouffan, Val-Saint-André, Puyricard, La Duranne)', 'Communes proches : Éguilles, Venelles, Meyreuil, Bouc-Bel-Air, Gardanne, Rousset, Fuveau', 'Secteur nord : Cabriès, Vitrolles, Marignane', 'Sud-est : Aubagne, Gémenos, La Destrousse', 'Marseille : tous les arrondissements'] },
      { type: 'h2', content: 'Nos certifications et garanties' },
      { type: 'ul', content: ['Qualibat RGE — travaux de rénovation énergétique éligibles aux aides', 'PG Gaz — habilitation obligatoire pour tous travaux gaz', 'QualiPAC — installation de pompes à chaleur', 'Garantie décennale — couvre nos travaux pendant 10 ans', 'Responsabilité civile professionnelle'] },
      { type: 'tip', content: 'En tant qu\'entrepreneur individuel, vous avez un seul interlocuteur du devis à la réception des travaux. Wissem réalise lui-même la majeure partie des chantiers — votre projet n\'est pas sous-traité.' },
    ],
    faq: [
      { question: 'Quel est le délai pour obtenir un rendez-vous à Aix-en-Provence ?', answer: 'Pour les travaux planifiés, nous intervenons généralement sous 3 à 7 jours. Pour les urgences (fuite, panne chaudière en hiver), nous faisons le maximum pour intervenir le jour même.' },
    ],
    ctaText: 'Obtenir un devis gratuit',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 9 — Salle de bain PMR
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'salle-de-bain-pmr-aix-en-provence',
    title: 'Salle de bain PMR à Aix-en-Provence : aménagement et financement 2025',
    metaTitle: 'Salle de Bain PMR Aix-en-Provence | Adaptation Logement — Aide Anah & MaPrimeRénov\'',
    metaDescription: 'Aménager une salle de bain PMR (accessible handicap / senior) à Aix-en-Provence. Barres d\'appui, douche de plain-pied, siège de douche. Aides ANAH disponibles. Devis gratuit.',
    keywords: ['salle de bain pmr aix en provence', 'adaptation salle de bain senior 13', 'douche plain-pied handicap aix', 'aide anah salle de bain aix', 'sénior accessibilité 13100'],
    category: 'salle-de-bain',
    tags: ['PMR', 'accessibilité', 'senior', 'salle de bain', 'Aix-en-Provence'],
    date: '2025-03-01',
    readTime: 6,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'L\'adaptation d\'une salle de bain pour une personne âgée ou à mobilité réduite est un projet courant dans le 13. Ce guide vous explique les aménagements possibles et les aides financières disponibles à Aix-en-Provence.',
    coverSrc: SITE_IMAGES.creationSalleDeBain,
    coverAlt: 'Salle de bain PMR accessible Aix-en-Provence',
    zones: ['Aix-en-Provence', '13100', 'Marseille', 'Bouches-du-Rhône'],
    content: [
      { type: 'p', content: 'Transformer une salle de bain classique en espace accessible PMR (Personnes à Mobilité Réduite) est l\'un des projets les plus demandés dans notre activité. Avec le vieillissement de la population et les programmes d\'aide au maintien à domicile, de nombreux propriétaires du 13 rénovent leur salle de bain pour sécuriser le quotidien.' },
      { type: 'h2', content: 'Les aménagements essentiels d\'une salle de bain PMR' },
      { type: 'ul', content: ['Douche à l\'italienne de plain-pied (sans ressaut) avec receveur extra-plat', 'Siège de douche rabattable ou banc intégré', 'Barres d\'appui normées (diamètre 32–45 mm, charge 100 kg)', 'Mitigeur thermostatique (prévention des brûlures)', 'Sol antidérapant R11 minimum', 'Espace de rotation libre de 150 cm de diamètre', 'WC surélevé ou rehausseur'] },
      { type: 'h2', content: 'Aides financières disponibles à Aix-en-Provence en 2025' },
      { type: 'table', content: { headers: ['Aide', 'Montant', 'Conditions'], rows: [['MaPrimeRénov\' Sénior', 'Jusqu\'à 70% des travaux', 'Propriétaire occupant, revenus modestes'], ['Aide ANAH "Habiter Facile"', 'Jusqu\'à 50% des travaux', 'Propriétaire ou locataire, sous conditions'], ['Crédit d\'impôt (CITE)', 'Variable', 'Résidence principale'], ['Aide de la CNAV', '400 à 3 500 €', 'Retraité du régime général'], ['Aide du Conseil Départemental 13', 'Variable', 'Selon ressources']] } },
    ],
    faq: [
      { question: 'Faut-il un architecte pour adapter une salle de bain PMR ?', answer: 'Non, dans la grande majorité des cas. Un entrepreneur en bâtiment qualifié comme EFFECTIVE\'PLOMBERIE peut réaliser ces travaux sans architecte. Seuls les travaux modifiant la structure du bâtiment ou excédant 150 m² de surface habitable requièrent un architecte.' },
    ],
    ctaText: 'Demander un devis adaptation salle de bain',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 10 — Débouchage canalisation Marseille
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'debouchage-canalisation-marseille',
    title: 'Débouchage canalisation à Marseille : méthodes, prix et délais d\'intervention',
    metaTitle: 'Débouchage Canalisation Marseille | Intervention Rapide — Prix 2025',
    metaDescription: 'Canalisation bouchée à Marseille ? Débouchage par furet, pompage ou hydrocurage. EFFECTIVE\'PLOMBERIE intervient dans tous les arrondissements. Tarifs 2025. Devis gratuit.',
    keywords: ['débouchage canalisation marseille', 'canalisation bouchée marseille', 'hydrocurage marseille', 'déboucher évier marseille', 'plombier débouchage 13'],
    category: 'depannage',
    tags: ['débouchage', 'canalisation', 'Marseille', 'hydrocurage', 'urgence'],
    date: '2025-02-10',
    readTime: 5,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Évier, douche, WC ou canalisation collective bouchée à Marseille ? Voici les techniques utilisées selon le type de bouchon, les tarifs pratiqués en 2025 et notre délai d\'intervention.',
    coverSrc: SITE_IMAGES.depannageUrgent,
    coverAlt: 'Débouchage canalisation professionnel Marseille',
    zones: ['Marseille', '13001', '13006', '13008', '13010', '13013', 'tous arrondissements'],
    content: [
      { type: 'h2', content: 'Les 4 techniques de débouchage selon le problème' },
      { type: 'table', content: { headers: ['Technique', 'Cas d\'usage', 'Prix indicatif'], rows: [['Ventouse mécanique', 'Bouchon léger évier/WC', '50 – 80 €'], ['Furet électrique', 'Bouchon profond (graisse, cheveux)', '80 – 150 €'], ['Hydrocurage haute pression', 'Canalisation principale obstruée', '150 – 400 €'], ['Inspection caméra', 'Diagnostic bouchon récurrent', '100 – 250 €']] } },
      { type: 'h2', content: 'Comment éviter les canalisations bouchées à Marseille ?' },
      { type: 'ul', content: ['Ne jamais jeter huile de friture, lingettes ou coton-tiges dans les évacuations', 'Poser des filtres à cheveux sur les siphons de douche', 'Faire détartrer régulièrement les siphons (calcaire d\'Aix/Marseille)', 'Hydrocurage préventif tous les 3 à 5 ans en copropriété'] },
    ],
    faq: [
      { question: 'Intervenez-vous en urgence pour un débouchage à Marseille ?', answer: 'Oui, nous intervenons dans tous les arrondissements de Marseille pour les débouchages urgents. Appelez-nous au [TELEPHONE] pour connaître notre disponibilité immédiate.' },
    ],
    ctaText: 'Intervention débouchage rapide',
    ctaLink: '/contact',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 11 — Raccordement gaz
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'raccordement-gaz-normes-bouches-du-rhone',
    title: 'Raccordement gaz dans les Bouches-du-Rhône : normes, obligations et artisans certifiés',
    metaTitle: 'Raccordement Gaz Bouches-du-Rhône | Normes 2025 — Artisan PG Gaz Certifié',
    metaDescription: 'Raccordement gaz en Bouches-du-Rhône : quelles normes respecter, qui peut réaliser les travaux, quel certificat exiger. EFFECTIVE\'PLOMBERIE certifié PG Gaz à Aix et Marseille.',
    keywords: ['raccordement gaz bouches du rhône', 'norme gaz 13', 'certification pg gaz aix', 'travaux gaz marseille', 'artisan gaz certifié 13100'],
    category: 'chaudiere-chauffage',
    tags: ['gaz', 'raccordement', 'normes', 'PG Gaz', 'Bouches-du-Rhône'],
    date: '2025-01-25',
    readTime: 6,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié PG Gaz',
    excerpt: 'Les travaux sur les installations gaz sont strictement encadrés. Voici ce que vous devez savoir sur les normes en vigueur dans le 13 et pourquoi la certification PG Gaz de votre artisan est non négociable.',
    coverSrc: SITE_IMAGES.raccordementsReseau,
    coverAlt: 'Raccordement installation gaz Bouches-du-Rhône',
    zones: ['Bouches-du-Rhône', 'Aix-en-Provence', 'Marseille', 'Martigues', 'Salon'],
    content: [
      { type: 'h2', content: 'La norme NF DTU 61.1 : ce qu\'elle impose' },
      { type: 'p', content: 'Tout raccordement gaz doit respecter la norme NF DTU 61.1 (travaux de gaz). Elle définit les matériaux autorisés, les distances minimales entre tuyauteries, les essais d\'étanchéité obligatoires et les conditions de ventilation. Son respect est obligatoire pour la conformité de votre installation — et pour votre assurance.' },
      { type: 'h2', content: 'Qui peut réaliser des travaux gaz dans le 13 ?' },
      { type: 'p', content: 'Uniquement un professionnel certifié PG Gaz (ex-Qualigaz). Cette certification est délivrée par Qualigaz après formation et examen. Elle doit être à jour (renouvellement tous les 4 ans). EFFECTIVE\'PLOMBERIE est certifié PG Gaz — demandez à voir l\'attestation avant tout travail.' },
      { type: 'warning', content: 'Les travaux gaz réalisés par un non-certifié sont illégaux. En cas d\'accident (fuite, incendie), votre assurance peut refuser la prise en charge si l\'installateur n\'était pas certifié.' },
    ],
    faq: [
      { question: 'Faut-il couper le gaz pour changer une chaudière à Aix-en-Provence ?', answer: 'Oui. Le remplacement d\'une chaudière gaz nécessite l\'interruption de l\'alimentation gaz. Cette coupure est temporaire (quelques heures). Nous coordonnons avec le distributeur si une coupure au compteur général est nécessaire.' },
    ],
    ctaText: 'Demander un devis raccordement gaz',
    ctaLink: '/devis',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE 12 — Communes autour d'Aix (SEO local longue traîne)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'plombier-communes-autour-aix-en-provence',
    title: 'Plombier dans les communes autour d\'Aix-en-Provence : Éguilles, Venelles, Meyreuil et plus',
    metaTitle: 'Plombier Éguilles, Venelles, Meyreuil, Gardanne | EFFECTIVE\'PLOMBERIE',
    metaDescription: 'EFFECTIVE\'PLOMBERIE intervient dans les communes autour d\'Aix-en-Provence : Éguilles, Venelles, Meyreuil, Gardanne, Bouc-Bel-Air, Rousset, Fuveau. Plomberie, chauffage, devis gratuit.',
    keywords: ['plombier éguilles', 'plombier venelles', 'plombier meyreuil', 'plombier gardanne', 'plombier bouc bel air', 'plombier rousset', 'plombier fuveau'],
    category: 'depannage',
    tags: ['Éguilles', 'Venelles', 'Meyreuil', 'Gardanne', 'communes Aix', 'secteur 13'],
    date: '2025-04-10',
    readTime: 4,
    author: 'Wissem ALAYA',
    authorRole: 'Gérant & Plombier certifié RGE',
    excerpt: 'Notre zone d\'intervention couvre bien au-delà d\'Aix-en-Provence. Voici les communes du secteur où nous intervenons régulièrement pour tous types de travaux de plomberie et chauffage.',
    coverSrc: SITE_IMAGES.banniere,
    coverAlt: 'EFFECTIVE\'PLOMBERIE intervention communes autour Aix-en-Provence',
    zones: ['Éguilles', 'Venelles', 'Meyreuil', 'Gardanne', 'Bouc-Bel-Air', 'Rousset', 'Fuveau', 'Peypin', 'Trets'],
    content: [
      { type: 'p', content: 'Basé à Aix-en-Provence (13100), EFFECTIVE\'PLOMBERIE intervient dans un rayon d\'environ 40 km autour d\'Aix. Voici les principales communes du secteur où nous travaillons régulièrement.' },
      { type: 'h2', content: 'Nos zones d\'intervention autour d\'Aix-en-Provence' },
      { type: 'table', content: { headers: ['Commune', 'Code postal', 'Délai indicatif'], rows: [['Éguilles', '13510', '20 min'], ['Venelles', '13770', '15 min'], ['Meyreuil', '13590', '15 min'], ['Gardanne', '13120', '20 min'], ['Bouc-Bel-Air', '13320', '20 min'], ['Rousset', '13790', '25 min'], ['Fuveau', '13710', '25 min'], ['Peypin', '13124', '30 min'], ['Trets', '13530', '35 min'], ['Gréasque', '13850', '20 min']] } },
      { type: 'h2', content: 'Nos prestations dans le secteur d\'Aix' },
      { type: 'ul', content: ['Dépannage urgence & recherche de fuite', 'Rénovation', 'Climatisation', 'Salle de bain complète', 'Plomberie cuisine', 'Raccordements réseau eau et gaz'] },
      { type: 'tip', content: 'Vous habitez une commune non listée ? Appelez-nous — nous étudions chaque demande. Notre zone d\'intervention peut s\'étendre selon la nature du chantier.' },
    ],
    faq: [
      { question: 'Y a-t-il des frais de déplacement pour les communes autour d\'Aix ?', answer: 'Pour les communes à moins de 20 km d\'Aix-en-Provence, le déplacement est inclus dans notre devis. Au-delà, des frais kilométriques peuvent s\'appliquer — nous vous en informons systématiquement avant intervention.' },
    ],
    ctaText: 'Vérifier notre intervention dans votre commune',
    ctaLink: '/contact',
  },

];

export function hydrateText(s: string): string {
  return s.replace(/\[TELEPHONE\]/g, BRAND.phone).replace(/\[EMAIL_PATRON\]/g, BRAND.email);
}

function hydrateSectionContent(
  content: BlogSection['content'],
): BlogSection['content'] {
  if (typeof content === 'string') {
    return hydrateText(content);
  }
  if (Array.isArray(content)) {
    return content.map((item) => hydrateText(item));
  }
  return content;
}

export function hydratePost(post: RawBlogPost): BlogPost {
  return {
    ...post,
    excerpt: hydrateText(post.excerpt),
    content: post.content.map((section) => ({
      ...section,
      content: hydrateSectionContent(section.content),
    })),
    faq: post.faq.map((item) => ({
      question: hydrateText(item.question),
      answer: hydrateText(item.answer),
    })),
  };
}

export const BLOG_POSTS: BlogPost[] = RAW_BLOG_POSTS.map(hydratePost);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
