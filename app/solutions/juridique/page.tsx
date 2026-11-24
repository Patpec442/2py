import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions.juridique
export const metadata = buildMetadata({ title: 'GED juridique — Gestion contractuelle', description: data.description, keywords: data.keywords, path: '/solutions/juridique' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
