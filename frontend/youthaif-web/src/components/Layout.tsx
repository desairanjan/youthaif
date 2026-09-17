import { Outlet, NavLink } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="container header-inner">
          <NavLink to="/" className="logo">
            <span className="logo-youth">Youth</span>
            <span className="logo-aif">AIF</span>
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
            <NavLink to="/sevathon" className={({ isActive }) => isActive ? 'nav-link active sevathon-link' : 'nav-link sevathon-link'}>
              Sevathon 9/20
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Report
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
