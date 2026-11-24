import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions.rh
export const metadata = buildMetadata({ title: 'GED RH — Dossiers collaborateurs', description: data.description, keywords: data.keywords, path: '/solutions/rh' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
