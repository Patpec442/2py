import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages.integration
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['intégration GED', 'API REST', 'SSO'], path: '/expertise/integration' })
export default function Page() { return <ExpertisePage {...data} /> }
