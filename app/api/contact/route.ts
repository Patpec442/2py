import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('[CONTACT]', new Date().toISOString(), JSON.stringify(data))
    const required = ['prenom', 'nom', 'email', 'societe', 'message']
    for (const field of required) {
      if (!data[field] || String(data[field]).trim() === '') {
        return NextResponse.json({ ok: false, error: `Champ manquant : ${field}` }, { status: 400 })
      }
    }
    return NextResponse.json({ ok: true, message: 'Demande reçue. Réponse sous 24h.' })
  } catch {
    return NextResponse.json({ ok: false, error: 'Erreur serveur.' }, { status: 500 })
  }
}
