import IAPageTemplate from '@/components/ia/IAPageTemplate'
import { iaPages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = iaPages['extraction-documentaire']
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: data.keywords, path: '/ia-documentaire/extraction-documentaire' })
export default function Page() { return <IAPageTemplate {...data} /> }
