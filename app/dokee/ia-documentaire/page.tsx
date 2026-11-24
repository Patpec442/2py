import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'IA documentaire Dokee',
  description: 'OCR intelligent, classification IA, recherche sémantique intégrés dans Dokee.',
  keywords: ['IA documentaire', 'OCR intelligent', 'classification automatique documents'],
  path: '/dokee/ia-documentaire',
})

const caps = ['OCR intelligent', 'Classification automatique', 'Recherche sémantique', 'Extraction de données', 'Détection de doublons', 'Agents IA métier']

export default function DokeeIAPage() {
  return (
    <main className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">IA documentaire intégrée dans Dokee</h1>
        <p className="mt-5 section-sub">Dokee n'ajoute pas l'IA comme un gadget. Elle est native dans les traitements documentaires — là où elle crée une valeur mesurable.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">{caps.map(c => <article key={c} className="card"><h2 className="font-black text-2py-600">{c}</h2><p className="mt-2 text-sm leading-6 text-muted">Capacité intégrée aux flux documentaires, avec contrôle métier et traçabilité.</p></article>)}</div>
        <div className="mt-12 rounded-xl bg-2py-50 p-8">
          <h2 className="text-2xl font-black text-ink">Cas d'usage facture</h2>
          <p className="mt-4 text-muted">Réception → OCR → extraction montant/fournisseur → classification → envoi workflow comptable.</p>
        </div>
      </div>
    </main>
  )
}
