import './card.css'

const Card = ({ cardImg, children }) => {
	return(
		<div className='card'>
			<img src={cardImg}/>
			<div>
				{children}
			</div>
		</div>
	)
}

export default Card;
