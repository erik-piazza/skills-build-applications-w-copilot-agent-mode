import ApiSection from './ApiSection'

export default function Users() {
  return (
    <ApiSection
      title="Users"
      endpoint="users"
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
