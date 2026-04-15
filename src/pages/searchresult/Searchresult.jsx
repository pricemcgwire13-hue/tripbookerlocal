import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './searchresult.css'
import Hotel1 from '../../assets/Hotel1.png'
import Hotel2 from '../../assets/Hotel2.png'
import Ritz from '../../assets/ritz.png'
import Omni from '../../assets/omni.png'
import Hyatt from '../../assets/hyatt.png'
import Marriott from '../../assets/marriott.png'
import Hyatt_Raleigh from '../../assets/hyatt_raleigh.png'
import Umstead from '../../assets/umstead.png'
import AutoInput from './AutoInput.jsx'
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const hotelsData = [
  {
    id: 1,
    name: "Capella Hanoi",
    city: "Hanoi",
    features: ["Breakfast Included", "Old Quarter"],
    rating: "7.6",
    miles: "2 miles",
    image: Hotel1
  },
  {
    id: 2,
    name: "Hilton Garden Inn Hanoi",
    city: "Hanoi",
    features: ["Pool"],
    rating: "6.4",
    miles: "1 mile",
    image: Hotel2
  },
  {
    id: 3,
    name: "The Ritz-Carlton Charlotte",
    city: "Charlotte",
    features: ["Pool", "Breakfast Included"],
    rating: "9.1",
    miles: "0.5 miles",
    image: Ritz
  },
  {
    id: 4,
    name: "Hyatt Place Charlotte Downtown",
    city: "Charlotte",
    features: ["Breakfast Included"],
    rating: "8.5",
    miles: "1 mile",
    image: Hyatt
  },
  {
    id: 5,
    name: "Omni Charlotte Hotel",
    city: "Charlotte",
    features: ["Pool"],
    rating: "8.8",
    miles: "0.7 miles",
    image: Omni
  },
  {
    id: 6,
    name: "The Umstead Hotel and Spa",
    city: "Raleigh",
    features: ["Pool"],
    rating: "9.3",
    miles: "2 miles",
    image: Umstead
  },
  {
    id: 7,
    name: "Raleigh Marriott City Center",
    city: "Raleigh",
    features: ["Breakfast Included"],
    rating: "8.6",
    miles: "1 mile",
    image: Marriott
  },
  {
    id: 8,
    name: "Hyatt House Raleigh Downtown",
    city: "Raleigh",
    features: ["Pool", "Breakfast Included"],
    rating: "8.9",
    miles: "1.2 miles",
    image: Hyatt_Raleigh
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
    if (query === "") {
      setResults(hotelsData)
      setShowSuggestions(false)
      return
    }

    setShowSuggestions(true)

    let filtered = hotelsData.filter(hotel =>
      hotel.name.toLowerCase().includes(query.toLowerCase()) ||
      hotel.city.toLowerCase().includes(query.toLowerCase()) ||
      hotel.features.join(" ").toLowerCase().includes(query.toLowerCase())
    )

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
          <AutoInput
            value={query}
            onChange={(e, { newValue }) => setQuery(newValue)}
            placeholder="Search for location"
            data={hotelsData}
          />
        </div>

        <button
          className="search_button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

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

    </div>
  )
}

export default Searchresult
