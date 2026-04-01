import './header.css'
import { FaUser, FaBars, FaHome } from 'react-icons/fa'
import logo from '../../assets/logo.png' 

const Header = () => {
	return (
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
	)
}

export default Header