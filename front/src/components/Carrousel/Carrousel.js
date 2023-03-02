import Carousel from 'react-bootstrap/Carousel';

function Carrousel({imagenes}) {
    
    return (
        
        <Carousel fade>
            {imagenes.map(url =>                 
                    <Carousel.Item key={url}>
                        <img className="card-img-top" src={url} alt="product-image"/>            
                    </Carousel.Item>
            )}        
        </Carousel>
    );
}

export default Carrousel;