import IAPageTemplate from '@/components/ia/IAPageTemplate'
import { iaPages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = iaPages.automatisation
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: data.keywords, path: '/ia-documentaire/automatisation' })
export default function Page() { return <IAPageTemplate {...data} /> }
