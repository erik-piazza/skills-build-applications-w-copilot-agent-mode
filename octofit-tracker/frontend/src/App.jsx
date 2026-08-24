import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { CODESPACE_NAME } from './components/ApiSection'

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function navLinkClass({ isActive }) {
  return `nav-link ${isActive ? 'active' : ''}`
}

export default function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="bg-dark text-white py-4">
        <div className="container">
          <h1 className="h3 mb-2">Octofit Tracker</h1>
          <p className="mb-0">React 19 presentation tier</p>
        </div>
      </header>

      {!CODESPACE_NAME && (
        <div className="container pt-3">
          <div className="alert alert-warning mb-0">
            <strong>VITE_CODESPACE_NAME is not set.</strong> Falling back to
            {' '}
            <code>http://localhost:8000/api/...</code>.
          </div>
        </div>
      )}

      <nav className="border-bottom bg-white">
        <div className="container">
          <ul className="nav nav-pills py-3 gap-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}
