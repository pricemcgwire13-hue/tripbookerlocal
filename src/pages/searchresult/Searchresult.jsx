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
				ClassName="search_box"
				placeholder="Search a property"
			/>

			<p className="filters">Filters:</p>

			
		</div>
	)
}

export default Searchresult
