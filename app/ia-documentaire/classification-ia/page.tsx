import IAPageTemplate from '@/components/ia/IAPageTemplate'
import { iaPages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = iaPages['classification-ia']
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: data.keywords, path: '/ia-documentaire/classification-ia' })
export default function Page() { return <IAPageTemplate {...data} /> }
