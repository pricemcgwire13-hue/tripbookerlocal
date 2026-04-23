import './toggle.css'

function Toggle({ checked, onChange }) {
	return (
		<label className='theme_toggle'>
			<span className='toggle_label'>{checked ? 'Dark' : 'Light'}</span>
			<input
				type='checkbox'
				checked={checked}
				onChange={onChange}
				role='switch'
				aria-label='Toggle dark mode'
				aria-checked={checked}
			/>
			<span className='slider'></span>
		</label>
	)
}

export default Toggle