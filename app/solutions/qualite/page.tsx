import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions.qualite
export const metadata = buildMetadata({ title: 'GED qualité — Procédures et référentiels', description: data.description, keywords: data.keywords, path: '/solutions/qualite' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
