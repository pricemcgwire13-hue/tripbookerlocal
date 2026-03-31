const Input = ({ borderColor = 'black', ...attributes }) => {
	return(
		<input 
			style={{
				border: `2px solid ${borderColor}`,
				padding: '0.5rem',
				backgroundColor: 'white'
			}} 
			{...attributes}
		/>
	)
}

export default Input;
