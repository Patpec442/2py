import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Dokee – Plateforme comptable et documentaire intégrée',
  description: 'Dokee connecte l\'entreprise, son expert-comptable et l\'écosystème de facturation électronique. De la collecte des pièces à la production comptable, automatisée et intelligente.',
  keywords: ['plateforme comptable', 'GED comptable', 'facturation électronique', 'production comptable', 'IA documentaire'],
  path: '/dokee',
})

const keyBenefits = [
  { title: 'Collecter', description: 'Centraliser les pièces comptables de tous les canaux' },
  { title: 'Automatiser', description: 'Traitements et contrôles intelligents, sans intervention manuelle' },
  { title: 'Produire', description: 'Écritures comptables fiabilisées et traçables' },
  { title: 'Collaborer', description: 'Échanges sécurisés entre cabinet et clients' },
  { title: 'Gouverner', description: 'Traçabilité complète et conformité réglementaire' },
  { title: 'Innover', description: 'IA appliquée pour accélérer les traitements' },
]

const useCases = [
  {
    title: 'Pour les cabinets comptables',
    description: 'Produktivité accrue, réduction des tâches manuelles, meilleure collaboration avec les clients, vision temps réel de l\'activité comptable.',
    icon: '📊',
  },
  {
    title: 'Pour les entreprises',
    description: 'Flux documentaires sécurisés, conformité avec la réforme de la facturation électronique, réduction des délais de traitement.',
    icon: '🏢',
  },
  {
    title: 'Pour l\'écosystème',
    description: 'Intégration native avec les plateformes de dématérialisation (PDP/PA), accès aux flux de facturation électronique.',
    icon: '🔗',
  },
]

export default function DokeePage() {
  return (
    <main className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-2py-50 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-black leading-tight text-ink md:text-5xl">
              Dokee
            </h1>
            <p className="text-xl text-muted">
              <strong>La plateforme qui connecte l'entreprise, son expert-comptable et l'écosystème numérique de la facturation.</strong>
            </p>
          </div>
          <p className="text-lg leading-relaxed text-muted max-w-3xl">
            Dokee est une suite applicative complète dédiée à la production comptable et à la gestion documentaire collaborative. De la collecte des pièces jusqu'à la restitution des comptes, Dokee automatise et sécurise l'ensemble de la chaîne de traitement comptable tout en renforçant la collaboration entre les entreprises et leurs experts-comptables.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/dokee/demonstration" className="btn primary">Demander une démo</a>
            <a href="/dokee/fonctionnalites" className="btn ghost">Découvrir les fonctionnalités</a>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Une plateforme unique pour</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {keyBenefits.map((benefit) => (
              <div key={benefit.title} className="card">
                <h3 className="text-xl font-bold text-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Automation Advantage */}
      <section className="bg-2py-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="section-title">Grâce à l'intelligence artificielle</h2>
            <p className="mt-4 text-lg text-muted">
              Dokee transforme les flux documentaires en données exploitables, fiabilisées et immédiatement mobilisables.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              'Indexation et extraction de données automatisées',
              'Classification intelligente des documents',
              'Détection d\'anomalies et propositions de correction',
              'Accélération des traitements répétitifs',
              'Réduction des erreurs manuelles',
            ].map((feature) => (
              <li key={feature} className="flex gap-3 text-muted">
                <span className="text-2py-600 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Les bénéfices</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              'Productivité accrue des cabinets',
              'Réduction des tâches manuelles',
              'Collaboration renforcée avec les clients',
              'Sécurisation des flux documentaires',
              'Conformité avec la réforme de la facturation électronique',
              'Vision temps réel de l\'activité comptable',
            ].map((benefit) => (
              <div key={benefit} className="card border-l-4 border-2py-600">
                <p className="font-bold text-ink">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Adapté à vos usages</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="space-y-4">
                <div className="text-4xl">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-ink">{useCase.title}</h3>
                <p className="text-sm text-muted">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-2py-600 to-2py-700 px-6 py-20 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">
              Dokee transforme la comptabilité en un processus numérique continu, collaboratif et intelligent.
            </h2>
          </div>
          <p className="text-lg opacity-90">
            Une plateforme conçue pour les organisations exigeantes qui cherchent à sécuriser, automatiser et optimiser leur production comptable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/dokee/demonstration" className="btn primary bg-white text-2py-700 hover:bg-2py-50">
              Demander une démonstration
            </a>
            <a href="/contact/" className="btn ghost border-white text-white hover:bg-white/10">
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Key Pages Navigation */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Découvrir davantage</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a href="/dokee/fonctionnalites" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Fonctionnalités</h3>
              <p className="mt-2 text-sm text-muted">Dépôt, workflow, recherche, sécurité, archivage et IA</p>
            </a>
            <a href="/dokee/workflow" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Workflows</h3>
              <p className="mt-2 text-sm text-muted">Circuits de validation paramétrables et maîtrisés</p>
            </a>
            <a href="/dokee/ia-documentaire" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">IA Documentaire</h3>
              <p className="mt-2 text-sm text-muted">Extraction, classification et analyse intelligentes</p>
            </a>
            <a href="/dokee/securite" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Sécurité</h3>
              <p className="mt-2 text-sm text-muted">Conformité, audit trail et gouvernance</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
