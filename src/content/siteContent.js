export const siteUrl = 'https://cstlab.dev'

export const companyInfo = {
  brandName: 'CSTLAB',
  founderName: 'Ryan Costenoble',
  founderRole: 'Développeur full-stack',
  email: 'contact@cstlab.dev',
  locationLabel: 'Rennes, France',
  localTravelLabel: 'Rennes et 50 km autour',
  serviceAreaLabel: 'Grand Ouest et remote',
  responseTimeLabel: 'Réponse sous 24h ouvrées',
  strapline: 'Studio web indépendant pour sites, outils métier et intégrations e-commerce.',
  positioning:
    "CSTLAB conçoit des sites, outils métier et intégrations sur mesure avec un objectif simple: clarifier le produit, fiabiliser la technique et accélérer la mise en ligne.",
  collaborationModel:
    "Le studio est piloté par Ryan Costenoble et s'appuie, selon le périmètre, sur un réseau de partenaires design, contenu et branding.",
  socialLinks: [
    { href: 'https://github.com/costenoble/', label: 'GitHub', short: 'GH' },
    { href: 'https://www.malt.fr/profile/ryancostenoble', label: 'Malt', short: 'MA' },
  ],
}

export const defaultMeta = {
  title: 'CSTLAB',
  description:
    'CSTLAB accompagne les projets web, e-commerce et outils métier avec une approche sobre, rapide et maintenable.',
  image: '/og-image.svg',
  imageAlt: 'CSTLAB, studio web indépendant basé à Rennes',
}

