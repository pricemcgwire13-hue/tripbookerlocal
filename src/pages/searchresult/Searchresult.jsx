import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { FaHome, FaArrowLeft, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'

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
  const location = useLocation();
  const dateRef = useRef(null)

  const incomingLocation = location.state?.selectedLocation || ''
  const incomingStartDate = location.state?.startDate || ''
  const incomingEndDate = location.state?.endDate || ''

  const [query, setQuery] = useState(incomingLocation)
  const [results, setResults] = useState(hotelsData)
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(incomingStartDate)
  const [endDate, setEndDate] = useState(incomingEndDate)

  const filterOptions = ["Old Quarter", "Pool", "Breakfast"]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDatePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    let filtered = hotelsData

    if (query.trim() !== "") {
      setShowSuggestions(true)

      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.city.toLowerCase().includes(query.toLowerCase()) ||
        hotel.features.join(" ").toLowerCase().includes(query.toLowerCase())
      )
    } else {
      setShowSuggestions(false)
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedFilters.every(f =>
          hotel.features.some(feature =>
            feature.toLowerCase().includes(f.toLowerCase())
          )
        )
      )
    }

    if (incomingLocation) {
      filtered = [...filtered].sort((a, b) => {
        const aMatch = a.name === incomingLocation ? 1 : 0
        const bMatch = b.name === incomingLocation ? 1 : 0
        return bMatch - aMatch
      })
    }

    setResults(filtered)
  }, [query, selectedFilters, incomingLocation])

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

  const formatDateRange = () => {
    if (startDate && endDate) return `${startDate} → ${endDate}`
    if (startDate) return startDate
    return 'Select Date(s)'
  }

  return (
    <div className="search_result">

      <div className="search_container">
        <div className="search_control" ref={dateRef}>
          <button
            type="button"
            className="date_search_button"
            onClick={() => setShowDatePicker((prev) => !prev)}
          >
            <FaCalendarAlt />
            <span>{formatDateRange()}</span>
          </button>

          {showDatePicker && (
            <div className="search_popup date_picker_popup">
              <div className="popup_title">Choose your travel dates</div>

              <div className="date_fields">
                <div className="date_field">
                  <label htmlFor="resultsStartDate">Start Date</label>
                  <input
                    id="resultsStartDate"
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
                  <label htmlFor="resultsEndDate">End Date</label>
                  <input
                    id="resultsEndDate"
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
          {loading ? <div className="mini_spinner"></div> : "Search"}
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
		<></>
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
