import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const API_ORIGIN = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const USERS_API_URL = `${API_ORIGIN}/api/users/`

export default function Users() {
  return (
    <ApiSection
      title="Users"
      requestUrl={USERS_API_URL}
      renderItem={(user) => (
        <>
          <h3 className="h5 mb-1">{user.name ?? user.username ?? user.email ?? 'User'}</h3>
          <p className="mb-1">{user.email ?? 'No email available.'}</p>
          <small className="text-body-secondary">
            Joined: {user.created_at ?? user.joined_at ?? 'Unknown'}
          </small>
        </>
      )}
    />
  )
}
