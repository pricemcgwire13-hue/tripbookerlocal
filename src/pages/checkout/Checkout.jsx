import './checkout.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import tripMain from '../../assets/trip-main.jpg'
import tripBottom from '../../assets/trip-bottom.jpg'
import {
	FaHome,
	FaArrowLeft,
	FaArrowRight,
	FaLock,
	FaShieldAlt,
	FaCheckCircle,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaUsers,
	FaBed,
	FaPlane
} from 'react-icons/fa'

const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
]

const Checkout = () => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		cardName: '',
		cardNumber: '',
		exp: '',
		cvv: '',
		address: '',
		city: '',
		state: '',
		zip: ''
	})

	const [errors, setErrors] = useState({})
	const [bookingComplete, setBookingComplete] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [pageReady, setPageReady] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setPageReady(true)
		}, 150)

		return () => clearTimeout(timer)
	}, [])

	// format phone (###)-###-#### (currently having some trouble)
	const formatPhone = (value) => {
		const digits = value.replace(/\D/g, '').slice(0, 10)

		const part1 = digits.slice(0, 3)
		const part2 = digits.slice(3, 6)
		const part3 = digits.slice(6, 10)

		if (digits.length <= 3) return part1
		if (digits.length <= 6) return `(${part1})-${part2}`
		return `(${part1})-${part2}-${part3}`
}

	// format card #### #### #### #### (currently having some trouble)
	const formatCard = (value) => {
		const digits = value.replace(/\D/g, '').slice(0, 16)

		return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

	const handleChange = (e) => {
		const { name, value } = e.target
		let newValue = value

	// phone formatting
	if (name === 'phone') {
		newValue = formatPhone(value)
	}

	// card formatting
	else if (name === 'cardNumber') {
		newValue = formatCard(value)
	}

	// numeric-only fields
	else if (['cvv', 'zip'].includes(name)) {
		newValue = value.replace(/\D/g, '')
	}

		// restrict numeric-only fields
		if (['phone', 'cardNumber', 'cvv', 'zip'].includes(name)) {
			newValue = value.replace(/\D/g, '')
	}

		// limit input lengths
		if (name === 'phone') newValue = newValue.slice(0, 10)
		if (name === 'cvv') newValue = newValue.slice(0, 3)
		if (name === 'zip') newValue = newValue.slice(0, 5)
		if (name == 'cardNumber') newValue = newValue.slice(0, 16)

		const updatedData = {
		...formData,
		[name]: newValue // use cleaned value instead of raw input
	}
		setFormData(updatedData) 

		// real-time validation (runs BEFORE submit)
		const newErrors = validateForm(updatedData)
		setErrors(newErrors)
	}


	const validateForm = () => {
		const newErrors = {}
/*
		if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.'
		if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.'

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required.'
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = 'Enter a valid email address.'
		}

		if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.'

		if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required.'

		const cleanedCardNumber = formData.cardNumber.replace(/\s/g, '')
		if (!cleanedCardNumber) {
			newErrors.cardNumber = 'Card number is required.'
		} else if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
			newErrors.cardNumber = 'Enter a valid card number.'
		}

		if (!formData.exp.trim()) {
			newErrors.exp = 'Expiration date is required.'
		} else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.exp)) {
			newErrors.exp = 'Use MM/YY format.'
		}

		if (!formData.cvv.trim()) {
			newErrors.cvv = 'CVV is required.'
		} else if (!/^\d{3,4}$/.test(formData.cvv)) {
			newErrors.cvv = 'Enter a valid CVV.'
		}

		if (!formData.address.trim()) newErrors.address = 'Billing address is required.'
		if (!formData.city.trim()) newErrors.city = 'City is required.'
		if (!formData.state.trim()) newErrors.state = 'Please select a state.'

		if (!formData.zip.trim()) {
			newErrors.zip = 'ZIP code is required.'
		} else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
			newErrors.zip = 'Enter a valid ZIP code.'
		}
	*/
		// First Name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required.'
		} else if (!/^[A-Za-z]{3,}$/.test(formData.firstName)) {
			newErrors.firstName = 'Only letters, needs to be more than 3 characters.'
		}

		// Last Name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required.'
		} else if (!/^[A-Za-z]{3,}$/.test(formData.lastName)) {
			newErrors.lastName = 'Only letters, needs to be more than 3 characters.'
		}

		// Email must include @ AND be gmail or yahoo
		if (!formData.email.trim()) {
		newErrors.email = 'Email is required.'
		} else if (!formData.email.includes('@')) {
		newErrors.email = 'Email must include "@" symbol.'
		} else if (!/^[^\s@]+@(gmail\.com|yahoo\.com)$/.test(formData.email)) {
		newErrors.email = 'Email must end with @gmail.com or @yahoo.com.'
		}

		// Phone validation with formatting
		const cleanPhone = formData.phone.replace(/\D/g, '')
		if (!cleanPhone) {
		newErrors.phone = 'Phone number is required.'
		} else if (cleanPhone.length !== 10) {
		newErrors.phone = 'Phone number must be exactly 10 digits.'
		}

		// card number validation with fromatting
		const cleanCard = formData.cardNumber.replace(/\D/g, '')
		if (!cleanCard) {
		newErrors.cardNumber = 'Card number is required.'
		} else if (!/^\d{13,19}$/.test(cleanCard)) {
		newErrors.cardNumber = 'Enter a valid card number.'
		}

		if (!formData.exp.trim()) {
			newErrors.exp = 'Expiration date is required.'
		} else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.exp)) {
			newErrors.exp = 'Use MM/YY format.'
		}

		// CVV exactly 3 digits
		if (!formData.cvv.trim()) {
			newErrors.cvv = 'CVV is required.'
		} else if (!/^\d{3}$/.test(formData.cvv)) {
			newErrors.cvv = 'CVV must be exactly 3 digits.'
		}

		//HEREHERE: City validation (letters only, no digits)
		if (!formData.city.trim()) {
		newErrors.city = 'City is required.'
		} else if (!/^[A-Za-z\s]+$/.test(formData.city)) {
		newErrors.city = 'City cannot contain numbers or special characters.'
		} else if (formData.city.trim().length < 3) {
		newErrors.city = 'City must be at least 3 characters long.'
		}

		if (!formData.address.trim()) newErrors.address = 'Billing address is required.'
		//if (!formData.city.trim()) newErrors.city = 'City needs to be at least 3 characters long.'
		if (!formData.state.trim()) newErrors.state = 'Please select a state.'

		//  ZIP exactly 5 digits
		if (!formData.zip.trim()) {
			newErrors.zip = 'ZIP code is required.'
		} else if (!/^\d{5}$/.test(formData.zip)) {
			newErrors.zip = 'ZIP must be exactly 5 digits.'
		}

		return newErrors
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (isSubmitting) return

		const newErrors = validateForm()

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		setIsSubmitting(true)

		setTimeout(() => {
			setIsSubmitting(false)
			setBookingComplete(true)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}, 1400)
	}

	if (bookingComplete) {
		return (
			<div className={`checkout_page ${pageReady ? 'page_ready' : ''}`}>
				<div className="checkout_content">
					<div className="success_card success_show">
						<div className="success_icon">
							<FaCheckCircle />
						</div>

						<h2>Booking Confirmed</h2>

						<p>
							Your St. Lucia trip has been successfully reserved. A confirmation email
							has been sent to <strong>{formData.email}</strong>.
						</p>

						<div className="success_details">
							<div className="success_detail_row">
								<span>Traveler</span>
								<span>{formData.firstName} {formData.lastName}</span>
							</div>
							<div className="success_detail_row">
								<span>Destination</span>
								<span>St. Lucia</span>
							</div>
							<div className="success_detail_row">
								<span>Dates</span>
								<span>May 18 – May 23</span>
							</div>
							<div className="success_detail_row">
								<span>Total Paid</span>
								<span>$2,480</span>
							</div>
						</div>

						<div className="success_actions">
							<button
								type="button"
								className="confirm_btn"
								onClick={() => navigate('/')}
							>
								Return Home
							</button>

							<button
								type="button"
								className="secondary_btn"
								onClick={() => setBookingComplete(false)}
							>
								Back to Checkout
							</button>
						</div>
					</div>
				</div>

			</div>
		)
	}

	return (
		<div className={`checkout_page ${pageReady ? 'page_ready' : ''}`}>
			<div className="checkout_content">
				<form className="checkout_left" onSubmit={handleSubmit} noValidate>
					<section className="form_section">
						<div className="section_header">
							<h2>Traveler Details</h2>
							<p>Enter the primary traveler’s information.</p>
						</div>

						<div className="form_row">
							<label htmlFor="firstName">First Name</label>
							<div className="field_wrap">
								<input
									id="firstName"
									name="firstName"
									type="text"
									placeholder="abc"
									value={formData.firstName}
									onChange={handleChange}
									className={errors.firstName ? 'input_error' : ''}
								/>
								{errors.firstName && <p className="error_text">{errors.firstName}</p>}
							</div>
						</div>

						<div className="form_row">
							<label htmlFor="lastName">Last Name</label>
							<div className="field_wrap">
								<input
									id="lastName"
									name="lastName"
									type="text"
									placeholder="defg"
									value={formData.lastName}
									onChange={handleChange}
									className={errors.lastName ? 'input_error' : ''}
								/>
								{errors.lastName && <p className="error_text">{errors.lastName}</p>}
							</div>
						</div>

						<div className="form_row">
							<label htmlFor="email">Email</label>
							<div className="field_wrap">
								<input
									id="email"
									name="email"
									type="email"
									placeholder="abcdefg@email.com"
									value={formData.email}
									onChange={handleChange}
									className={errors.email ? 'input_error' : ''}
								/>
								{errors.email && <p className="error_text">{errors.email}</p>}
							</div>
						</div>

						<div className="form_row">
							<label htmlFor="phone">Phone</label>
							<div className="field_wrap">
								<input
									id="phone"
									name="phone"
									type="text"
									placeholder="(704) ***-****"
									value={formData.phone}
									onChange={handleChange}
									className={errors.phone ? 'input_error' : ''}
								/>
								{errors.phone && <p className="error_text">{errors.phone}</p>}
							</div>
						</div>
					</section>

					<section className="form_section">
						<div className="section_header">
							<h2>Payment Method</h2>
							<p>Your payment information is encrypted and secure.</p>
						</div>

						<div className="form_row">
							<label htmlFor="cardName">Name on Card</label>
							<div className="field_wrap">
								<input
									id="cardName"
									name="cardName"
									type="text"
									placeholder="abc defg"
									value={formData.cardName}
									onChange={handleChange}
									className={errors.cardName ? 'input_error' : ''}
								/>
								{errors.cardName && <p className="error_text">{errors.cardName}</p>}
							</div>
						</div>

						<div className="form_row">
							<label htmlFor="cardNumber">Card Number</label>
							<div className="field_wrap">
								<input
									id="cardNumber"
									name="cardNumber"
									type="text"
									placeholder="1234 5678 9012 3456"
									value={formData.cardNumber}
									onChange={handleChange}
									className={errors.cardNumber ? 'input_error' : ''}
								/>
								{errors.cardNumber && <p className="error_text">{errors.cardNumber}</p>}
							</div>
						</div>

						<div className="payment_small_row">
							<div className="small_field">
								<label htmlFor="exp">Exp Date</label>
								<div className="field_wrap">
									<input
										id="exp"
										name="exp"
										type="text"
										placeholder="MM/YY"
										value={formData.exp}
										onChange={handleChange}
										className={errors.exp ? 'input_error' : ''}
									/>
									{errors.exp && <p className="error_text">{errors.exp}</p>}
								</div>
							</div>

							<div className="small_field">
								<label htmlFor="cvv">CVV</label>
								<div className="field_wrap">
									<input
										id="cvv"
										name="cvv"
										type="text"
										placeholder="123"
										value={formData.cvv}
										onChange={handleChange}
										className={errors.cvv ? 'input_error' : ''}
									/>
									{errors.cvv && <p className="error_text">{errors.cvv}</p>}
								</div>
							</div>
						</div>

						<div className="trust_row">
							<div className="trust_item">
								<FaLock />
								<span>SSL Encrypted</span>
							</div>
							<div className="trust_item">
								<FaShieldAlt />
								<span>Secure Payment</span>
							</div>
						</div>
					</section>

					<section className="form_section">
						<div className="section_header">
							<h2>Billing Address</h2>
							<p>Match this address to your payment method.</p>
						</div>

						<div className="form_row">
							<label htmlFor="address">Address</label>
							<div className="field_wrap">
								<input
									id="address"
									name="address"
									type="text"
									placeholder="123 Ocean View Drive"
									value={formData.address}
									onChange={handleChange}
									className={errors.address ? 'input_error' : ''}
								/>
								{errors.address && <p className="error_text">{errors.address}</p>}
							</div>
						</div>

						<div className="form_row">
							<label htmlFor="city">City</label>
							<div className="field_wrap">
								<input
									id="city"
									name="city"
									type="text"
									placeholder="Charlotte"
									value={formData.city}
									onChange={handleChange}
									className={errors.city ? 'input_error' : ''}
								/>
								{errors.city && <p className="error_text">{errors.city}</p>}
							</div>
						</div>

						<div className="billing_split">
							<div className="small_field">
								<label htmlFor="state">State</label>
								<div className="field_wrap">
									<select
										id="state"
										name="state"
										value={formData.state}
										onChange={handleChange}
										className={errors.state ? 'input_error' : ''}
									>
										<option value="" disabled>
											Select state
										</option>
										{states.map((state) => (
											<option key={state} value={state}>
												{state}
											</option>
										))}
									</select>
									{errors.state && <p className="error_text">{errors.state}</p>}
								</div>
							</div>

							<div className="small_field">
								<label htmlFor="zip">ZIP</label>
								<div className="field_wrap">
									<input
										id="zip"
										name="zip"
										type="text"
										placeholder="28227"
										value={formData.zip}
										onChange={handleChange}
										className={errors.zip ? 'input_error' : ''}
									/>
									{errors.zip && <p className="error_text">{errors.zip}</p>}
								</div>
							</div>
						</div>
					</section>
				</form>

				<div className="checkout_middle">
					<div className="image_stack">
						<img src={tripMain} alt="Tropical resort view" />
						<img src={tripBottom} alt="Beachfront patio view" />
					</div>
				</div>

				<div className="checkout_right">
					<section className="booking_card">
						<div className="booking_badge">Reserved Getaway</div>
						<h2 className="booking_title">St. Lucia Escape Resort</h2>
						<p className="booking_subtitle">
							Oceanfront villa package with round-trip flights included.
						</p>

						<div className="booking_meta">
							<div className="booking_meta_item">
								<FaMapMarkerAlt />
								<div>
									<span className="meta_label">Destination</span>
									<span className="meta_value">St. Lucia</span>
								</div>
							</div>

							<div className="booking_meta_item">
								<FaCalendarAlt />
								<div>
									<span className="meta_label">Dates</span>
									<span className="meta_value">May 18 – May 23</span>
								</div>
							</div>

							<div className="booking_meta_item">
								<FaUsers />
								<div>
									<span className="meta_label">Guests</span>
									<span className="meta_value">2 Adults</span>
								</div>
							</div>

							<div className="booking_meta_item">
								<FaBed />
								<div>
									<span className="meta_label">Room</span>
									<span className="meta_value">1 King Suite</span>
								</div>
							</div>
						</div>
					</section>

					<section className="price_box">
						<h3>Price Summary</h3>
						<p>1 Room × 5 Nights</p>

						<div className="price_line">
							<span>Resort Stay</span>
							<span>$1,450</span>
						</div>

						<div className="price_line">
							<span>
								<FaPlane className="inline_icon" />
								Flight Tickets
							</span>
							<span>$820</span>
						</div>

						<div className="price_line">
							<span>Taxes & Fees</span>
							<span>$210</span>
						</div>

						<div className="price_total">
							<span>Total</span>
							<span>$2,480</span>
						</div>
					</section>

					<section className="checkout_cta_panel">
						<button
							className={`confirm_btn ${isSubmitting ? 'loading' : ''}`}
							type="submit"
							onClick={handleSubmit}
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<span className="spinner"></span>
									Processing Booking...
								</>
							) : (
								'Complete Secure Booking'
							)}
						</button>

						<div className="cta_note">
							<FaCheckCircle />
							<span>Free cancellation within 24 hours</span>
						</div>

						<div className="cta_note">
							<FaLock />
							<span>Your booking is protected with secure checkout</span>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Checkout
