import './errorexample.css'
import { FaMapMarkerAlt, FaCalendarAlt, FaUserPlus, FaBed, FaPlane, FaCar, FaShip, FaUserCircle, FaBars } from 'react-icons/fa' 
import { Modal } from '../../components/components.js'

const ErrorExample = () => {
	return(
		<div className="home_page">
			<h1 className="title">Welcome to TripBooker!</h1>
			<div className="hero">

				<div className="search_bar">
					<div className="search_item">
						<FaMapMarkerAlt />
						<span>Location(s)</span>
					</div>

					<div className="search_item">
						<FaCalendarAlt />
						<span>Select Date(s)</span>
					</div>

					<div className="search_item">
						<FaUserPlus />
						<span>Travelers</span> 
					</div>
				</div>

				<div className="options_bar">
					<div>
						<FaBed />
						Hotel
					</div>
					<div>
						<FaPlane />
						Flight
					</div>
					<div>
						<FaCar />
						Rental
					</div>
					<div>	
						<FaShip />
						Cruise
					</div>
				</div>

				<div className="submit_btn">
					<button>Submit</button>
				</div>

			</div>
			<Modal>
				<p style={{color: 'red', fontSize: '1.5rem', fontWeight: '600'}}>This is an exmaple error message</p>
			</Modal>
		</div>
	)
}

export default ErrorExample
