import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Fonctionnalités Dokee',
  description: 'Toutes les fonctionnalités de Dokee : dépôt, indexation, OCR, workflow, archivage, IA.',
  keywords: ['fonctionnalités GED', 'logiciel documentaire', 'dépôt documents'],
  path: '/dokee/fonctionnalites',
})

const groups = {
  'Dépôt & Indexation': ['Dépôt multi-canal', 'Indexation automatique et manuelle', 'OCR intégré', 'Métadonnées configurables', 'Versions et historique'],
  'Workflow & Validation': ['Circuits de validation paramétrables', 'Validation multi-niveaux', 'Escalades et délais', 'Notifications automatiques', 'Signatures électroniques'],
  'Recherche & Consultation': ['Recherche plein texte', 'Recherche sémantique IA', 'Filtres multidimensionnels', 'Aperçu sans téléchargement', 'Liens permanents documents'],
  'Sécurité & Accès': ['Gestion des droits par profil, nature, client', 'Audit trail complet', 'Journalisation des accès', 'Chiffrement au repos et en transit', '2FA disponible'],
  'Archivage & Conformité': ['Plans de classement configurables', 'Durées de conservation légales', 'Archivage normatif', 'Export réglementaire', 'RGPD natif'],
}

export default function FonctionnalitesPage() {
  return (
    <main className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Toutes les fonctionnalités de Dokee</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Object.entries(groups).map(([title, items]) => (
            <section key={title} className="card">
              <h2 className="text-2xl font-black text-ink">{title}</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">{items.map(item => <li key={item}>✓ {item}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
