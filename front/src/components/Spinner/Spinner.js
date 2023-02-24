import './Spinner.css'
const Spinner = ({message}) =>{
    return(
        <>
            <div className="mt-4">
                <div className="spinner-border color-spinner" role="status">            
                </div>
                <h6>{message ? message : 'Aguarde...'}</h6>
            </div>
        </>
    )
}

export default Spinner
