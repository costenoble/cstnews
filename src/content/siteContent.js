export const siteUrl = 'https://cstlab.dev'

export const companyInfo = {
  brandName: 'CST Lab',
  founderName: 'Ryan Costenoble',
  founderRole: 'Developpeur full-stack',
  email: 'contact@cstlab.dev',
  locationLabel: 'Rennes, France',
  localTravelLabel: 'Rennes et 50 km autour',
  serviceAreaLabel: 'Grand Ouest et remote',
  responseTimeLabel: 'Reponse sous 24h ouvrees',
  strapline: 'Studio web independant pour sites, outils metier et integrations e-commerce.',
  positioning:
    "CST Lab concoit des sites, outils metier et integrations sur mesure avec un objectif simple: clarifier le produit, fiabiliser la technique et accelerer la mise en ligne.",
  collaborationModel:
    "Le studio est pilote par Ryan Costenoble et s'appuie, selon le perimetre, sur un reseau de partenaires design, contenu et branding.",
  socialLinks: [
    { href: 'https://github.com/costenoble/', label: 'GitHub', short: 'GH' },
    { href: 'https://www.malt.fr/profile/ryancostenoble', label: 'Malt', short: 'MA' },
  ],
}

export const defaultMeta = {
  title: 'CSTLAB',
  description:
    'CST Lab accompagne les projets web, e-commerce et outils metier avec une approche sobre, rapide et maintenable.',
  image: '/og-image.svg',
}

