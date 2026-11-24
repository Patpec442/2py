import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages['ingenierie-documentaire']
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['ingénierie documentaire', 'architecture documentaire'], path: '/expertise/ingenierie-documentaire' })
export default function Page() { return <ExpertisePage {...data} /> }
