import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const API_ORIGIN = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const TEAMS_API_URL = `${API_ORIGIN}/api/teams/`

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
