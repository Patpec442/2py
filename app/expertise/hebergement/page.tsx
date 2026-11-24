import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages.hebergement
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['hébergement France', 'OVH France', 'PRA'], path: '/expertise/hebergement' })
export default function Page() { return <ExpertisePage {...data} /> }
