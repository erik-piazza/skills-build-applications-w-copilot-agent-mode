import ApiSection from './ApiSection'

export default function Teams() {
  return (
    <ApiSection
      title="Teams"
      endpoint="teams"
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
