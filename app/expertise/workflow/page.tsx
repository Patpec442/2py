import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages.workflow
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['workflow documentaire', 'validation documentaire'], path: '/expertise/workflow' })
export default function Page() { return <ExpertisePage {...data} /> }