export const serviceShowcase = [
  {
    id: 'plateformes',
    number: '01',
    label: 'Plateformes web',
    title: 'Des outils metier clairs pour piloter sans friction.',
    description:
      "Back-offices, espaces clients, dashboards et interfaces d'administration concus pour rester lisibles a mesure que le produit grandit.",
    deliverables: [
      'Architecture front/back adaptee au volume reel du projet',
      'CRUD, authentification, roles et tableaux de bord',
      'Donnees temps reel, carte, recherche ou workflows specifiques',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Supabase', 'JWT'],
    proofTitle: "Retour d'experience",
    proofText:
      'Quelia: plateforme cartographique multi-marques avec administration avancee, gestion des roles et affichage temps reel.',
  },
  {
    id: 'ecommerce',
    number: '02',
    label: 'E-commerce',
    title: "Des parcours d'achat fiables, du panier au webhook.",
    description:
      "Le travail ne s'arrete pas a la vitrine: checkout, webhooks, emails transactionnels, suivi de commande et administration doivent tenir la route.",
    deliverables: [
      'Integration Stripe Checkout et webhooks de confirmation',
      'Tunnel de commande, gestion de statuts et emails transactionnels',
      'Back-office pour services, disponibilites et contenus',
    ],
    stack: ['Stripe', 'Supabase', 'Nodemailer', 'PostgreSQL', 'PM2'],
    proofTitle: "Retour d'experience",
    proofText:
      'Atelier Calista: plateforme e-commerce complete avec paiement en ligne, dashboard admin et automatisations autour des commandes.',
  },
  {
    id: 'marketing',
    number: '03',
    label: 'Sites marketing',
    title: "Une page claire, qui raconte juste ce qu'il faut.",
    description:
      "Landing pages, sites vitrines et pages de lancement penses pour expliquer une offre, rassurer vite et generer des prises de contact qualifiees.",
    deliverables: [
      'Structure editoriale et hierarchie de contenu',
      'Design responsive, performant et SEO-friendly',
      "Animations utiles, jamais la pour distraire de l'essentiel",
    ],
    stack: ['Vite', 'HTML', 'CSS', 'Framer Motion', 'SEO technique'],
    proofTitle: "Retour d'experience",
    proofText:
      'SSEAT: landing page editoriale pour un sujet TVA europeenne, avec ton institutionnel, scroll guide et mise en forme sobre.',
  },
  {
    id: 'integrations',
    number: '04',
    label: 'Integrations',
    title: "Connecter vos outils sans empiler de la dette.",
    description:
      'APIs tierces, uploads, emails, stockage, synchronisations et automatisations metier pour fiabiliser les operations sans alourdir le produit.',
    deliverables: [
      'Connexions API externes, OAuth et webhooks',
      'Uploads fichiers, stockage et nettoyage automatique',
      'CORS, validation, securisation des flux et monitoring',
    ],
    stack: ['APIs REST', 'Webhooks', 'Supabase Storage', 'CORS', 'Rate limiting'],
    proofTitle: 'Approche',
    proofText:
      "Chaque integration est pensee comme une piece produit: observabilite, validation et reprise sur erreur avant l'effet waouh.",
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Cadrage',
    description:
      'On clarifie le besoin, les contraintes, les contenus et le niveau de priorite reel avant de dessiner quoi que ce soit.',
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'On choisit une stack proportionnee, on structure les parcours et on verrouille les dependances critiques.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Le produit avance par iterations courtes avec demos regulieres, arbitrages simples et dette technique sous controle.',
  },
  {
    number: '04',
    title: 'Lancement',
    description:
      'Mise en ligne, tests, documentation et transmission pour que le projet reste autonome apres livraison.',
  },
]

export const projects = [
  {
    slug: 'quelia',
    name: 'Quelia',
    category: 'Produit web',
    client: 'Plateforme de visualisation cartographique',
    year: '2026',
    image: 'photo-1486312338219-ce68d2c6f44d',
    summary:
      'Plateforme de visualisation et gestion de projets avec carte interactive, recherche territoriale et administration multi-marques.',
    outcomes: ['Carte interactive', 'Admin multi-marques', 'Flux temps reel'],
    stack: ['React 18', 'Vite', 'Supabase', 'PostgreSQL', 'Rust'],
  },
  {
    slug: 'atelier-calista',
    name: 'Atelier Calista',
    category: 'E-commerce',
    client: 'Atelier de retouches textiles',
    year: '2025',
    image: 'photo-1504384308090-c894fdcc538d',
    summary:
      "Solution web complete pour la gestion de commandes, le paiement Stripe, les notifications emails et l'administration des services.",
    outcomes: ['Checkout Stripe', 'Back-office admin', 'Emails transactionnels'],
    stack: ['Node.js', 'Stripe', 'Supabase', 'Vite', 'PM2'],
  },
  {
    slug: 'sseat',
    name: 'SSEAT',
    category: 'Landing page',
    client: 'Projet exploratoire autour de la TVA europeenne',
    year: '2026',
    image: 'photo-1561070791-2526d30994b5',
    summary:
      'Landing page editoriale au ton institutionnel pour presenter un concept technique a une cible experte sans sur-promesse commerciale.',
    outcomes: ['Narration one-page', 'SEO technique', 'Animations sobres'],
    stack: ['Vite', 'Tailwind CSS', 'JavaScript', 'SVG'],
  },
]

export const aboutValues = [
  {
    title: 'Code propre',
    description:
      'Chaque projet est pense pour etre maintenable, documente et repris sans douleur quelques mois plus tard.',
  },
  {
    title: 'Communication directe',
    description:
      'Un cadrage clair, des retours reguliers et des arbitrages assumes evitent la confusion et les attentes implicites.',
  },
  {
    title: 'Architecture saine',
    description:
      "Le choix de stack et les integrations sont proportionnes au besoin reel, pas a l'effet de mode.",
  },
  {
    title: 'Transmission',
    description:
      'Formation, documentation et passation font partie du livrable pour que le produit reste exploitable apres la mise en ligne.',
  },
]

export const studioModel = [
  {
    label: 'Pilotage',
    title: 'Ryan Costenoble',
    description:
      'Developpeur full-stack base a Rennes, avec un focus sur React, Vite, Stripe, Supabase et les integrations tierces.',
  },
  {
    label: 'Mode de travail',
    title: 'Studio independant',
    description:
      "Le projet avance avec un interlocuteur technique unique, puis s'ouvre a des partenaires design ou contenu quand le perimetre le justifie.",
  },
  {
    label: "Zone d'intervention",
    title: 'Rennes, Grand Ouest et remote',
    description:
      'Cadrage a distance ou sur site selon le besoin, avec deplacements possibles autour de Rennes pour les phases cles.',
  },
]

export const legalSections = {
  mentions: [
    {
      title: 'Editeur du site',
      body: [
        'CST Lab est la marque de travail utilisee par Ryan Costenoble pour ses activites de conception et de developpement web.',
        'Contact principal: contact@cstlab.dev.',
        "Zone d'activite communiquee publiquement: Rennes, France.",
      ],
    },
    {
      title: 'Responsable de publication',
      body: [
        'Ryan Costenoble assure la direction de la publication et la responsabilite editoriale du site.',
      ],
    },
    {
      title: "Hebergement et informations d'immatriculation",
      body: [
        "Ces informations doivent etre confirmees avec les donnees administratives definitives et l'environnement de production effectivement retenu avant publication finale.",
        'La page est deja structuree pour accueillir ces mentions sans inventer de donnees sensibles ou inexactes.',
      ],
    },
    {
      title: 'Propriete intellectuelle',
      body: [
        'Les contenus, textes, maquettes, elements graphiques et codes presentes sur ce site restent proteges par le droit applicable sauf mention contraire.',
        "Toute reproduction totale ou partielle sans autorisation prealable n'est pas autorisee.",
      ],
    },
  ],
  privacy: [
    {
      title: 'Donnees collectees',
      body: [
        "Les formulaires de contact et d'audit collectent uniquement les donnees necessaires au traitement d'une demande: identite, coordonnees, contexte du projet et informations utiles au chiffrage.",
      ],
    },
    {
      title: 'Finalites',
      body: [
        "Les donnees sont utilisees pour repondre a une prise de contact, preparer un devis, organiser un rendez-vous ou assurer le suivi d'un echange commercial.",
      ],
    },
    {
      title: 'Base legale',
      body: [
        "Le traitement repose sur les demarches engagees a la demande de la personne concernee et, selon les cas, sur l'interet legitime lie au suivi des demandes entrantes.",
      ],
    },
    {
      title: 'Sous-traitants et flux tiers',
      body: [
        "Les formulaires s'appuient actuellement sur FormSubmit pour relayer les envois email. Des services tiers peuvent egalement etre sollicites pour l'hebergement, la livraison technique ou les polices web.",
        "Aucune donnee n'est revendue et aucune campagne de prospection automatique n'est alimentee a partir de ces formulaires.",
      ],
    },
    {
      title: 'Conservation et droits',
      body: [
        'Les donnees sont conservees le temps necessaire au traitement de la demande puis archivees ou supprimees selon leur utilite commerciale et legale.',
        "Pour exercer un droit d'acces, de rectification ou de suppression, il convient d'ecrire a contact@cstlab.dev.",
      ],
    },
  ],
  cgv: [
    {
      title: "Champ d'application",
      body: [
        'Les presentes conditions encadrent les prestations proposees par CST Lab pour les missions de conseil, cadrage, design, developpement, integration et maintenance.',
      ],
    },
    {
      title: 'Devis et demarrage',
      body: [
        "Chaque mission fait l'objet d'un devis ou d'une proposition commerciale detaillee precisant le perimetre, le planning, les livrables et les conditions financieres.",
        "Le lancement du projet intervient a reception d'un accord explicite sur le devis et, le cas echeant, du versement d'un acompte.",
      ],
    },
    {
      title: 'Execution et recette',
      body: [
        "Le client s'engage a fournir dans des delais raisonnables les contenus, acces, validations et retours necessaires a la bonne execution de la mission.",
        'La recette porte sur la conformite du livrable au devis et aux arbitrages valides pendant la mission.',
      ],
    },
    {
      title: 'Paiement',
      body: [
        "Sauf mention contraire au devis, les factures sont payables selon l'echeancier convenu. Tout retard de paiement peut entrainer la suspension des travaux ou de la maintenance en cours.",
      ],
    },
    {
      title: 'Propriete et maintenance',
      body: [
        'La cession des droits sur les livrables intervient selon les termes prevus au devis, apres paiement complet des sommes dues.',
        "La maintenance, l'hebergement, les licences tierces et les evolutions non prevues au perimetre initial font l'objet d'un accord specifique.",
      ],
    },
  ],
}
