import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Sécurité Dokee — Hébergement France RGPD',
  description: 'Dokee hébergé en France. Chiffrement AES-256, audit trail, RGPD natif.',
  keywords: ['sécurité documentaire', 'RGPD documents', 'hébergement France données'],
  path: '/dokee/securite',
})

const pillars = ['Hébergement souverain France', 'Chiffrement bout en bout', 'Gestion des accès', 'Audit trail', 'RGPD', 'Disponibilité']

export default function SecuritePage() {
  return (
    <main>
      <section className="bg-2py-900 px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black md:text-6xl">Sécurité et conformité Dokee</h1>
          <div className="mt-8 flex flex-wrap gap-3">{['Hébergement France', 'RGPD natif', 'Chiffrement AES-256', 'Audit trail complet'].map(v => <span key={v} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{v}</span>)}</div>
        </div>
      </section>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {pillars.map(p => <article key={p} className="card"><h2 className="font-black text-ink">{p}</h2><p className="mt-3 text-sm leading-6 text-muted">Dokee applique une approche documentée, traçable et conforme aux exigences des organisations sensibles.</p></article>)}
        </div>
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {['Où sont hébergées mes données ?', 'Qui peut accéder à mes documents ?', 'Comment est gérée la conformité RGPD ?', 'Que se passe-t-il en cas de panne ?'].map(q => <details key={q} className="rounded-card border border-slate-100 p-5"><summary className="cursor-pointer font-black text-ink">{q}</summary><p className="mt-3 text-sm text-muted">La réponse dépend de votre contexte, mais Dokee privilégie hébergement France, droits granulaires, sauvegardes et traçabilité complète.</p></details>)}
        </div>
      </section>
    </main>
  )
}
