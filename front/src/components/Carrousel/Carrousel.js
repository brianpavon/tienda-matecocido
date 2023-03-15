import Carousel from 'react-bootstrap/Carousel';

function Carrousel({imagenes,className}) {
    return (
        
        <Carousel fade>
            {imagenes.map(img =>                 
                    <Carousel.Item key={img.nombre}>
                        <img className={className} src={`${process.env.REACT_APP_url_server_local}${img.path_img}`} alt={img.nombre}/>            
                    </Carousel.Item>
            )}        
        </Carousel>
    );
}

export default Carrousel;