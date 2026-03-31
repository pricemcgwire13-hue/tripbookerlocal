const Button = ({ clickAction, children, styles}) => {
	return(	
		<button onClick={clickAction} 
			style={{
				backgroundColor: '#3B5884',
				padding: '1rem',
				borderRadius: '1rem',
				border: '2px solid black',
				color: 'white',
				fontWeight: 700,
				...styles
			}}
		>
			{children}
		</button>
	)
}

export default Button;
