import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './app.module.css'
import Header from './components/header/Header.jsx'
import Button from './components/button/Button.jsx'
import beachPNG from './assets/beach.png'

import Homepage from './pages/home/Homepage.jsx'
import Checkout from './pages/checkout/Checkout.jsx'
import Searchresult from './pages/searchresult/Searchresult.jsx'
import ErrorExample from './pages/errorexample/ErrorExample.jsx'

function App() {
	return (
  		<div className={styles.canvas}>
  	  		<Header>
			</Header>
			<Routes>
				<Route path='/' element={<Homepage />}/>
				<Route path='/searchresult' element={<Searchresult/>}/>
				<Route path='/checkout' element={<Checkout />}/>
				<Route path='/errorexample' element={<ErrorExample />}/>
			</Routes>
  	  	</div>
  	)
}

export default App
		
