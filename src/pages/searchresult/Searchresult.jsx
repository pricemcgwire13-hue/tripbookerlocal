import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './searchresult.css'
import Hotel1 from '../../assets/Hotel1.png'
import Hotel2 from '../../assets/Hotel2.png'
import AutoInput from './AutoInput.jsx'
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const hotelsData = [
  {
    id: 1,
    name: "Capella Hanoi",
    features: ["Breakfast Included", "Old Quarter"],
    rating: "7.6",
    miles: "2 miles",
    image: Hotel1
  },
  {
    id: 2,
    name: "Hilton Garden Inn Hanoi",
    features: ["Pool"],
    rating: "6.4",
    miles: "1 mile",
    image: Hotel2
  }
]

const Searchresult = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("")
  const [results, setResults] = useState(hotelsData)
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])

  const filterOptions = ["Old Quarter", "Pool", "Breakfast"]

  useEffect(() => {
    let filtered = hotelsData;

	// (1) search case insensitive name to include a input
    if (query !== "") {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    }

	// (2) second option of adding filters 
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedFilters.every(f =>
          hotel.features.some(feature =>
            feature.toLowerCase().includes(f.toLowerCase())
          )
        )
      )
    }

    setResults(filtered)
  }, [query, selectedFilters])

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1200)
  }

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <div className="search_result">
      <div className="search_container">
        <input type="date" className="date_input" />

        <div style={{ position: "relative" }}>
			<AutoInput value={query} onChange={(e, { newValue }) => setQuery(newValue)} placeholder="Search for location" inputStyle="search_input" data={hotelsData}/>

          {showSuggestions && (
            <div className="suggestions">
              {results.length > 0 ? (
                results.map(item => (
                  <div
                    key={item.id}
                    className="suggestion_item"
                    onClick={() => {
                      setQuery(item.name)
                      setShowSuggestions(false)
                    }}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="no_results">No results found</div>
              )}
            </div>
          )}
        </div>

        <button
          className="search_button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Tabs restored */}
      <div className="tabs">
        <div className="tab active">Hotel</div>
        <div className="tab">Homes</div>
        <div className="tab">Stays</div>
      </div>

      <p className="filters">Filters:</p>

      <div className="filter_list">
        {filterOptions.map(option => (
          <div
            key={option}
            className="filter_item"
            onClick={() => toggleFilter(option)}
          >
            <div className={`filter_box ${selectedFilters.includes(option) ? "active_filter" : ""}`}></div>
            {option}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loader">Loading results...</div>
      ) : (
        <>
          {results.length === 0 ? (
            <p>No results found</p>
          ) : (
            results.map(hotel => (
              <div key={hotel.id} className="card fade-in">
                <img src={hotel.image} alt={hotel.name} />

                <div className="card_content">
                  <h3>{hotel.name}</h3>
                  <ul>
                    {hotel.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <p className="rating">{hotel.rating} ★</p>
                  <p className="miles">{hotel.miles}</p>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}

export default Searchresult
