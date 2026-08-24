import ApiSection from './ApiSection'

export default function Workouts() {
  return (
    <ApiSection
      title="Workouts"
      endpoint="workouts"
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