export const serviceShowcase = [
  {
    id: 'plateformes',
    number: '01',
    label: 'Plateformes web',
    title: 'Des outils métier clairs pour piloter sans friction.',
    description:
      "Back-offices, espaces clients, dashboards et interfaces d'administration conçus pour rester lisibles à mesure que le produit grandit.",
    deliverables: [
      'Architecture front/back adaptée au volume réel du projet',
      'CRUD, authentification, roles et tableaux de bord',
      'Données temps réel, carte, recherche ou workflows spécifiques',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Supabase', 'JWT'],
    proofTitle: "Retour d'expérience",
    proofText:
      'Quelia: plateforme cartographique multi-marques avec administration avancée, gestion des rôles et affichage temps réel.',
  },
  {
    id: 'ecommerce',
    number: '02',
    label: 'E-commerce',
    title: "Des parcours d'achat fiables, du panier au webhook.",
    description:
      "Le travail ne s'arrête pas à la vitrine: checkout, webhooks, emails transactionnels, suivi de commande et administration doivent tenir la route.",
    deliverables: [
      'Intégration Stripe Checkout et webhooks de confirmation',
      'Tunnel de commande, gestion de statuts et emails transactionnels',
      'Back-office pour services, disponibilités et contenus',
    ],
    stack: ['Stripe', 'Supabase', 'Nodemailer', 'PostgreSQL', 'PM2'],
    proofTitle: "Retour d'expérience",
    proofText:
      'Atelier Calista: plateforme e-commerce complète avec paiement en ligne, dashboard admin et automatisations autour des commandes.',
  },
  {
    id: 'marketing',
    number: '03',
    label: 'Sites marketing',
    title: "Une page claire, qui raconte juste ce qu'il faut.",
    description:
      "Landing pages, sites vitrines et pages de lancement pensées pour expliquer une offre, rassurer vite et générer des prises de contact qualifiées.",
    deliverables: [
      'Structure éditoriale et hiérarchie de contenu',
      'Design responsive, performant et SEO-friendly',
      "Animations utiles, jamais la pour distraire de l'essentiel",
    ],
    stack: ['Vite', 'HTML', 'CSS', 'Framer Motion', 'SEO technique'],
    proofTitle: "Retour d'expérience",
    proofText:
      'SSEAT: landing page éditoriale pour un sujet TVA européenne, avec ton institutionnel, scroll guidé et mise en forme sobre.',
  },
  {
    id: 'integrations',
    number: '04',
    label: 'Intégrations',
    title: "Connecter vos outils sans empiler de la dette.",
    description:
      'APIs tierces, uploads, emails, stockage, synchronisations et automatisations métier pour fiabiliser les opérations sans alourdir le produit.',
    deliverables: [
      'Connexions API externes, OAuth et webhooks',
      'Uploads fichiers, stockage et nettoyage automatique',
      'CORS, validation, sécurisation des flux et monitoring',
    ],
    stack: ['APIs REST', 'Webhooks', 'Supabase Storage', 'CORS', 'Rate limiting'],
    proofTitle: 'Approche',
    proofText:
      "Chaque intégration est pensée comme une pièce produit: observabilité, validation et reprise sur erreur avant l'effet waouh.",
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Cadrage',
    description:
      'On clarifie le besoin, les contraintes, les contenus et le niveau de priorité réel avant de dessiner quoi que ce soit.',
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'On choisit une stack proportionnée, on structure les parcours et on verrouille les dépendances critiques.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Le produit avance par itérations courtes avec démos régulières, arbitrages simples et dette technique sous contrôle.',
  },
  {
    number: '04',
    title: 'Lancement',
    description:
      'Mise en ligne, tests, documentation et transmission pour que le projet reste autonome après livraison.',
  },
]

export const projects = [
  {
    slug: 'quelia',
    name: 'Quelia',
    category: 'Produit web',
    client: 'Plateforme de visualisation cartographique',
    year: '2026',
    image: 'photo-1742347073303-814ca9b301ce',
    siteUrl: 'https://gigaw.app',
    summary:
      'Plateforme de visualisation et gestion de projets avec carte interactive, recherche territoriale et administration multi-marques.',
    outcomes: ['Carte interactive', 'Admin multi-marques', 'Flux temps réel'],
    stack: ['React 18', 'Vite', 'Supabase', 'PostgreSQL', 'Rust'],
  },
  {
    slug: 'atelier-calista',
    name: 'Atelier Calista',
    category: 'E-commerce',
    client: 'Atelier de retouches textiles',
    year: '2025',
    image: 'photo-1753162658307-a2fdbb4c8a67',
    siteUrl: 'https://ateliercalista.fr',
    summary:
      "Solution web complète pour la gestion de commandes, le paiement Stripe, les notifications emails et l'administration des services.",
    outcomes: ['Checkout Stripe', 'Back-office admin', 'Emails transactionnels'],
    stack: ['Node.js', 'Stripe', 'Supabase', 'Vite', 'PM2'],
  },
  {
    slug: 'sseat',
    name: 'SSEAT',
    category: 'Landing page',
    client: 'Projet exploratoire autour de la TVA européenne',
    year: '2026',
    image: 'photo-1561070791-2526d30994b5',
    siteUrl: 'https://sseat-lab.com',
    summary:
      'Landing page éditoriale au ton institutionnel pour présenter un concept technique à une cible experte sans sur-promesse commerciale.',
    outcomes: ['Narration one-page', 'SEO technique', 'Animations sobres'],
    stack: ['Vite', 'Tailwind CSS', 'JavaScript', 'SVG'],
  },
  {
    slug: 'delaje-solutions',
    name: 'Delaje Solutions',
    category: 'Site vitrine',
    client: 'Spécialiste de la découpe laser',
    year: '2025',
    image: 'photo-1581092335397-9583eb92d232',
    siteUrl: 'https://delaje.com',
    summary:
      'Site vitrine pensé pour présenter une activité de découpe laser, clarifier le savoir-faire et générer des prises de contact qualifiées.',
    outcomes: ['Site vitrine', 'Offre clarifiée', 'Prise de contact'],
    stack: ['Vite', 'React', 'SEO technique', 'Formulaire'],
  },
]

export const clientTestimonials = {
  rating: '5,0',
  reviewCount: '5 évaluations',
  sourceLabel: 'Avis publiés sur Malt',
  intro:
    "Des retours concrets de clients avec qui le travail s'est fait dans la durée, sur des lancements, des refontes ou des besoins plus techniques.",
  items: [
    {
      source: 'Avis Malt',
      quote:
        'Toujours un plaisir de travailler avec Ryan, très professionnel, toujours à écouter, et il trouve toujours une solution.',
      author: 'Rabah',
      role: 'Cadre',
      company: 'Asseat',
      context: 'Plusieurs projets menés ensemble',
    },
    {
      source: 'Avis Malt',
      quote:
        "Ryan a été hyper réactif et à l'écoute. Il a su trouver des solutions techniques, proposer des idées, et le travail à distance s'est très bien passé.",
      author: 'Constant',
      role: 'Directeur de projet',
      company: 'Quelia',
      context: 'Produit web cartographique',
    },
    {
      source: 'Recommandation Malt',
      quote:
        "Ryan a su traduire fidèlement mon identité dans un site clair, fluide et professionnel. La communication a été simple, efficace et toujours bienveillante.",
      author: 'Mélina Lory',
      role: 'Gérante',
      company: 'Atelier Calista',
      context: 'Site e-commerce couture',
    },
    {
      source: 'Recommandation Malt',
      quote:
        "Le développement de notre site web s'est parfaitement déroulé du début à la fin. Ryan a su nous accompagner comme il le fallait et le résultat est vraiment top.",
      author: 'Delaje Solutions',
      role: 'Chargé de communication',
      company: 'Delaje Solutions',
      context: 'Site vitrine découpe laser',
    },
  ],
}

export const aboutValues = [
  {
    title: 'Code propre',
    description:
      'Chaque projet est pensé pour être maintenable, documenté et repris sans douleur quelques mois plus tard.',
  },
  {
    title: 'Communication directe',
    description:
      'Un cadrage clair, des retours réguliers et des arbitrages assumés évitent la confusion et les attentes implicites.',
  },
  {
    title: 'Architecture saine',
    description:
      "Le choix de stack et les intégrations sont proportionnés au besoin réel, pas à l'effet de mode.",
  },
  {
    title: 'Transmission',
    description:
      'Formation, documentation et passation font partie du livrable pour que le produit reste exploitable après la mise en ligne.',
  },
]

export const studioModel = [
  {
    label: 'Pilotage',
    title: 'Ryan Costenoble',
    description:
      'Développeur full-stack basé à Rennes, avec un focus sur React, Vite, Stripe, Supabase et les intégrations tierces.',
  },
  {
    label: 'Mode de travail',
    title: 'Studio indépendant',
    description:
      "Le projet avance avec un interlocuteur technique unique, puis s'ouvre à des partenaires design ou contenu quand le périmètre le justifie.",
  },
  {
    label: "Zone d'intervention",
    title: 'Rennes, Grand Ouest et remote',
    description:
      'Cadrage à distance ou sur site selon le besoin, avec déplacements possibles autour de Rennes pour les phases clés.',
  },
]

export const legalSections = {
  mentions: [
    {
      title: 'Éditeur du site',
      body: [
        'CSTLAB est la marque de travail utilisée par Ryan Costenoble pour ses activités de conception et de développement web.',
        'Contact principal: contact@cstlab.dev.',
        "Zone d'activité communiquée publiquement: Rennes, France.",
      ],
    },
    {
      title: 'Responsable de publication',
      body: [
        'Ryan Costenoble assure la direction de la publication et la responsabilité éditoriale du site.',
      ],
    },
    {
      title: 'Immatriculation',
      body: [
        'SIREN : 920 294 097.',
        'Activite exercee en tant que micro-entrepreneur.',
      ],
    },
    {
      title: 'Hébergement',
      body: [
        'Le site est hébergé par la société Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.',
        'Site : www.hostinger.fr',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      body: [
        'Les contenus, textes, maquettes, éléments graphiques et codes présentés sur ce site restent protégés par le droit applicable sauf mention contraire.',
        "Toute reproduction totale ou partielle sans autorisation préalable n'est pas autorisée.",
      ],
    },
  ],
  privacy: [
    {
      title: 'Données collectées',
      body: [
        "Les formulaires de contact et d'audit collectent uniquement les données nécessaires au traitement d'une demande: identité, coordonnées, contexte du projet et informations utiles au chiffrage.",
      ],
    },
    {
      title: 'Finalités',
      body: [
        "Les données sont utilisées pour répondre à une prise de contact, préparer un devis, organiser un rendez-vous ou assurer le suivi d'un échange commercial.",
      ],
    },
    {
      title: 'Base légale',
      body: [
        "Le traitement repose sur les démarches engagées à la demande de la personne concernée et, selon les cas, sur l'intérêt légitime lié au suivi des demandes entrantes.",
      ],
    },
    {
      title: 'Sous-traitants et flux tiers',
      body: [
        "Les formulaires s'appuient actuellement sur FormSubmit pour relayer les envois email. Des services tiers peuvent également être sollicités pour l'hébergement, la livraison technique ou les polices web.",
        "Aucune donnée n'est revendue et aucune campagne de prospection automatique n'est alimentée à partir de ces formulaires.",
      ],
    },
    {
      title: 'Conservation et droits',
      body: [
        'Les données sont conservées le temps nécessaire au traitement de la demande puis archivées ou supprimées selon leur utilité commerciale et légale.',
        "Pour exercer un droit d'accès, de rectification ou de suppression, il convient d'écrire à contact@cstlab.dev.",
      ],
    },
  ],
  cgv: [
    {
      title: "Champ d'application",
      body: [
        'Les présentes conditions encadrent les prestations proposées par CSTLAB pour les missions de conseil, cadrage, design, développement, intégration et maintenance.',
      ],
    },
    {
      title: 'Devis et démarrage',
      body: [
        "Chaque mission fait l'objet d'un devis ou d'une proposition commerciale détaillée précisant le périmètre, le planning, les livrables et les conditions financières.",
        "Le lancement du projet intervient à réception d'un accord explicite sur le devis et, le cas échéant, du versement d'un acompte.",
      ],
    },
    {
      title: 'Exécution et recette',
      body: [
        "Le client s'engage à fournir dans des délais raisonnables les contenus, accès, validations et retours nécessaires à la bonne exécution de la mission.",
        'La recette porte sur la conformité du livrable au devis et aux arbitrages validés pendant la mission.',
      ],
    },
    {
      title: 'Paiement',
      body: [
        "Sauf mention contraire au devis, les factures sont payables selon l'échéancier convenu. Tout retard de paiement peut entraîner la suspension des travaux ou de la maintenance en cours.",
      ],
    },
    {
      title: 'Propriété et maintenance',
      body: [
        'La cession des droits sur les livrables intervient selon les termes prévus au devis, après paiement complet des sommes dues.',
        "La maintenance, l'hébergement, les licences tierces et les évolutions non prévues au périmètre initial font l'objet d'un accord spécifique.",
      ],
    },
  ],
}
