import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const TEAMS_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return (
    <ApiSection
      title="Teams"
      requestUrl={TEAMS_API_URL}
      renderItem={(team) => (
        <>
          <h3 className="h5 mb-1">{team.name ?? team.team_name ?? 'Team'}</h3>
          <p className="mb-1">{team.description ?? 'No description provided.'}</p>
          <small className="text-body-secondary">
            Members: {team.member_count ?? team.members?.length ?? 0}
          </small>
        </>
      )}
    />
  )
}
