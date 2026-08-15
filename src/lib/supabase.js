// === src/lib/supabase.js — LOCAL MODE (Supabase disconnected) ===
// Cloud backend is disconnected for now. All calls are local stubs —
// zero network requests, app works fully offline.

const LS_KEY = 'resq_local_session'

const readSession = () => {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const writeSession = (s) => {
  if (s) localStorage.setItem(LS_KEY, JSON.stringify(s))
  else localStorage.removeItem(LS_KEY)
}

const makeUser = (email, displayName) => ({
  id: 'local-user',
  email: email || 'local@resq.app',
  user_metadata: {
    display_name: displayName || (email || 'local@resq.app').split('@')[0],
  },
})

const noopQuery = () => ({
  select: () => noopQuery(),
  insert: () => noopQuery(),
  update: () => noopQuery(),
  delete: () => noopQuery(),
  eq: () => noopQuery(),
  neq: () => noopQuery(),
  gte: () => noopQuery(),
  lte: () => noopQuery(),
  order: () => noopQuery(),
  limit: () => noopQuery(),
  single: async () => ({ data: null, error: null }),
})

export const supabase = {
  auth: {
    async getSession() {
      const session = readSession()
      return { data: { session }, error: null }
    },
    onAuthStateChange(callback) {
      const session = readSession()
      if (session) callback('INITIAL_SESSION', session)
      return { data: { subscription: { unsubscribe() {} } } }
    },
    async signInWithPassword({ email }) {
      const session = { access_token: 'local-token', user: makeUser(email) }
      writeSession(session)
      return { data: { session, user: session.user }, error: null }
    },
    async signUp({ email, options }) {
      const session = {
        access_token: 'local-token',
        user: makeUser(email, options?.data?.display_name),
      }
      writeSession(session)
      return { data: { session, user: session.user }, error: null }
    },
    async signOut() {
      writeSession(null)
      return { error: null }
    },
    async getUser() {
      const session = readSession()
      return { data: { user: session?.user ?? null }, error: null }
    },
  },
  from() {
    return noopQuery()
  },
  rpc: async () => ({ data: null, error: null }),
}
