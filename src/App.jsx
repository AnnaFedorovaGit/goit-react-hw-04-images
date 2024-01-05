import { useState, useEffect } from 'react' 
import SearchBar from './components/Searchbar/Searchbar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import { getAllImages } from './services/images'
import Modal from './components/Modal/Modal'
import Loader from './components/Loader/Loader'
import Button from './components/Button/Button'

import css from './App.module.css'
import cssImageItem from './components/Modal/Modal.module.css'


const App = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('');
    const [largeImage, setLargeImage] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        if (!value) return;

        getImages(page, value);
    }, [value, page])

    const onSubmit = (value) => {
        setValue(value);
        setPage(1);
    }

    const handleLoadMore = () => {
        setPage((prev) => prev + 1)
    }

    const handleOpenModal = (largeImage) => {
        setLargeImage(largeImage);
    }

    const toggleModal = () => {
        setLargeImage(null);
	}

    const getImages = async (page, value) => { 
        try {
            setIsLoading(true);
            setError('');
            const response = await (getAllImages(page, value))
            setImages((prev) => page > 1 ? [...prev, ...response.hits] : response.hits);
            setTotalPages(Math.ceil(response.totalHits / 12));
        } catch (error) {
            setError(error.response.data);
        } finally { 
            setIsLoading(false);
        }
    }

    return (
        <div className={css.wrapper}>
            <SearchBar onSubmit={onSubmit} />
            
            {error && <h1>{error}</h1>}
            {isLoading && <Loader /> }
            <ImageGallery images={images} handleOpenModal={handleOpenModal}/>

            {totalPages > 1 && page !== totalPages && <Button handleLoadMore={handleLoadMore} />}

            {largeImage && <Modal hideModal={toggleModal}><img className={cssImageItem.modal} src={largeImage.largeImageURL} alt={largeImage.tags} /></Modal>}
        </div>
    )
	
}


export default App