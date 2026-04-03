import './header.css'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Header = () => {
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
				</div>
			</header>

			<nav className="sub_nav">
				<Link to="/">Home</Link>
				<Link to="/searchresult">Search Results</Link>
				<Link to="/checkout">Checkout</Link>
			</nav>
		</>
	)
}

export default Header