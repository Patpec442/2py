import DemoForm from '@/components/DemoForm'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Demander une démonstration Dokee',
  description: "Découvrez Dokee en 45 minutes sur votre cas d'usage. Sans engagement.",
  keywords: ['démonstration GED', 'essai plateforme documentaire'],
  path: '/dokee/demonstration',
})

export default function DemonstrationPage() {
  return (
    <main className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Voir Dokee en action</h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.8fr]">
          <DemoForm />
          <aside className="space-y-5">
            {['Réponse sous 24h ouvrées', "Démonstration sur votre cas d'usage réel", 'Sans engagement — sur 45 minutes'].map(v => <div key={v} className="card font-bold text-ink">{v}</div>)}
            {['Interface principale', 'Workflow validation', 'Recherche sémantique'].map(v => <div key={v} className="aspect-video rounded-card bg-2py-50 p-5 font-black text-2py-700">{v}</div>)}
          </aside>
        </div>
      </div>
    </main>
  )
}
