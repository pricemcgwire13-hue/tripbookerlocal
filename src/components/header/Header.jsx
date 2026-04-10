import './header.css'
import { useState } from 'react'
import { FaUser, FaBars, FaTimes, FaHome, FaSearch, FaCreditCard } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [profileLoading, setProfileLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const [navLoading, setNavLoading] = useState('')

	const closeMenu = () => setMenuOpen(false)

	const isActive = (path) => location.pathname === path

	const handleProfileClick = () => {
		if (profileLoading) return

		closeMenu()
		setProfileLoading(true)

		setTimeout(() => {
			navigate('/profile')
			setProfileLoading(false)
		}, 700)
	}

	const handleNavClick = (path) => {
	if (navLoading || location.pathname === path) return

	closeMenu()
	setNavLoading(path)

	setTimeout(() => {
		navigate(path)
		setNavLoading('')
	}, 500)
}

	return (
		<>
			<header className="header">
				<div className="header_left">
					<Link to="/" onClick={closeMenu} className="logo_link">
						<img src={logo} alt="Trip Booker logo" className="logo" />
					</Link>
				</div>

				<div className="header_center">
					<h1>Trip Booker</h1>
				</div>

				<div className="header_right">
					<button
						className="menu_btn"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle navigation menu"
						type="button"
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>

					<button
						type="button"
						className={`icon profile_icon ${profileLoading ? 'loading' : ''}`}
						aria-label="Profile"
						onClick={handleProfileClick}
						disabled={profileLoading}
					>
						{profileLoading ? <span className="mini_spinner"></span> : <FaUser />}
					</button>
				</div>
			</header>

			<nav className={`sub_nav ${menuOpen ? 'open' : ''}`}>
				<button
					type="button"
					className={`nav_link_btn ${isActive('/') ? 'active' : ''}`}
					onClick={() => handleNavClick('/')}
					disabled={navLoading === '/'}
				>
					{navLoading === '/' ? <span className="mini_spinner"></span> : <FaHome />}
					<span>Home</span>
				</button>

				<button
					type="button"
					className={`nav_link_btn ${isActive('/searchresult') ? 'active' : ''}`}
					onClick={() => handleNavClick('/searchresult')}
					disabled={navLoading === '/searchresult'}
				>
					{navLoading === '/searchresult' ? <span className="mini_spinner"></span> : <FaSearch />}
					<span>Search</span>
				</button>

				<button
					type="button"
					className={`nav_link_btn ${isActive('/checkout') ? 'active' : ''}`}
					onClick={() => handleNavClick('/checkout')}
					disabled={navLoading === '/checkout'}
				>
					{navLoading === '/checkout' ? <span className="mini_spinner"></span> : <FaCreditCard />}
					<span>Checkout</span>
				</button>
			</nav>
		</>
	)
}

export default Header