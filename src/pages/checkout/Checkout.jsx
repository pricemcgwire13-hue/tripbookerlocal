import './checkout.css'
import tripMain from '../../assets/trip-main.jpg'
import tripBottom from '../../assets/trip-bottom.jpg'
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Checkout = () => {
	return (
		<div className="checkout_page">
			<div className="checkout_content">
				<div className="checkout_left">
					<section className="form_section">
						<h2>Whos Traveling?</h2>

						<div className="form_row">
							<label>First Name:</label>
							<input type="text" />
						</div>

						<div className="form_row">
							<label>Last Name:</label>
							<input type="text" />
						</div>

						<div className="form_row">
							<label>Email:</label>
							<input type="email" />
						</div>

						<div className="form_row">
							<label>Phone:</label>
							<input type="text" />
						</div>
					</section>

					<section className="form_section">
						<h2>Payment Method</h2>

						<div className="form_row">
							<label>Card Name:</label>
							<input type="text" />
						</div>

						<div className="form_row">
							<label>Card #:</label>
							<input type="text" />
						</div>

						<div className="payment_small_row">
							<div className="small_field">
								<label>Exp:</label>
								<input type="text" />
							</div>

							<div className="small_field">
								<label>CVV:</label>
								<input type="text" />
							</div>
						</div>
					</section>

					<section className="form_section">
						<h2>Billing Address</h2>

						<div className="form_row">
							<label>Address:</label>
							<input type="text" />
						</div>

						<div className="form_row">
							<label>City:</label>
							<input type="text" />
						</div>

						<div className="billing_split">
							<div className="small_field">
								<label>State:</label>
								<input type="text" />
							</div>

							<div className="small_field">
								<label>Zip:</label>
								<input type="text" />
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
							<span>Location:</span>
							<span></span>
						</div>

						<div className="summary_line">
							<span>Days:</span>
							<span></span>
						</div>

						<div className="summary_line">
							<span>People:</span>
							<span></span>
						</div>
					</section>

					<section className="price_box">
						<h3>Price Summary</h3>
						<p># Rooms x # Nights</p>

						<div className="price_line">Tickets</div>
						<div className="price_line">Tax and Fees</div>
						<div className="price_total">Total:</div>
					</section>

					<button className="confirm_btn">Confirm Checkout</button>
				</div>
			</div>

			<div className="checkout_footer_bar">
				<div className="footer_left">
					<FaHome size={28} />
				</div>

				<div className="footer_right">
					<FaArrowLeft size={24} />
					<FaArrowRight size={24} />
				</div>
			</div>
		</div>
	)
}

export default Checkout