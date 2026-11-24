import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages['developpement-metier']
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['développement métier', 'API documentaire'], path: '/expertise/developpement-metier' })
export default function Page() { return <ExpertisePage {...data} /> }
