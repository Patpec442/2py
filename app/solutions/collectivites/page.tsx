import SolutionPageTemplate from '@/components/solutions/SolutionPageTemplate'
import { solutions } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = solutions.collectivites
export const metadata = buildMetadata({ title: 'GED pour collectivités territoriales', description: data.description, keywords: data.keywords, path: '/solutions/collectivites' })
export default function Page() { return <SolutionPageTemplate {...data} /> }
