import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const LEADERBOARD_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  return (
    <ApiSection
      title="Leaderboard"
      requestUrl={LEADERBOARD_API_URL}
      renderItem={(entry, index) => (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="h5 mb-1">
              #{entry.rank ?? index + 1} {entry.user_name ?? entry.username ?? entry.name ?? 'Athlete'}
            </h3>
            <small className="text-body-secondary">
              Team: {entry.team_name ?? entry.team ?? 'Unassigned'}
            </small>
          </div>
          <span className="badge text-bg-primary fs-6">
            {entry.points ?? entry.score ?? entry.total_points ?? 0}
          </span>
        </div>
      )}
    />
  )
}
