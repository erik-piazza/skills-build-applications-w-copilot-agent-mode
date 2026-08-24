import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const ACTIVITIES_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  return (
    <ApiSection
      title="Activities"
      requestUrl={ACTIVITIES_API_URL}
      renderItem={(activity) => (
        <>
          <h3 className="h5 mb-1">{activity.name ?? activity.activity_name ?? 'Activity'}</h3>
          <p className="mb-1">{activity.description ?? activity.type ?? 'No details provided.'}</p>
          <small className="text-body-secondary">
            Duration: {activity.duration ?? activity.duration_minutes ?? 'N/A'}
          </small>
        </>
      )}
    />
  )
}
