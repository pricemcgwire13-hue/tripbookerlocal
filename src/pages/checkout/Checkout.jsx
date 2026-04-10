import './checkout.css'
import tripMain from '../../assets/trip-main.jpg'
import tripBottom from '../../assets/trip-bottom.jpg'
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

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
	return (
		<div className="checkout_page">
			<div className="checkout_content">
				<div className="checkout_left">
					<section className="form_section">
						<h2>Who’s Traveling?</h2>

						<div className="form_row">
							<label htmlFor="firstName">First Name</label>
							<input id="firstName" type="text" placeholder="Enter first name" />
						</div>

						<div className="form_row">
							<label htmlFor="lastName">Last Name</label>
							<input id="lastName" type="text" placeholder="Enter last name" />
						</div>

						<div className="form_row">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" placeholder="Enter email" />
						</div>

						<div className="form_row">
							<label htmlFor="phone">Phone</label>
							<input id="phone" type="text" placeholder="Enter phone number" />
						</div>
					</section>

					<section className="form_section">
						<h2>Payment Method</h2>

						<div className="form_row">
							<label htmlFor="cardName">Card Name</label>
							<input id="cardName" type="text" placeholder="Name on card" />
						</div>

						<div className="form_row">
							<label htmlFor="cardNumber">Card Number</label>
							<input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" />
						</div>

						<div className="payment_small_row">
							<div className="small_field">
								<label htmlFor="exp">Exp Date</label>
								<input id="exp" type="text" placeholder="MM/YY" />
							</div>

							<div className="small_field">
								<label htmlFor="cvv">CVV</label>
								<input id="cvv" type="text" placeholder="123" />
							</div>
						</div>
					</section>

					<section className="form_section">
						<h2>Billing Address</h2>

						<div className="form_row">
							<label htmlFor="address">Address</label>
							<input id="address" type="text" placeholder="Street address" />
						</div>

						<div className="form_row">
							<label htmlFor="city">City</label>
							<input id="city" type="text" placeholder="Enter city" />
						</div>

						<div className="billing_split">
							<div className="small_field">
								<label htmlFor="state">State</label>
								<select id="state" defaultValue="">
									<option value="" disabled>
										Select state
									</option>
									{states.map((state) => (
										<option key={state} value={state}>
											{state}
										</option>
									))}
								</select>
							</div>

							<div className="small_field">
								<label htmlFor="zip">ZIP</label>
								<input id="zip" type="text" placeholder="28223" />
							</div>
						</div>
					</section>
				</div>

				<div className="checkout_middle">
					<div className="image_stack">
						<img src={tripMain} alt="Tropical resort view" />
						<img src={tripBottom} alt="Beachfront patio view" />
					</div>
				</div>

				<div className="checkout_right">
					<section className="summary_section">
						<h2>Trip Summary</h2>

						<div className="summary_line">
							<span>Location</span>
							<span>St. Lucia</span>
						</div>

						<div className="summary_line">
							<span>Days</span>
							<span>5</span>
						</div>

						<div className="summary_line">
							<span>Travelers</span>
							<span>2</span>
						</div>
					</section>

					<section className="price_box">
						<h3>Price Summary</h3>
						<p>1 Room × 5 Nights</p>

						<div className="price_line">
							<span>Room Total</span>
							<span>$1,450</span>
						</div>

						<div className="price_line">
							<span>Tickets</span>
							<span>$820</span>
						</div>

						<div className="price_line">
							<span>Tax & Fees</span>
							<span>$210</span>
						</div>

						<div className="price_total">
							<span>Total</span>
							<span>$2,480</span>
						</div>
					</section>

					<button className="confirm_btn">Confirm Checkout</button>
				</div>
			</div>

			<div className="checkout_footer_bar">
				<div className="footer_left">
					<FaHome size={24} />
				</div>

				<div className="footer_right">
					<FaArrowLeft size={20} />
					<FaArrowRight size={20} />
				</div>
			</div>
		</div>
	)
}

export default Checkout