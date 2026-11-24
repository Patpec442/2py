import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions['cabinets-comptables']
export const metadata = buildMetadata({ title: 'GED pour cabinets comptables', description: data.description, keywords: data.keywords, path: '/solutions/cabinets-comptables' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
