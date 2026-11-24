import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions['pme-eti']
export const metadata = buildMetadata({ title: 'GED pour PME et ETI', description: data.description, keywords: data.keywords, path: '/solutions/pme-eti' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
