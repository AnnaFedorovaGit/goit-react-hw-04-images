import { useEffect } from 'react'; 
import css from './Modal.module.css'


const Modal = ({ hideModal, children }) => {
        
    const handleEsc = (e) => {
        if (e.code === 'Escape') {
            hideModal();
        }
    }

    useEffect(() => { 
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [])
  
    return (
        <div className={css.overlay} onClick={hideModal}>
            <div className={css.modal}>
                {children}
            </div>
        </div>
    )
}
    
    
export default Modal