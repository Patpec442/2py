import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Workflow documentaire Dokee',
  description: 'Automatisez vos circuits de validation avec les workflows Dokee. Configurables sans code.',
  keywords: ['workflow documentaire', 'circuit de validation', 'automatisation documentaire'],
  path: '/dokee/workflow',
})

export default function WorkflowPage() {
  const steps = ['Dépôt', 'Indexation', 'Validation N1', 'Validation N2', 'Archivage', 'Notification']
  return (
    <main className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Workflows documentaires métier</h1>
        <p className="mt-5 section-sub">Les workflows Dokee automatisent vos circuits de traitement documentaire. Configurables sans code, ils s'adaptent à vos processus métier — pas l'inverse.</p>
        <div className="mt-12 grid gap-3 md:grid-cols-6">{steps.map(step => <div key={step} className="rounded-card bg-2py-50 p-4 text-center text-sm font-black text-2py-700">{step}</div>)}</div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {['Workflow comptable : réception facture → contrôle → validation DAF → comptabilisation', 'Workflow RH : candidature → tri → entretien → onboarding documentaire', 'Workflow qualité : création procédure → validation responsable → diffusion → révision'].map(text => <article key={text} className="card text-sm leading-6 text-muted">{text}</article>)}
        </div>
        <p className="mt-10 font-bold text-2py-600">Paramétrable · multi-niveaux · relances automatiques · audit trail · intégration API</p>
      </div>
    </main>
  )
}
