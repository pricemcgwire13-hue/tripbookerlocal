import './header.css'
import { useState } from 'react'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const closeMenu = () => setMenuOpen(false)

	return (
		<>
			<header className="header">
				<div className="header_left">
					<img src={logo} alt="logo" className="logo" />
				</div>

				<div className="header_center">
					<h1>Trip Booker</h1>
				</div>

				<div className="header_right">
					<div className="icon"><FaUser /></div>

					<button
						className="menu_btn"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle navigation menu"
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</header>

			<nav className={`sub_nav ${menuOpen ? 'open' : ''}`}>
				<Link to="/" onClick={closeMenu}>Home</Link>
				<Link to="/searchresult" onClick={closeMenu}>Search Results</Link>
				<Link to="/checkout" onClick={closeMenu}>Checkout</Link>
			</nav>
		</>
	)
}

export default Header