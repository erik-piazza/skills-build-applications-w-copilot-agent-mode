import ApiSection from './ApiSection'

export default function Activities() {
  return (
    <ApiSection
      title="Activities"
      endpoint="activities"
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
