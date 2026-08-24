import ApiSection from './ApiSection'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const API_ORIGIN = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const WORKOUTS_API_URL = `${API_ORIGIN}/api/workouts/`

export default function Workouts() {
  return (
    <ApiSection
      title="Workouts"
      requestUrl={WORKOUTS_API_URL}
      renderItem={(workout) => (
        <>
          <h3 className="h5 mb-1">{workout.name ?? workout.title ?? 'Workout'}</h3>
          <p className="mb-1">{workout.description ?? 'No workout details provided.'}</p>
          <small className="text-body-secondary">
            Difficulty: {workout.difficulty ?? workout.level ?? 'N/A'}
          </small>
        </>
      )}
    />
  )
}
