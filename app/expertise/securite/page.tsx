import ExpertisePage from '@/components/ExpertisePage'
import { expertisePages } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
const data = expertisePages.securite
export const metadata = buildMetadata({ title: data.title, description: data.description, keywords: ['sécurité informatique', 'RGPD', 'chiffrement'], path: '/expertise/securite' })
export default function Page() { return <ExpertisePage {...data} /> }
