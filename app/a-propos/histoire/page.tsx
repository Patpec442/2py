import Timeline from '@/components/Timeline'
const events = [
  ['1999', 'Création de 2PY', "Premières missions d'ingénierie documentaire pour des collectivités."],
  ['2004', 'Lancement de GEDE@SY', 'Premier logiciel GED métier.'],
  ['2010', 'Extension aux PME et cabinets comptables', '+50 clients.'],
  ['2016', 'Modules workflow automatisé', 'Premiers circuits documentaires configurables.'],
  ['2020', 'Refonte technologique', "Migration vers l'architecture moderne."],
  ['2023', 'Lancement de Dokee', 'Plateforme documentaire intelligente avec IA native.'],
  ['2024', 'IA documentaire', 'OCR intelligent, classification automatique, recherche sémantique.'],
  ['2025', 'Positionnement IA métier', "2PY devient acteur de l'ingénierie documentaire et IA métier."],
].map(([year, title, description]) => ({ year, title, description }))
export default function HistoirePage() { return <main className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-5xl"><span className="section-tag">Depuis 1999</span><h1 className="section-title">25 ans au service de l'ingénierie documentaire.</h1><div className="mt-12"><Timeline events={events} /></div></div></main> }
