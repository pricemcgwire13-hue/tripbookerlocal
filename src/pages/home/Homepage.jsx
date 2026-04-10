import './homepage.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaUserPlus,
	FaBed,
	FaPlane,
	FaCar,
	FaShip,
	FaHome,
	FaArrowLeft,
	FaArrowRight
} from 'react-icons/fa'



const Homepage = () => {
	const navigate = useNavigate()
	const [pageReady, setPageReady] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setPageReady(true)
		}, 150)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className={`home_page ${pageReady ? 'page_ready' : ''}`}>
			<h1 className="title">Find Your Destination!</h1>

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
					<div className="option_item">
						<FaBed />
						<span>Hotel</span>
					</div>

					<div className="option_item">
						<FaPlane />
						<span>Flight</span>
					</div>

					<div className="option_item">
						<FaCar />
						<span>Rental</span>
					</div>

					<div className="option_item">
						<FaShip />
						<span>Cruise</span>
					</div>
				</div>

				<div className="submit_btn">
				<button
					type="button"
					className={isSubmitting ? 'loading' : ''}
					disabled={isSubmitting}
					onClick={() => {
						if (isSubmitting) return

						setIsSubmitting(true)

						setTimeout(() => {
							navigate('/searchresult')
						}, 900)
					}}
				>
					{isSubmitting ? (
						<>
							<span className="spinner"></span>
							Loading...
						</>
					) : (
						'Submit'
					)}
				</button>
			</div>
			</div>
		</div>
	)
}

export default Homepage
