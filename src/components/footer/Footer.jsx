import { useNavigate } from 'react-router-dom'
import './footer.css'
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

const Footer = () => {

    const navigate = useNavigate()

	return(
		<>
		<div className="checkout_footer_bar">
                <button
                    className="footer_nav_btn"
                    aria-label="Home"
                    type="button"
                    onClick={() => navigate('/')}
                >
                    <FaHome size={20} />
                </button>

                <div className="footer_right">
                    <button
                        className="footer_nav_btn"
                        aria-label="Previous"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft size={18} />
                    </button>

                    <button
                        className="footer_nav_btn"
                        aria-label="Next"
                        type="button"
                        onClick={() => navigate('/searchresult')}
                    >
                        <FaArrowRight size={18} />
                    </button>
				</div>
			</div>
			<div className="filler_footer">
			</div>
		</>
	);
}

export default Footer
