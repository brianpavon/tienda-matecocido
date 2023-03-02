import Carousel from 'react-bootstrap/Carousel';

function Carrousel({imagenes,className}) {
    
    return (
        
        <Carousel fade>
            {imagenes.map(url =>                 
                    <Carousel.Item key={url}>
                        <img className={className} src={url} alt="product-image"/>            
                    </Carousel.Item>
            )}        
        </Carousel>
    );
}

export default Carrousel;