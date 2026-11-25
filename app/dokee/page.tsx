import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Dokee – Plateforme comptable et documentaire intégrée',
  description: 'Dokee connecte l\'entreprise, son expert-comptable et l\'écosystème de facturation électronique. De la collecte des pièces à la production comptable, automatisée et intelligente.',
  keywords: ['plateforme comptable', 'production comptable', 'facturation électronique', 'expertise comptable', 'traitement comptable'],
  path: '/dokee',
})

const analyses = [
  { title: 'Performance', description: 'Comprendre la performance réelle de son activité : chiffre d\'affaires, EBE, rentabilité, évolution' },
  { title: 'Dépenses', description: 'Identifier où part l\'argent : charges fixes, variables, récurrentes, engagements à venir' },
  { title: 'Trésorerie', description: 'Anticiper les liquidités disponibles et les décaissements obligatoires' },
  { title: 'Échéances', description: 'Prévoir les sommes à décaisser : TVA, charges sociales, fiscales' },
  { title: 'Évolution', description: 'Mesurer ce qui progresse ou se dégrade dans l\'activité' },
  { title: 'Décisions', description: 'Simuler les conséquences d\'une décision envisagée' },
]

const capabilities = [
  'Traitement continu des pièces comptables',
  'Gestion de workflows de validation paramétrables',
  'Indexation et classification automatiques',
  'Contrôles et conformité comptables',
  'Production d\'écritures fiabilisées et traçables',
  'Analyses périodiques et à échéances',
  'Collaboration cabinet ↔ clients',
  'Conformité facturation électronique',
  'Audit trail complet et sécurité',
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
            <p className="text-xl text-muted font-semibold">
              La plateforme qui connecte l'entreprise, son expert-comptable et l'écosystème numérique de la facturation.
            </p>
          </div>
          <p className="text-lg leading-relaxed text-muted max-w-3xl">
            Dokee est une suite applicative complète dédiée à la production comptable et à la gestion documentaire collaborative. De la collecte des pièces jusqu'à la restitution des comptes, Dokee automatise et sécurise l'ensemble de la chaîne de traitement comptable tout en renforçant la collaboration entre les entreprises et leurs experts-comptables.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/dokee/demonstration" className="btn primary">Demander une démo</a>
            <a href="/dokee/fonctionnalites" className="btn ghost">Fonctionnalités</a>
          </div>
        </div>
      </section>

      {/* Production Comptable */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Production comptable en continu</h2>
          <p className="text-lg text-muted mb-12 max-w-3xl">
            Dokee traite chaque pièce dans son workflow, la contrôle, l'impute et l'intègre à la comptabilité. Les données comptables sont actualisées en permanence.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability} className="card">
                <div className="flex gap-3">
                  <span className="text-2py-600 font-bold text-xl flex-shrink-0">✓</span>
                  <p className="font-semibold text-ink">{capability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analyses */}
      <section className="bg-2py-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Analyses pour la décision</h2>
          <p className="text-lg text-muted mb-12 max-w-3xl">
            Exploitez la richesse des données comptables pour éclairer les décisions du dirigeant, au bon moment.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analyses.map((analysis) => (
              <div key={analysis.title} className="card bg-white">
                <h3 className="text-lg font-bold text-ink mb-2">{analysis.title}</h3>
                <p className="text-sm text-muted">{analysis.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Bénéfices pour tous</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="space-y-4">
              <div className="text-4xl">🏢</div>
              <h3 className="text-xl font-bold text-ink">Pour les cabinets comptables</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>✓ Productivité accrue</li>
                <li>✓ Réduction des tâches manuelles</li>
                <li>✓ Meilleure collaboration avec les clients</li>
                <li>✓ Vision temps réel de chaque dossier</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🏛️</div>
              <h3 className="text-xl font-bold text-ink">Pour les entreprises</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>✓ Comptabilité actualisée en continu</li>
                <li>✓ Traçabilité complète des traitements</li>
                <li>✓ Analyses régulières de performance</li>
                <li>✓ Conformité automatisée</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🔗</div>
              <h3 className="text-xl font-bold text-ink">Pour l'écosystème</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>✓ Intégration PDP/PA native</li>
                <li>✓ Facturation électronique fluidifiée</li>
                <li>✓ Conformité réglementaire assurée</li>
                <li>✓ Interopérabilité documentaire</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-2py-600 to-2py-700 px-6 py-20 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-black md:text-4xl">
            Dokee transforme la comptabilité en un processus numérique continu, collaboratif et intelligent.
          </h2>
          <p className="text-lg opacity-90">
            Une plateforme conçue pour les cabinets d'expertise comptable et les entreprises qui cherchent à sécuriser, automatiser et optimiser leur production comptable.
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

      {/* Navigation */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Découvrir davantage</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a href="/dokee/fonctionnalites" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Fonctionnalités</h3>
              <p className="mt-2 text-sm text-muted">Workflow, indexation, contrôles, archivage</p>
            </a>
            <a href="/dokee/workflow" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Workflows</h3>
              <p className="mt-2 text-sm text-muted">Circuits de validation et contrôles paramétrables</p>
            </a>
            <a href="/dokee/ia-documentaire" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Intelligence</h3>
              <p className="mt-2 text-sm text-muted">IA pour classification et extraction</p>
            </a>
            <a href="/dokee/securite" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-ink">Sécurité</h3>
              <p className="mt-2 text-sm text-muted">Conformité, audit et gouvernance</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
