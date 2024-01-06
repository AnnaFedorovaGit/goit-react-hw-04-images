import { useEffect, useCallback } from 'react'; 
import css from './Modal.module.css'

const Modal = ({ hideModal, children }) => {

    const handleEsc = useCallback((e) => {
        if (e.code === 'Escape') {
            hideModal();
        }
    }, [hideModal])

    useEffect(() => { 
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [handleEsc])
  
    return (
        <div className={css.overlay} onClick={hideModal}>
            <div className={css.modal}>
                {children}
            </div>
        </div>
    )
}
    
    
export default Modal