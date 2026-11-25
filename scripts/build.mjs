import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')

const nav = [
  ['Culture R&D', '/culture-rd/'],
  ['Continuité & transformations', '/continuite-transformations/'],
  ['Expertise documentaire', '/expertise-documentaire/'],
  ['Infrastructure souveraine', '/infrastructure-souveraine/'],
  ['IA appliquée', '/ia-appliquee/'],
  ['Orchestration IA', '/orchestration-ia/'],
  ['Formations IA', '/formations-ia/'],
  ['Réalisations métier', '/realisations-metier/'],
  ['Références historiques', '/references-historiques/'],
  ['Contact', '/contact/'],
]

const logos = [
  ['ADP', 'adp.svg'],
  ['Banque Populaire', 'bp.svg'],
  ['BPCE', 'bpce.svg'],
  ['BRED Banque Populaire', 'bprp.svg'],
  ['Caisse d’Epargne', 'caisse-epargne.svg'],
  ['CFC', 'cfc.svg'],
  ['Dior', 'dior.svg'],
  ['General Electric', 'ge.svg'],
  ['INPI', 'inpi.svg'],
  ['Natixis', 'natixis.svg'],
  ['Binck', 'binck.png'],
  ['Pitch', 'pitch.png'],
  ['Revue Fiduciaire', 'revue-fiduciaire.png'],
  ['JB Drax', 'jb-drax.svg'],
]

const gedeasyShots = Array.from({ length: 13 }, (_, index) => `gedeasy-${String(index + 1).padStart(2, '0')}.jpg`)

const promptFiles = [
  '000_REGLES_EDITORIALES_ABSOLUES.md',
  'cas-usages.html',
  'ia-atrophie-cognitive.html',
  'Archive.zip',
]

const journey = [
  ['Accueil', '/'],
  ['Culture R&D', '/culture-rd/'],
  ['Continuité & transformations', '/continuite-transformations/'],
  ['Expertise documentaire', '/expertise-documentaire/'],
  ['Infrastructure souveraine', '/infrastructure-souveraine/'],
  ['IA appliquée', '/ia-appliquee/'],
  ['Orchestration IA', '/orchestration-ia/'],
  ['Formations IA', '/formations-ia/'],
  ['Réalisations métier', '/realisations-metier/'],
  ['Références historiques', '/references-historiques/'],
  ['Contact', '/contact/'],
]

const breadcrumbParents = new Map([
  ['/orchestration-ia/', [['IA appliquée', '/ia-appliquee/']]],
  ['/dokee/', [['Réalisations métier', '/realisations-metier/']]],
  ['/solutions/', [['Expertise documentaire', '/expertise-documentaire/']]],
  ['/cas-usages.html', [['IA appliquée', '/ia-appliquee/']]],
  ['/ia-atrophie-cognitive.html', [['IA appliquée', '/ia-appliquee/']]],
])

function labelForPath(path, fallback = '') {
  return journey.find(([, href]) => href === path)?.[0]
    || nav.find(([, href]) => href === path)?.[0]
    || fallback
}

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function breadcrumb(path, title) {
  if (path === '/') return ''
  const trail = [['Accueil', '/'], ...(breadcrumbParents.get(path) || []), [labelForPath(path, title), path]]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, item], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `https://www.2py.fr${item}`,
    })),
  }
  return `<nav class="breadcrumb" aria-label="Fil d’Ariane"><div class="wrap">${trail.map(([name, href], index) => index === trail.length - 1 ? `<span aria-current="page">${name}</span>` : `<a href="${href}">${name}</a>`).join('<span class="sep">→</span>')}</div><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></nav>`
}

function sequenceFor(path, variant = 'top') {
  const index = journey.findIndex(([, href]) => href === path)
  if (index === -1) return ''
  const prev = journey[index - 1]
  const next = journey[index + 1]
  if (variant === 'top') {
    return `<nav class="sequence sequence-top" aria-label="Navigation séquentielle"><div class="wrap">${prev ? `<a href="${prev[1]}">← ${prev[0]}</a>` : '<span></span>'}<span>${labelForPath(path, 'Page')}</span>${next ? `<a href="${next[1]}">${next[0]} →</a>` : '<span></span>'}</div></nav>`
  }
  return `<nav class="sequence sequence-bottom" aria-label="Page précédente et page suivante"><div class="wrap">${prev ? `<a class="seq-card prev" href="${prev[1]}"><span>Page précédente</span><strong>← ${prev[0]}</strong></a>` : '<span></span>'}${next ? `<a class="seq-card next" href="${next[1]}"><span>Page suivante</span><strong>${next[0]} →</strong></a>` : '<span></span>'}</div></nav>`
}

