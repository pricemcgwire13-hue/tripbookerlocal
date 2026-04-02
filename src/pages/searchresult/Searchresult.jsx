import './searchresult.css'

const Searchresult = () => {
	return(
		<div className="search_result">
			<div className="tabs">
				<div className="tab">Hotel</div>
				<div className="tab active">Homes</div>
				<div className="tab">Stays</div>
			</div>

			<input
				type="text"
				className="search_box"
				placeholder="Search a property"
			/>

			<p className="filters">Filters:</p>

			<div className="card">
				<img src="" alt=""/>

				<div className="card_content">
					<h3>Capella Hanoi</h3>
					<ul>
						<li>Breakfast Included</li>
						<li>Old Quarter</li>
					</ul>
				</div>
			</div>
	
			<div className="card">
				<img src="" alt=""/>
				<div className="card_content2">
					<h3>Hilton Garden In HaNoi</h3>
					<ul>
						<li>Pool</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Searchresult
