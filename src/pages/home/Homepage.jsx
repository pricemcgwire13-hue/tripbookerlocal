import './homepage.css'
import { useEffect, useRef, useState } from 'react'
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

const locationOptions = [
	'Capella Hanoi',
	'Hilton Garden Inn Hanoi',
	'The Ritz-Carlton Charlotte',
	'Hyatt Place Charlotte Downtown',
	'Omni Charlotte Hotel',
	'The Umstead Hotel and Spa',
	'Raleigh Marriott City Center',
	'Hyatt House Raleigh Downtown'
]

const Homepage = () => {
	const navigate = useNavigate()
	const [pageReady, setPageReady] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [showLocationDropdown, setShowLocationDropdown] = useState(false)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showTravelersPicker, setShowTravelersPicker] = useState(false)

	const [selectedLocation, setSelectedLocation] = useState('Location(s)')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [travelers, setTravelers] = useState(1)

	const locationRef = useRef(null)
	const dateRef = useRef(null)
	const travelersRef = useRef(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setPageReady(true)
		}, 150)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (locationRef.current && !locationRef.current.contains(event.target)) {
				setShowLocationDropdown(false)
			}

			if (dateRef.current && !dateRef.current.contains(event.target)) {
				setShowDatePicker(false)
			}

			if (travelersRef.current && !travelersRef.current.contains(event.target)) {
				setShowTravelersPicker(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const formatDateRange = () => {
		if (startDate && endDate) return `${startDate} → ${endDate}`
		if (startDate) return startDate
		return 'Select Date(s)'
	}

	const handleLocationSelect = (location) => {
		setSelectedLocation(location)
		setShowLocationDropdown(false)
	}

	const handleTravelersChange = (value) => {
		if (value < 1) return
		if (value > 20) return
		setTravelers(value)
	}

	return (
		<div className={`home_page ${pageReady ? 'page_ready' : ''}`}>
			<h1 className="title">Find Your Destination!</h1>

			<div className="hero">
				<div className="search_bar">
					<div className="search_control" ref={locationRef}>
						<button
							type="button"
							className="search_item"
							onClick={() => {
								setShowLocationDropdown((prev) => !prev)
								setShowDatePicker(false)
								setShowTravelersPicker(false)
							}}
						>
							<FaMapMarkerAlt />
							<span>{selectedLocation}</span>
						</button>

						{showLocationDropdown && (
							<div className="search_popup location_dropdown">
								{locationOptions.map((location) => (
									<button
										key={location}
										type="button"
										className="dropdown_option"
										onClick={() => handleLocationSelect(location)}
									>
										{location}
									</button>
								))}
							</div>
						)}
					</div>

					<div className="search_control" ref={dateRef}>
						<button
							type="button"
							className="search_item"
							onClick={() => {
								setShowDatePicker((prev) => !prev)
								setShowLocationDropdown(false)
								setShowTravelersPicker(false)
							}}
						>
							<FaCalendarAlt />
							<span>{formatDateRange()}</span>
						</button>

						{showDatePicker && (
							<div className="search_popup date_picker_popup">
								<div className="popup_title">Choose your travel dates</div>

								<div className="date_fields">
									<div className="date_field">
										<label htmlFor="startDate">Start Date</label>
										<input
											id="startDate"
											type="date"
											value={startDate}
											onChange={(e) => {
												const newStart = e.target.value
												setStartDate(newStart)

												if (endDate && newStart > endDate) {
													setEndDate('')
												}
											}}
										/>
									</div>

									<div className="date_field">
										<label htmlFor="endDate">End Date</label>
										<input
											id="endDate"
											type="date"
											value={endDate}
											min={startDate || ''}
											onChange={(e) => setEndDate(e.target.value)}
										/>
									</div>
								</div>

								<button
									type="button"
									className="popup_done_btn"
									onClick={() => setShowDatePicker(false)}
								>
									Done
								</button>
							</div>
						)}
					</div>

					<div className="search_control" ref={travelersRef}>
						<button
							type="button"
							className="search_item"
							onClick={() => {
								setShowTravelersPicker((prev) => !prev)
								setShowLocationDropdown(false)
								setShowDatePicker(false)
							}}
						>
							<FaUserPlus />
							<span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
						</button>

						{showTravelersPicker && (
							<div className="search_popup travelers_popup">
								<div className="popup_title">Number of Travelers</div>

								<div className="travelers_row">
									<button
										type="button"
										className="traveler_btn"
										onClick={() => handleTravelersChange(travelers - 1)}
									>
										−
									</button>

									<input
										type="number"
										min="1"
										max="20"
										value={travelers}
										onChange={(e) =>
											handleTravelersChange(Number(e.target.value) || 1)
										}
										className="traveler_input"
									/>

									<button
										type="button"
										className="traveler_btn"
										onClick={() => handleTravelersChange(travelers + 1)}
									>
										+
									</button>
								</div>

								<button
									type="button"
									className="popup_done_btn"
									onClick={() => setShowTravelersPicker(false)}
								>
									Done
								</button>
							</div>
						)}
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
								navigate('/searchresult', {
									state: {
										selectedLocation:
											selectedLocation === 'Location(s)' ? '' : selectedLocation,
										startDate,
										endDate,
										travelers
									}
								})
							}, 900)
						}}
					>
						{isSubmitting ? (
							<>
								<span className="mini_spinner"></span>
								
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