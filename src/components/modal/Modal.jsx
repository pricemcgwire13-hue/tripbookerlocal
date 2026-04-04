import styles from './modal.module.css'

function Modal ({children, setModal}) {
	
	return(
		<div 
			className={styles.modal}
			onClick={() => setModal(toggle => !toggle)}
		>
			<div 
				className={styles.modal_content}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

export default Modal
