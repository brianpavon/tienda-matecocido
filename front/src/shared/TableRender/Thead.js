const Thead = ({thElements,actions}) =>{
    
    return(
        <thead>
            <tr className="text-capitalize text-center bg-dark text-white">            
                {thElements.map(el => <th key={el}>{(el == "updated_at") ? "actualizado" : el}</th>)}
                {(actions) ? <th></th> : ''}
            </tr>
        </thead>
    )
}

export default Thead;