function layout({ title, description, path, body, type = 'WebPage' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: `https://www.2py.fr${path}`,
    publisher: {
      '@type': 'Organization',
      name: '2PY',
      url: 'https://www.2py.fr/',
    },
  }

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | 2PY</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="https://www.2py.fr${path}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="https://www.2py.fr${path}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  <a class="skip" href="#contenu">Aller au contenu</a>
  <header class="topbar">
    <nav class="nav" aria-label="Navigation principale">
      <a class="brand" href="/" aria-label="Accueil 2PY"><strong>2PY</strong><span>Yves Philippe Patrick</span></a>
      <button class="menu-toggle" data-menu-toggle type="button" aria-label="Ouvrir le menu" aria-expanded="false">Menu</button>
      <div class="links">${nav.map(([label, href]) => `<a href="${href}"${href === path ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta" href="/contact/">Échanger</a></div>
    </nav>
  </header>
  ${sequenceFor(path, 'top')}
  ${breadcrumb(path, title)}
  <main id="contenu">${body}${sequenceFor(path, 'bottom')}</main>
  <footer class="footer">
    <div class="footer-grid">
      <div><a class="footer-brand" href="/"><strong>2PY</strong><span>— Yves · Philippe · Patrick</span></a><p>Société d’ingénierie historique, discrète et durable, construite autour de la R&D, des documents sensibles, de l’infrastructure et de l’IA raisonnée.</p></div>
      <div><h3>Ingénierie</h3><a href="/culture-rd/">Culture R&D</a><a href="/expertise-documentaire/">Expertise documentaire</a><a href="/infrastructure-souveraine/">Infrastructure souveraine</a></div>
      <div><h3>Applications</h3><a href="/ia-appliquee/">IA appliquée</a><a href="/orchestration-ia/">Orchestration IA</a><a href="/formations-ia/">Formations IA</a><a href="/realisations-metier/">Réalisations métier</a><a href="/solutions/">Contextes métier</a><a href="/dokee/">Réalisation GEDeasy / Dokee</a></div>
      <div><h3>Confiance</h3><a href="/references-historiques/">Références historiques</a><a href="/contact/">Contact</a><a href="/mentions-legales/">Mentions légales</a><a href="/politique-confidentialite/">Confidentialité</a></div>
    </div>
    <p class="copyright">Copyright 2PY · Site statique sans tracking publicitaire.</p>
  </footer>
  <script src="/assets/main.js"></script>
</body>
</html>`
}

function hero(kicker, title, text, actionHref = '/contact/', actionLabel = 'Parler d’un projet') {
  return `<section class="hero"><div class="wrap hero-inner"><div><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lead">${text}</p><div class="actions"><a class="btn primary" href="${actionHref}">${actionLabel}</a><a class="btn ghost" href="/orchestration-ia/">Voir l’orchestration IA</a></div></div><aside class="proof-panel" aria-label="Repères 2PY"><div><span>Durée</span><strong>Plus de vingt ans d’adaptation technique</strong></div><div><span>Confiance</span><strong>Références historiques et environnements exigeants</strong></div><div><span>Approche</span><strong>Continuité, maîtrise économique, robustesse</strong></div></aside></div></section>`
}

function cards(items, className = '') {
  return `<div class="card-grid ${className}">${items.map(([title, text, href]) => {
    const content = `<article class="card"><h3>${title}</h3><p>${text}</p>${href ? '<span>Lire la suite</span>' : ''}</article>`
    return href ? `<a href="${href}">${content}</a>` : content
  }).join('')}</div>`
}

function textSection(kicker, title, paragraphs, cta) {
  return `<section class="section"><div class="wrap split"><div><p class="eyebrow">${kicker}</p><h2>${title}</h2>${cta ? `<a class="text-link" href="${cta[1]}">${cta[0]}</a>` : ''}</div><div class="richtext">${paragraphs.map(p => `<p>${p}</p>`).join('')}</div></div></section>`
}

function compactHero(kicker, title, text) {
  return `<section class="page-head"><div class="wrap"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lead">${text}</p></div></section>`
}

function logoCarousel(includeLink = true) {
  const visible = logos.map(([name, file]) => `<li class="logo-slide"><img loading="lazy" src="/assets/logos/${file}" alt="${esc(name)}"></li>`).join('')
  const hidden = logos.map(([name, file]) => `<li class="logo-slide" aria-hidden="true"><img loading="lazy" src="/assets/logos/${file}" alt=""></li>`).join('')
  return `<div class="logo-carousel" data-logo-carousel>
    <div class="carousel-head">
      <p>Ces références historiques témoignent de la capacité de 2PY à intervenir sur des environnements exigeants, sensibles et structurants.</p>
      <div class="carousel-actions">${includeLink ? '<a href="/references-historiques/">Voir les références historiques</a>' : ''}<button type="button" data-carousel-prev aria-label="Logo précédent">‹</button><button type="button" data-carousel-next aria-label="Logo suivant">›</button></div>
    </div>
    <div class="logo-viewport" tabindex="0" aria-label="Références clients historiques"><ul class="logo-track">${visible}${hidden}</ul></div>
  </div>`
}

function evolutionTimeline(items) {
  return `<div class="timeline">${items.map(([period, title, text]) => `<article><span>${period}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>`
}

function contextBlocks(items) {
  return `<div class="context-grid">${items.map(([sector, before, after]) => `<article class="context-card"><h3>${sector}</h3><div class="before-after"><div><strong>Socle historique</strong><p>${before}</p></div><div><strong>Évolution actuelle</strong><p>${after}</p></div></div></article>`).join('')}</div>`
}

function imageCarousel({ title, text, images, basePath, label }) {
  return `<section class="section soft"><div class="wrap"><div class="media-head"><div><p class="eyebrow">Interfaces</p><h2>${title}</h2></div><p>${text}</p></div><div class="shot-carousel" data-shot-carousel>
    <div class="shot-viewport" tabindex="0" aria-label="${esc(label)}">
      <ul class="shot-track">${images.map((file, index) => `<li class="shot-slide"><figure><img loading="${index === 0 ? 'eager' : 'lazy'}" src="${basePath}/${file}" alt="${esc(`${label} ${index + 1}`)}"><figcaption>${label} ${index + 1}</figcaption></figure></li>`).join('')}</ul>
    </div>
    <div class="shot-controls"><button type="button" data-shot-prev aria-label="Capture précédente">←</button><span data-shot-count>1 / ${images.length}</span><button type="button" data-shot-next aria-label="Capture suivante">→</button></div>
  </div></div></section>`
}

function aliasPage(path, target, label) {
  return layout({
    title: `${label} — orientation`,
    description: `Accès au contenu ${label} dans l’architecture actuelle du site 2PY.`,
    path,
    body: `<section class="section bridge"><div class="wrap bridge-inner"><p class="eyebrow">Orientation</p><h1>${label}</h1><p class="lead">Cette adresse vous oriente vers le contenu correspondant dans l’architecture actuelle du site 2PY.</p><div class="actions"><a class="btn primary" href="${target}">Accéder au contenu</a><a class="btn ghost" href="/">Retour accueil</a></div></div></section>`,
  })
}

const pages = new Map()

pages.set('/', layout({
  title: 'Ingénierie documentaire, infrastructure souveraine et IA gouvernée',
  description: '2PY relie ingénierie documentaire, infrastructure souveraine et IA gouvernée pour des organisations exigeantes et durables.',
  path: '/',
  body: `${hero('Ingénierie durable · documents · infrastructure · IA', 'Des serveurs vocaux à l’IA documentaire', 'Depuis les architectures télécoms et les serveurs vocaux jusqu’aux infrastructures documentaires et à l’orchestration des usages IA, 2PY accompagne des organisations confrontées à des enjeux de continuité, de gouvernance, de sécurité et d’évolution technologique. Cette stabilité ne vient pas d’une immobilité technique, mais d’une capacité continue à adapter les architectures, les services et les traitements aux transformations documentaires, infrastructurelles et désormais IA des organisations accompagnées.', '/continuite-transformations/', 'Comprendre la continuité')}
  <section class="section founders"><div class="wrap split compact"><div><p class="eyebrow">Socle humain</p><h2>Une culture construite ensemble, au service de la durée.</h2></div><div class="richtext"><p>Yves, Philippe et Patrick restent le socle d’une culture d’ingénierie exigeante. Le sujet principal demeure toutefois la continuité des réponses apportées aux organisations accompagnées : sécuriser les flux, faire évoluer les architectures et maintenir la confiance dans le temps.</p></div></div></section>
  ${textSection('Évolution continue', 'Évolution continue des usages et des architectures.', ['Depuis plus de vingt ans, 2PY accompagne des organisations confrontées à des mutations successives : dématérialisation, infrastructures distribuées, virtualisation, automatisation documentaire et désormais intelligence artificielle générative.', 'Les offres et les services ont continuellement évolué pour répondre à des contraintes réelles : qualité documentaire, sécurité, coûts d’exploitation, gouvernance, robustesse des flux et maîtrise des traitements.', 'Aujourd’hui, cette continuité se prolonge dans l’ingénierie du prompt, l’orchestration des API IA et l’optimisation raisonnée des architectures de traitement.'], ['Lire la continuité des transformations', '/continuite-transformations/'])}
  ${textSection('2PY en quelques lignes', 'Ingénierie documentaire, infrastructure, IA et développement métier.', ['2PY accompagne des organisations qui manipulent des informations sensibles : dossiers clients, flux de validation, archives, accès, sauvegardes, usages IA et applications métier.', `Le site ne présente pas une promesse produit unique. Il expose une culture d’ingénierie capable de relier la <a href="/expertise-documentaire/">qualité documentaire</a>, la <a href="/infrastructure-souveraine/">robustesse des infrastructures</a>, la gouvernance des traitements automatisés et la maîtrise économique des architectures IA.`], ['Découvrir 2PY', '/a-propos/'])}
  <section class="section soft"><div class="wrap"><p class="eyebrow">Axes principaux</p><h2>Aller à l’essentiel.</h2>${cards([
    ['Culture R&D', 'Serveurs vocaux, reconnaissance et synthèse vocale, Dialogic, CNET, télécoms et continuité vers l’IA actuelle.', '/culture-rd/'],
    ['Expertise documentaire', 'Workflows, indexation, validation, archivage, gouvernance et usages métier réels.', '/expertise-documentaire/'],
    ['Infrastructure souveraine', 'Hébergement, sauvegardes, PRA/PCA, virtualisation, sécurité et continuité d’activité.', '/infrastructure-souveraine/'],
    ['Continuité des transformations', 'Relier vingt ans de besoins clients, d’architectures documentaires et d’usages IA gouvernés.', '/continuite-transformations/'],
    ['IA appliquée', 'Consignes structurées, classification, extraction, recherche augmentée, auditabilité et gouvernance raisonnable.', '/ia-appliquee/'],
    ['Orchestration IA', 'Architecture multi-modèles, pilotage des API, arbitrage qualité/coût et maîtrise des consommations.', '/orchestration-ia/'],
  ], 'compact-cards')}</div></section>
  <section class="section dark compact-section"><div class="wrap"><p class="eyebrow">Références</p><h2>Une confiance construite dans des environnements exigeants.</h2>${logoCarousel(true)}</div></section>
  <section class="section soft"><div class="wrap split compact"><div><p class="eyebrow">Formations IA</p><h2>Acculturation, accompagnement et montée en compétence.</h2><a class="text-link" href="/formations-ia/">Voir l’orientation formations IA</a></div><div class="richtext"><p>Pour les formations IA, les ateliers dirigeants, les usages métier et l’accompagnement opérationnel des équipes, 2PY renvoie vers le site de Patrick Pécot.</p><p>Cette articulation rend lisible la complémentarité : 2PY pour l’ingénierie documentaire, l’infrastructure et l’orchestration ; Patrick Pécot pour la pédagogie, les formations et l’adoption des usages IA.</p></div></div></section>
  <section class="section cta"><div class="wrap"><h2>Un sujet documentaire, logiciel, infrastructure ou IA ?</h2><p>2PY qualifie les contraintes avant de proposer une réponse.</p><a class="btn primary" href="/contact/">Prendre contact</a></div></section>`,
}))

pages.set('/continuite-transformations/', layout({
  title: 'Continuité technologique, transformations documentaires et IA gouvernée',
  description: 'Comprendre la continuité entre télécoms, documentaire, infrastructure, orchestration IA, gouvernance et optimisation économique.',
  path: '/continuite-transformations/',
  body: `${compactHero('Continuité des transformations', 'Les technologies changent, les exigences de confiance demeurent.', 'Depuis plus de vingt ans, 2PY accompagne des organisations exigeantes confrontées à des mutations successives : dématérialisation, infrastructures distribuées, virtualisation, automatisation documentaire et désormais intelligence artificielle générative.')}
  ${textSection('Environnements de confiance', 'Faire évoluer les réponses sans rompre la continuité client.', ['2PY n’a pas construit sa crédibilité sur une technologie unique. La continuité vient d’une capacité à comprendre les flux, les contraintes de validation, les responsabilités d’accès et les niveaux de preuve attendus par les organisations accompagnées.', `Les usages IA actuels prolongent des problématiques déjà anciennes : structurer les flux, qualifier les informations, sécuriser les traitements et maintenir la confiance dans les systèmes. Cette logique relie directement l’<a href="/expertise-documentaire/">expertise documentaire</a>, l’<a href="/infrastructure-souveraine/">infrastructure souveraine</a> et l’<a href="/orchestration-ia/">orchestration IA</a>.`, 'Cette approche reste volontairement sobre : pas de mise en scène artificielle, mais une attention aux infrastructures invisibles, aux flux sensibles, à la robustesse et à la supervision.'])}
  <section class="section soft"><div class="wrap"><p class="eyebrow">Trajectoire</p><h2>Une évolution par besoins successifs.</h2>${evolutionTimeline([
    ['Télécoms', 'Serveurs vocaux et architectures interactives', 'Reconnaissance vocale, synthèse vocale, composants Dialogic et contraintes d’exploitation continue ont installé une culture du signal, du contexte et de la fiabilité.'],
    ['Documentaire', 'GED, workflows et validation', 'Les documents deviennent des flux métier : indexation, droits, traces, cycles de vie, circuits de validation et responsabilités partagées.'],
    ['Infrastructure', 'Virtualisation, sécurité et continuité', 'L’hébergement, les sauvegardes, le PRA/PCA et la maîtrise des accès deviennent indissociables de la confiance documentaire.'],
    ['Automatisation', 'Traitements, intégrations et supervision', 'Les chaînes métier relient scripts, applications, données, règles de contrôle et interventions humaines pour industrialiser sans perdre la maîtrise.'],
    ['IA générative', 'Orchestration gouvernée des modèles', 'L’IA s’inscrit comme une couche de traitement à cadrer : prompt, contexte, modèles, API, coûts, auditabilité et supervision humaine.'],
  ])}</div></section>
  <section class="section"><div class="wrap split"><div><p class="eyebrow">Usages clients</p><h2>Les mêmes exigences traversent plusieurs générations technologiques.</h2><a class="text-link" href="/references-historiques/">Voir les références historiques</a></div><div class="richtext"><p>La fidélité client ne s’explique pas par la conservation d’anciens outils. Elle s’explique par la capacité à adapter les services quand les besoins changent : volumes, sécurité, rapidité, auditabilité, qualité documentaire et coûts d’exploitation.</p><p>Certaines architectures nécessitent aujourd’hui d’orchestrer plusieurs modèles et plusieurs fournisseurs afin d’obtenir un équilibre pertinent entre qualité, coût, rapidité et profondeur de traitement. Cette évolution éclaire aussi les <a href="/realisations-metier/">réalisations métier</a> maintenues dans la durée.</p></div></div></section>
  <section class="section dark"><div class="wrap"><p class="eyebrow">Contextes de confiance</p><h2>Des missions décrites par typologies, sans exposer d’informations sensibles.</h2>${contextBlocks([
    ['Banque et finance', 'Les premiers besoins portent sur des flux documentaires fiables, la validation, la sécurité, l’archivage et la traçabilité.', 'Les mêmes exigences se prolongent vers la gouvernance IA, l’orchestration documentaire, la classification, la maîtrise des coûts et l’auditabilité des chaînes de traitement.'],
    ['Industrie et groupes internationaux', 'La continuité s’est construite autour des infrastructures, des accès, de la GED, de l’exploitation multi-sites et de la reprise d’activité.', 'Elle intègre désormais la recherche augmentée, l’hybridation des traitements, l’optimisation des flux et la supervision de plusieurs modèles.'],
    ['Institutions et organisations sensibles', 'La circulation documentaire, la validation, la sécurisation et la maîtrise des responsabilités structurent le socle de confiance.', 'Les usages actuels ajoutent la gouvernance IA, la qualité des entrées, la maîtrise des contextes, la supervision humaine et la robustesse automatisée.'],
  ])}</div></section>
  <section class="section soft"><div class="wrap"><p class="eyebrow">Architecture IA</p><h2>L’IA comme architecture à gouverner.</h2><div class="pillar-grid">${cards([
    ['Ingénierie du prompt', 'Transformer une intention métier en consignes structurées, testables et maintenables.'],
    ['Pilotage des API', 'Choisir les modèles et fournisseurs selon les tâches, les coûts, la profondeur attendue et les contraintes de confidentialité.'],
    ['Maîtrise économique', 'L’ingénierie des usages IA implique une maîtrise fine des coûts de traitement, des contextes transmis et des arbitrages entre modèles.'],
    ['Supervision', 'Maintenir une responsabilité humaine explicite, des traces de traitement et des règles de reprise.'],
  ], 'three')}</div></div></section>
  <section class="section cta"><div class="wrap"><h2>Relier un besoin actuel à une architecture durable.</h2><p>2PY qualifie les flux, les contraintes documentaires et les arbitrages IA avant de proposer une réponse.</p><a class="btn primary" href="/contact/">Qualifier un contexte</a></div></section>`,
}))

pages.set('/a-propos/', layout({
  title: '2PY, identité fondatrice et culture d’ingénierie durable',
  description: 'Origine de 2PY, continuité des fondateurs et culture d’ingénierie durable au service du documentaire, de l’infrastructure et de l’IA.',
  path: '/a-propos/',
  body: `${compactHero('2PY', 'Une société d’ingénierie portée par ses fondateurs.', 'Le nom 2PY s’inscrit dans l’histoire commune de Yves, Philippe et Patrick. Cette continuité humaine fonde la crédibilité technique de l’entreprise.')}
  ${textSection('Origine', 'Une stabilité rare dans le temps long.', ['2PY vient des initiales des fondateurs. Ce détail n’est pas décoratif : il indique une société construite autour de personnes qui ont continué à porter ensemble la même culture technique.', `Cette permanence se retrouve dans la manière de travailler : analyse des flux, sobriété des choix, refus des effets de mode et attention aux contraintes réelles. Elle soutient la <a href="/continuite-transformations/">continuité des transformations</a> plus qu’elle ne constitue le sujet principal du site.`])}
  <section class="section soft"><div class="wrap">${cards([
    ['Culture d’ingénierie', 'Comprendre les systèmes avant de promettre une solution.'],
    ['Expérience terrain', 'Travailler sur les documents, les accès, les validations et les infrastructures réellement utilisés.'],
    ['Relation de confiance', 'Construire sur la durée avec des interlocuteurs qui restent responsables.'],
  ], 'three')}</div></section>`,
}))

pages.set('/culture-rd/', layout({
  title: 'Culture R&D, architectures télécoms et continuité technologique',
  description: 'Serveurs vocaux, reconnaissance, synthèse vocale et culture R&D : la continuité technique qui mène à l’IA documentaire gouvernée.',
  path: '/culture-rd/',
  body: `${compactHero('Culture R&D', 'Des systèmes vocaux aux architectures documentaires augmentées.', 'La différence 2PY vient d’une culture technique antérieure aux effets de mode actuels : télécoms, serveurs vocaux, reconnaissance vocale, synthèse vocale et architectures complexes.')}
  ${textSection('Années 1990', 'Des technologies déjà proches de l’IA actuelle.', ['Serveurs vocaux, Dialogic, reconnaissance vocale, synthèse vocale, environnements CNET et recherche télécom : ces sujets demandaient déjà de faire dialoguer données, règles métier, interfaces et contraintes d’exploitation.', `Cette expérience nourrit aujourd’hui une approche exigeante de l’IA : cadrer l’intention, contextualiser les données, vérifier les sorties, documenter les limites et intégrer les traitements sans rompre la gouvernance. Elle explique la <a href="/continuite-transformations/">continuité des transformations</a> portée par 2PY.`])}
  ${textSection('Continuité technique', 'La modernité de 2PY ne vient pas d’un effet de mode.', ['Les technologies changent, mais les questions sérieuses demeurent : fiabilité, supervision, capacité à expliquer un résultat, robustesse des processus et continuité d’exploitation.', `C’est cette profondeur qui permet d’aborder l’IA documentaire sans opportunisme : comme une extension raisonnée des architectures informationnelles, et non comme une rupture artificielle. Cette logique se prolonge dans l’<a href="/orchestration-ia/">orchestration IA</a>.`])}
  <section class="section soft"><div class="wrap">${cards([
    ['Reconnaissance vocale', 'Comprendre des signaux, des intentions et des contextes avant l’ère des assistants génératifs.'],
    ['Synthèse vocale', 'Transformer une information structurée en interaction utile et contrôlée.'],
    ['Architectures télécoms', 'Concevoir des systèmes continus, robustes et exploités dans le temps.'],
    ['IA documentaire', 'Appliquer classification, extraction et recherche augmentée dans des workflows auditables.'],
  ])}</div></section>`,
}))

pages.set('/expertise-documentaire/', layout({
  title: 'Expertise documentaire, workflows métier et gouvernance des flux',
  description: 'Workflows, indexation, validation, archivage et gouvernance documentaire pour structurer les flux métier et préparer les usages IA.',
  path: '/expertise-documentaire/',
  body: `${compactHero('Expertise documentaire', 'Organiser les documents comme des flux métier, pas comme de simples fichiers.', '2PY intervient sur les circuits de validation, l’indexation, l’archivage, la gouvernance documentaire et les usages clients.')}
  ${textSection('Gouvernance informationnelle', 'La qualité documentaire conditionne la qualité des décisions.', ['Un document n’a de valeur opérationnelle que s’il est correctement classé, contextualisé, retrouvé, validé et conservé. La GED n’est donc pas seulement un outil de stockage : elle matérialise une organisation du travail.', `2PY traite les documents comme des objets de responsabilité : droits, versions, cycles de vie, validations, traces et règles métier doivent former un ensemble cohérent. Cette base documentaire conditionne ensuite la qualité des usages d’<a href="/ia-appliquee/">IA appliquée</a> et la robustesse des <a href="/realisations-metier/">réalisations métier</a>.`])}
  <section class="section"><div class="wrap">${cards([
    ['Workflows', 'Valider, relancer, tracer, déléguer et auditer les étapes documentaires.'],
    ['Indexation', 'Structurer les dossiers par métadonnées, règles métier et plans de classement.'],
    ['Archivage', 'Définir conservation, accès, consultation, preuve et réversibilité.'],
    ['Offshore documentaire', 'Organiser les échanges et contrôles dans des flux distribués.'],
    ['GED métier', 'Adapter l’outil aux usages réels : cabinet/client, RH, qualité, juridique, multi-sites.'],
    ['Gouvernance', 'Clarifier responsabilités, droits, niveaux de validation et règles d’exploitation.'],
  ], 'three')}</div></section>`,
}))

pages.set('/infrastructure-souveraine/', layout({
  title: 'Infrastructure souveraine, sécurité documentaire et continuité d’activité',
  description: 'Hébergement maîtrisé, sécurité, sauvegardes, PRA/PCA et continuité pour protéger les documents, les accès et les traitements IA.',
  path: '/infrastructure-souveraine/',
  body: `${compactHero('Infrastructure souveraine', 'Les documents sensibles exigent plus qu’une interface.', 'Hébergement, sauvegardes, virtualisation, sécurité, PRA/PCA et continuité d’activité font partie de l’architecture documentaire.')}
  ${textSection('Robustesse', 'La souveraineté commence par la maîtrise opérationnelle.', ['La dépendance technologique ne se mesure pas seulement au choix d’un hébergeur. Elle se lit dans la capacité à contrôler les accès, restaurer les données, documenter les procédures et maintenir une activité en situation dégradée.', `Pour 2PY, l’infrastructure n’est pas un arrière-plan technique : elle fait partie de la confiance documentaire, au même titre que la traçabilité ou la qualité d’indexation. Certaines architectures hybrides intègrent désormais des traitements d’<a href="/ia-appliquee/">IA appliquée</a> ou des <a href="/realisations-metier/">réalisations métier</a> maintenues dans la durée.`])}
  <section class="section soft"><div class="wrap">${cards([
    ['Hébergement maîtrisé', 'Localisation, responsabilités, accès, supervision et exploitation.'],
    ['Sauvegardes', 'Procédures, restauration, fréquence, tests et traçabilité.'],
    ['PRA / PCA', 'Scénarios de reprise et continuité adaptés à la criticité des flux.'],
    ['Sécurité', 'Droits, segmentation, journaux, confidentialité et maîtrise des accès.'],
  ])}</div></section>`,
}))

pages.set('/ia-appliquee/', layout({
  title: 'IA appliquée, gouvernance documentaire et auditabilité des traitements',
  description: 'IA appliquée aux documents : classification, extraction, recherche augmentée, gouvernance, auditabilité et maîtrise économique des traitements.',
  path: '/ia-appliquee/',
  body: `${compactHero('IA appliquée', 'Une IA utile seulement si elle reste explicable, contrôlée et auditée.', 'L’intelligence artificielle n’a de valeur que lorsqu’elle s’inscrit dans des processus maîtrisés, documentés et gouvernés. 2PY l’aborde comme une couche cognitive articulée aux flux, jamais comme une boîte noire autonome.')}
  ${textSection('Gouvernance des usages', 'Transformer une capacité technique en responsabilité maîtrisée.', [`L’IA peut accélérer la lecture, le classement, l’extraction ou la recherche. Mais elle introduit aussi des risques : erreurs plausibles, dépendance cognitive, dilution de la responsabilité, perte de contexte ou confusion entre suggestion et décision. Les problématiques d’<a href="/expertise-documentaire/">expertise documentaire</a> restent donc centrales.`, 'L’enjeu n’est donc pas d’ajouter de l’IA partout. Il est de définir où elle crée une valeur vérifiable, comment elle reste supervisée, et quelles traces permettent de comprendre, contester ou corriger un résultat.', `Une intégration sérieuse suppose également une architecture des flux, une maîtrise des contextes, une gouvernance des usages et une optimisation continue des coûts de traitement, avec une <a href="/orchestration-ia/">orchestration IA</a> adaptée.`], ['Approfondir l’orchestration IA', '/orchestration-ia/'])}
  <section class="section"><div class="wrap">${cards([
    ['Ingénierie des consignes', 'Transformer une intention métier en instructions structurées, testables et auditables.'],
    ['Classification', 'Respecter les logiques documentaires, les règles métier et les contraintes de validation humaine.'],
    ['Extraction', 'Identifier les données utiles sans confondre automatisation et décision : le contrôle reste explicite.'],
    ['Recherche augmentée', 'Retrouver par le sens, le contexte et les métadonnées, sans effacer la source documentaire.'],
    ['Auditabilité', 'Conserver la trace des traitements, décisions, validations et limites connues.'],
    ['Hybridation homme/machine', 'Faire travailler l’IA comme assistance contrôlée, avec supervision et responsabilité humaines.'],
  ], 'three')}</div></section>
  <section class="section soft"><div class="wrap split compact"><div><p class="eyebrow">IA, usages et impacts</p><h2>Comprendre les effets de l’IA sur les métiers et les décisions.</h2><div class="richtext"><p>L’intelligence artificielle ne transforme pas seulement les outils. Elle modifie les méthodes de travail, les processus de décision, la relation aux documents et parfois les équilibres cognitifs eux-mêmes.</p><p>2PY aborde ces sujets avec une exigence d’ingénierie : comprendre les usages, maîtriser les risques et intégrer l’IA dans des cadres explicables, vérifiables et gouvernés.</p></div></div><div class="resource-links"><a class="resource-card" href="/cas-usages.html"><strong>Cas d’usage IA par métier →</strong><span>Exemples d’intégration de l’intelligence artificielle dans des contextes professionnels réels : analyse documentaire, automatisation raisonnée, assistance métier, recherche augmentée et aide à la décision.</span><em>Explorer les cas d’usage</em></a><a class="resource-card" href="/ia-atrophie-cognitive.html"><strong>IA et atrophie cognitive →</strong><span>Réflexion sur les effets cognitifs, organisationnels et décisionnels liés aux usages intensifs de l’intelligence artificielle, avec une attention particulière à la supervision humaine et à la responsabilité.</span><em>Lire l’analyse</em></a></div></div></section>`,
}))

pages.set('/orchestration-ia/', layout({
  title: 'Orchestration IA, pilotage des API et optimisation des architectures de traitement',
  description: 'Architecture multi-modèles, pilotage des API IA, gouvernance des flux, arbitrage qualité/coût et optimisation des traitements.',
  path: '/orchestration-ia/',
  body: `${compactHero('Orchestration IA', 'Concevoir des chaînes IA robustes, gouvernées et économiquement maîtrisées.', '2PY ne se limite pas à l’usage de modèles génératifs. L’enjeu est de construire des architectures capables d’orchestrer plusieurs API, plusieurs modèles et plusieurs niveaux de traitement, avec supervision humaine, contrôle des coûts et qualité documentaire des entrées.')}
  ${textSection('Architecture raisonnée', 'L’IA sérieuse commence avant l’appel au modèle.', ['Certaines architectures nécessitent aujourd’hui d’orchestrer plusieurs modèles et plusieurs fournisseurs afin d’obtenir un équilibre pertinent entre qualité, coût, rapidité et profondeur de traitement.', `Le travail porte sur la structuration des contextes, la hiérarchisation des traitements, le choix des modèles, la qualité des données d’entrée, les règles de reprise et les traces de supervision. Il prolonge la <a href="/continuite-transformations/">continuité technologique</a> de 2PY et dépend de la qualité documentaire initiale.`, 'Sans ingénierie, les usages IA peuvent devenir coûteux, peu fiables et difficiles à gouverner. Une architecture correctement pensée permet souvent d’obtenir de meilleurs résultats avec des coûts fortement réduits.'])}
  <section class="section soft"><div class="wrap">${cards([
    ['Orchestration API', 'Piloter plusieurs fournisseurs et modèles selon le besoin réel : synthèse, extraction, raisonnement, contrôle ou reformulation.'],
    ['Architecture multi-LLM', 'Réserver les modèles puissants aux traitements qui les justifient et confier les tâches simples à des chaînes plus sobres.'],
    ['Maîtrise des consommations', 'Maîtriser les contextes transmis, réduire le bruit documentaire et limiter les appels inutiles sans dégrader la qualité.'],
    ['Gouvernance des flux', 'Tracer les traitements, définir les responsabilités, documenter les limites et organiser la supervision humaine.'],
    ['Chaînes hybrides', 'Combiner règles métier, recherche documentaire, scripts, API et validation humaine plutôt que tout déléguer à un modèle unique.'],
    ['Industrialisation raisonnée', 'Passer du prototype utile à une chaîne robuste, maintenable, mesurable et alignée sur les contraintes économiques.'],
  ], 'three')}</div></section>
  ${textSection('Maîtrise économique', 'Réduire le coût sans réduire l’exigence.', ['L’ingénierie des usages IA implique une maîtrise fine des coûts de traitement, des contextes transmis et des arbitrages entre modèles.', `Cette approche prolonge naturellement l’expérience documentaire et infrastructurelle de 2PY : comprendre les flux, qualifier les contraintes, sécuriser l’exploitation et maintenir une architecture dans le temps. Elle suppose aussi une <a href="/expertise-documentaire/">qualité documentaire</a> suffisante en amont.`], ['Relier à la continuité des transformations', '/continuite-transformations/'])}`,
}))

pages.set('/formations-ia/', layout({
  title: 'Formations IA et accompagnement des usages professionnels',
  description: '2PY oriente les demandes de formations IA, acculturation, accompagnement dirigeants et usages métier vers Patrick Pécot.',
  path: '/formations-ia/',
  body: `${compactHero('Formations IA', 'Pour former, acculturer et accompagner les équipes, 2PY renvoie vers Patrick Pécot.', '2PY porte l’ingénierie documentaire, l’infrastructure et l’orchestration IA. Pour les formations, l’acculturation dirigeants, l’accompagnement des équipes et la montée en compétence aux usages IA, le point d’entrée dédié est le site de Patrick Pécot.')}
  ${textSection('Complémentarité', 'Une même culture d’ingénierie, deux points d’entrée lisibles.', ['Les sujets d’architecture documentaire, de souveraineté, d’orchestration technique et de développement métier relèvent de 2PY.', 'Les sujets de formation IA, d’acculturation, d’accompagnement opérationnel des dirigeants, managers et équipes métier sont orientés vers Patrick Pécot, avec une pédagogie adaptée aux usages réels.', 'Cette articulation évite de mélanger conseil technique, infrastructure et formation : chaque besoin est orienté vers le bon cadre d’intervention.'], ['Accéder au site Patrick Pécot', 'https://www.patrick.pecot.eu/'])}
  <section class="section soft"><div class="wrap"><p class="eyebrow">Orientations</p><h2>Quand aller vers Patrick Pécot.</h2>${cards([
    ['Formations IA entreprise', 'Acculturation, prompt engineering, usages métiers, cadres de vigilance et adoption progressive.', 'https://www.patrick.pecot.eu/formations.html'],
    ['Accompagnement dirigeants et managers', 'Clarifier les opportunités, prioriser les cas d’usage et structurer une montée en compétence responsable.', 'https://www.patrick.pecot.eu/profil.html'],
    ['Ateliers et interventions', 'Formats courts ou parcours adaptés à un contexte métier, une équipe ou une organisation.', 'https://www.patrick.pecot.eu/interventions.html'],
    ['Diagnostic et contact', 'Qualifier une demande de formation IA ou d’accompagnement avant de définir le format utile.', 'https://www.patrick.pecot.eu/diagnostic.html'],
  ])}</div></section>
  <section class="section cta"><div class="wrap"><h2>Besoin de former ou accompagner vos équipes à l’IA ?</h2><p>Le site Patrick Pécot est le point d’entrée dédié pour les formations et accompagnements IA.</p><a class="btn primary" href="https://www.patrick.pecot.eu/formations.html">Voir les formations IA</a></div></section>`,
}))

pages.set('/realisations-metier/', layout({
  title: 'Réalisations métier, GED documentaire et développement durable',
  description: 'GEDeasy, Dokee et réalisations métier : workflows documentaires, architecture logicielle, intégration, modernisation et continuité.',
  path: '/realisations-metier/',
  body: `${compactHero('Réalisations métier', 'Des logiciels conçus pour des flux documentaires réels.', 'GEDeasy / Dokee est une illustration du savoir-faire 2PY : développer, maintenir et faire évoluer des applications métier dans la durée.')}
  ${textSection('GEDeasy / Dokee', 'Une preuve de capacité logicielle, pas une réduction de l’identité 2PY.', [`GEDeasy puis Dokee traduisent une expérience documentaire concrète : validation, indexation, classement, consultation, traçabilité, archivage et exploitation des documents. Cette réalisation s’appuie sur l’<a href="/expertise-documentaire/">expertise documentaire</a> de 2PY.`, 'La réalisation montre surtout que 2PY sait concevoir une architecture métier, la maintenir, la moderniser et l’adapter aux contraintes terrain, sans transformer le site en catalogue produit.'], ['Voir GEDeasy / Dokee', '/dokee/'])}
  <section class="section soft"><div class="wrap">${cards([
    ['Architecture métier', 'Modéliser des processus et les transformer en application exploitable.'],
    ['Développement durable', 'Maintenir, moderniser et documenter plutôt que remplacer sans nécessité.'],
    ['Intégration', 'Faire dialoguer données, accès, documents, validations et systèmes existants.'],
  ], 'three')}</div></section>`,
}))

pages.set('/references-historiques/', layout({
  title: 'Références historiques, confiance client et environnements sensibles',
  description: 'Références historiques 2PY : continuité client, transformations documentaires, robustesse, gouvernance et environnements sensibles.',
  path: '/references-historiques/',
  body: `${compactHero('Références historiques', 'Des références qui disent la durée, la confiance et le niveau d’exigence.', 'Certaines références présentes sur le site témoignent de relations construites dans la durée, parfois au travers de plusieurs évolutions technologiques, documentaires, infrastructurelles et organisationnelles.')}
  <section class="section dark"><div class="wrap">${logoCarousel(false)}</div></section>
  <section class="section"><div class="wrap split"><div><p class="eyebrow">Lecture des références</p><h2>Des logos à replacer dans des contextes de confiance.</h2><a class="text-link" href="/continuite-transformations/">Comprendre la continuité</a></div><div class="richtext"><p>Les références historiques ne sont pas présentées comme des ornements. Elles indiquent des environnements dans lesquels la fiabilité, la confidentialité, la traçabilité, la fidélité et la continuité de service comptent durablement.</p><p>2PY décrit ces références par typologies de besoins, sans exposer d’informations confidentielles ni de détails opérationnels sensibles. Elles éclairent la <a href="/continuite-transformations/">continuité des transformations</a>, les <a href="/realisations-metier/">réalisations métier</a> construites dans le temps et l’adaptation progressive aux usages IA gouvernés.</p></div></div></section>
  <section class="section soft"><div class="wrap">${contextBlocks([
    ['Grands comptes et finance', 'La relation se construit d’abord sur les flux documentaires, la validation, l’archivage, la sécurité et la traçabilité.', 'Elle se prolonge vers la gouvernance documentaire augmentée, l’auditabilité IA et la maîtrise économique des traitements.'],
    ['Industrie et organisations distribuées', 'Les besoins initiaux portent sur les infrastructures, les accès, les sauvegardes et la continuité d’exploitation.', 'Les mêmes contraintes conduisent aujourd’hui vers la recherche augmentée, la supervision des traitements et l’orchestration multi-modèles.'],
    ['Métiers réglementés', 'Les dossiers sensibles imposent cycles de vie, responsabilités, preuves, confidentialité et régularité d’exploitation.', 'Les chaînes automatisées ajoutent qualité des entrées, contrôle humain, règles de reprise et traçabilité des traitements.'],
  ])}</div></section>`,
}))

pages.set("/dokee/", layout({
  title: "Dokee - Plateforme comptable",
  description: "Dokee: production comptable en continu, workflows, pieces tracees, ecritures garanties.",
  path: "/dokee/",
  body: "<section class=\"page-head\"><div class=\"wrap\"><p class=\"eyebrow\">Dokee</p><h1>Plateforme de production comptable</h1><p class=\"lead\">Dokee connecte l’entreprise, son expert-comptable et l’ecosysteme. De la collecte des pieces a la restitution, automatisation et securisation completes.</p></div></section><section class=\"section\"><div class=\"wrap\"><p class=\"eyebrow\">Chaine</p><h2>De la piece a l’ecriture</h2><div style=\"margin:2rem 0;padding:2rem;background:#f5f5f5;border-radius:0.5rem;font-family:monospace;text-align:center;\">Piece → Lecture IA → Gabarit → Brouillon → Validation → Controle IA → Ecriture</div></div></section><section class=\"section soft\"><div class=\"wrap\"><p class=\"eyebrow\">Six principes</p><h2>Fondements</h2><div class=\"card-grid three\"><article class=\"card\"><h3>IA ne decide pas</h3><p>Responsabilite humaine. IA assiste a lire, controler, verifier.</p></article><article class=\"card\"><h3>Tout est regle</h3><p>Imputations basees sur regles publiees, testees et tracees.</p></article><article class=\"card\"><h3>Tracabilite totale</h3><p>Chaque decision, controle et modification enregistre.</p></article><article class=\"card\"><h3>Tests reels</h3><p>Regles validees sur pieces reelles de moins de 90 jours.</p></article><article class=\"card\"><h3>Pas de simulation</h3><p>Ecritures par application regles, jamais par calcul.</p></article><article class=\"card\"><h3>Responsabilite humaine</h3><p>Expert comptable comprend et verifie tous choix.</p></article></div></div></section><section class=\"section\"><div class=\"wrap\"><p class=\"eyebrow\">Analyses</p><h2>Six regards sur la vie financiere</h2><div class=\"card-grid three\"><article class=\"card\"><h3>Performance</h3><p>Chiffre affaires, EBE, rentabilite, evolution.</p></article><article class=\"card\"><h3>Depenses</h3><p>Charges fixes, variables, recurrentes.</p></article><article class=\"card\"><h3>Tresorerie</h3><p>Liquidites et decaissements.</p></article><article class=\"card\"><h3>Echeances</h3><p>TVA, charges sociales, fiscales.</p></article><article class=\"card\"><h3>Evolution</h3><p>Progression ou degradation.</p></article><article class=\"card\"><h3>Decisions</h3><p>Consequences des decisions.</p></article></div></div></section><section class=\"section soft\"><div class=\"wrap\"><p class=\"eyebrow\">Capacites</p><h2>Architecture comptable fiable</h2><div class=\"card-grid three\"><article class=\"card\"><h3>Traitement continu</h3><p>Pieces dans workflows, lues par IA, imputees selon regles.</p></article><article class=\"card\"><h3>Workflows</h3><p>Circuits parametrables, statuts explicites, responsabilites.</p></article><article class=\"card\"><h3>Indexation</h3><p>Metadonnees structurees, plans de classement.</p></article><article class=\"card\"><h3>Controles</h3><p>Equilibrage partie double, rapprochements.</p></article><article class=\"card\"><h3>Ecritures</h3><p>Generees par application regles, reproductibles.</p></article><article class=\"card\"><h3>Analyses</h3><p>Six regards decisionnels chaque periode.</p></article></div></div></section><section class=\"section cta\"><div class=\"wrap\"><h2>Dokee transforme la comptabilite en processus continu</h2><p>Plateforme pour cabinets expertise comptable qui cherchent securite et optimisation.</p><a class=\"btn primary\" href=\"/contact/\">Prendre contact</a></div></section>",
}))

pages.set('/solutions/', layout({
  title: 'Contextes métier, GED, workflows et usages IA par organisation',
  description: 'Contextes métier 2PY : cabinets, PME, RH, offshore documentaire, workflows, accès, gouvernance, sécurité et automatisation IA.',
  path: '/solutions/',
  body: `${compactHero('Contextes métier', 'Adapter l’ingénierie documentaire aux usages réels.', 'Les organisations n’ont pas toutes les mêmes flux, les mêmes risques ni les mêmes contraintes de validation. 2PY qualifie d’abord le contexte métier avant de proposer une architecture documentaire, logicielle, infrastructurelle ou IA.')}
  ${textSection('Qualification', 'Une réponse sérieuse commence par la compréhension des flux.', ['Un cabinet comptable, une PME multi-sites, une équipe RH ou une organisation de traitement documentaire ne partagent pas les mêmes cycles de vie, niveaux de confidentialité, volumes, délais ni responsabilités.', 'Cette page rassemble les grands contextes dans lesquels l’ingénierie 2PY peut intervenir : structuration documentaire, accès, workflows, sécurité, modernisation logicielle et automatisation raisonnée.'])}
  <section class="section soft"><div class="wrap">${cards([
    ['Cabinets comptables', 'Échanges cabinet/client, dossiers permanents, circuits de validation, traçabilité et archivage.'],
    ['PME / ETI', 'Organisation documentaire, multi-sites, droits d’accès, intégration progressive et robustesse des processus.'],
    ['RH', 'Documents sensibles, confidentialité, cycles de vie, consultation contrôlée et conservation.'],
    ['Offshore documentaire', 'Répartition des traitements, contrôle qualité, règles de validation et suivi des responsabilités.'],
  ])}</div></section>`,
}))

pages.set('/contact/', layout({
  title: 'Contact 2PY, audit documentaire, infrastructure et orchestration IA',
  description: 'Contacter 2PY pour un audit documentaire, une infrastructure maîtrisée, une modernisation métier ou une orchestration IA gouvernée.',
  path: '/contact/',
  body: `<section class="section contact"><div class="wrap split"><div><p class="eyebrow">Contact</p><h1>Qualifier un sujet avant de proposer une réponse.</h1><p class="lead">Vous pouvez nous solliciter pour qualifier un besoin documentaire, une architecture d’hébergement, une modernisation logicielle ou un usage IA à inscrire dans un cadre maîtrisé.</p><div class="contact-box"><strong>Demandes pertinentes</strong><span>Audit documentaire · hébergement maîtrisé · workflow · logiciel métier · IA appliquée · orchestration IA</span><a href="mailto:contact@2py.fr">contact@2py.fr</a></div></div><form class="form" method="post" action="/contact-handler.php" data-contact-form><input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><label><span>Nom</span><input required name="nom" autocomplete="name" placeholder="Votre nom"></label><label><span>Email professionnel</span><input required type="email" name="email" autocomplete="email" placeholder="nom@entreprise.fr"></label><label><span>Société</span><input required name="societe" autocomplete="organization" placeholder="Votre organisation"></label><label><span>Message</span><textarea required name="message" placeholder="Décrivez brièvement le contexte, les flux concernés et les contraintes à prendre en compte."></textarea></label><label class="check"><input required type="checkbox" name="consentement" value="1"> J’accepte d’être recontacté par 2PY.</label><button class="btn primary" type="submit">Envoyer la demande</button><p class="notice" aria-live="polite"></p></form></div></section>
  <section class="section soft"><div class="wrap"><p class="eyebrow">Typologies de projets</p><h2>Les demandes qualifiées avant tout engagement.</h2>${cards([
    ['Audit documentaire', 'Cartographier les flux, les droits, les circuits de validation, les métadonnées et les risques de rupture documentaire.'],
    ['Modernisation métier', 'Faire évoluer une GED, un workflow ou une application interne sans perdre la continuité d’usage ni la traçabilité.'],
    ['Infrastructure maîtrisée', 'Qualifier hébergement, sauvegardes, PRA/PCA, accès, confidentialité et continuité d’activité.'],
    ['Orchestration IA', 'Cadrer les usages IA, les API, les modèles, les contextes transmis, les coûts de traitement et la supervision humaine.'],
  ])}</div></section>
  ${textSection('Méthode', 'Un échange utile commence par les contraintes réelles.', [`2PY aborde un projet à partir des flux existants : documents, utilisateurs, responsabilités, applications, contraintes d’infrastructure et possibilités d’<a href="/ia-appliquee/">IA appliquée</a>.`, `Cette qualification permet d’orienter le sujet vers une <a href="/expertise-documentaire/">expertise documentaire</a>, une architecture d’<a href="/infrastructure-souveraine/">infrastructure souveraine</a>, une <a href="/orchestration-ia/">orchestration IA</a> ou une modernisation logicielle.`])}`,
}))

pages.set('/cas-usages.html', layout({
  title: 'Cas d’usage IA par métier',
  description: 'Cas d’usage IA par métier, avec exemples d’intégration dans des contextes professionnels réels.',
  path: '/cas-usages.html',
  body: `<section class="section bridge"><div class="wrap bridge-inner"><p class="eyebrow">IA et métiers</p><h1>Cas d’usage IA par métier.</h1><p class="lead">Les usages pertinents de l’IA partent des métiers, des contraintes documentaires, des validations humaines et des décisions à sécuriser. Cette ressource rassemble des exemples d’intégration dans des contextes professionnels réels.</p><div class="actions"><a class="btn primary" href="https://www.patrickpecot.eu/cas-usages.html">Explorer les cas d’usage</a><a class="btn ghost" href="/ia-appliquee/">Retour à l’IA appliquée</a></div></div></section>`,
}))

pages.set('/ia-atrophie-cognitive.html', layout({
  title: 'IA et atrophie cognitive',
  description: 'Analyse des effets cognitifs, organisationnels et décisionnels des usages intensifs de l’intelligence artificielle.',
  path: '/ia-atrophie-cognitive.html',
  body: `<section class="section bridge"><div class="wrap bridge-inner"><p class="eyebrow">IA et discernement</p><h1>L’IA va-t-elle nous rendre moins intelligents ?</h1><p class="lead">Les usages intensifs de l’intelligence artificielle posent une question centrale : comment préserver la capacité de jugement, la lecture critique, la supervision humaine et la responsabilité dans les décisions professionnelles ?</p><div class="actions"><a class="btn primary" href="https://www.patrickpecot.eu/ia-atrophie-cognitive.html">Lire l’analyse</a><a class="btn ghost" href="/ia-appliquee/">Retour à l’IA appliquée</a></div></div></section>`,
}))

pages.set('/mentions-legales/', layout({
  title: 'Mentions légales',
  description: 'Mentions légales du site 2PY.',
  path: '/mentions-legales/',
  body: `<section class="section"><div class="wrap narrow"><h1>Mentions légales</h1><p class="lead">2PY, société d’ingénierie documentaire et technologique. Les informations administratives complètes doivent être confirmées avant publication définitive.</p></div></section>`,
}))

pages.set('/politique-confidentialite/', layout({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et données personnelles du site 2PY.',
  path: '/politique-confidentialite/',
  body: `<section class="section"><div class="wrap narrow"><h1>Politique de confidentialité</h1><p class="lead">Le site collecte uniquement les informations transmises volontairement via les demandes de contact. Aucune publicité comportementale n’est utilisée.</p></div></section>`,
}))

const aliases = [
  ['/ingenierie-rd/', '/culture-rd/', 'Ingénierie & R&D'],
  ['/expertise/', '/expertise-documentaire/', 'Expertise documentaire'],
  ['/ia-documentaire/', '/ia-appliquee/', 'IA documentaire'],
  ['/realisations/', '/references-historiques/', 'Références'],
]
for (const [path, target, label] of aliases) pages.set(path, aliasPage(path, target, label))

await rm(dist, { recursive: true, force: true })
await mkdir(join(dist, 'assets'), { recursive: true })
await cp(join(root, 'src/styles.css'), join(dist, 'assets/styles.css'))
await cp(join(root, 'src/main.js'), join(dist, 'assets/main.js'))
await cp(join(root, 'src/logos'), join(dist, 'assets/logos'), { recursive: true })
await cp(join(root, 'src/gedeasy'), join(dist, 'assets/gedeasy'), { recursive: true })
await cp(join(root, 'src/contact-handler.php'), join(dist, 'contact-handler.php'))

for (const [path, html] of pages) {
  const file = path.endsWith('.html') ? join(dist, path.slice(1)) : (path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html'))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

const canonicalPages = [...pages.keys()].filter(path => !path.endsWith('.html') && !aliases.some(([alias]) => alias === path))
const urls = canonicalPages.map(path => `<url><loc>https://www.2py.fr${path}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq></url>`).join('')
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`)
await writeFile(join(dist, 'robots.txt'), 'User-Agent: *\nAllow: /\nSitemap: https://www.2py.fr/sitemap.xml\n')
await writeFile(join(dist, 'README_DEPLOIEMENT_LOCAL.md'), '# Serveur local\n\n```bash\ncd site\nnpm run dev\n```\n\nOuvrir http://127.0.0.1:3000\n')

console.log(`Generated ${pages.size} pages in ${dist}`)
console.log(`Prompt inventory: ${promptFiles.join(', ')}`)
