import { Link } from "react-router-dom";

const TbodyContent = ({element,keys,actions}) =>{
    const formatFecha = (fechaToformat) =>{
        
        const fecha = new Date(fechaToformat);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth()+1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${anio} ${horas}:${minutos}`
    }
    
    return(   
        <tr>
            {keys.map(key => <td className="align-middle" key={key}>{(key == "updated_at") ? formatFecha(element[key]) : element[key]}</td>)}
            {
                (actions) 
                ? 
                    <td className="bg-light">
                        <Link className="btn btn-sm" title="Editar">
                            <img width="20" height="20" src="../images/edit-icon.png"/>
                        </Link>
                        <Link className="btn btn-sm" title="Borrar">
                            <img width="20" height="20" src="../images/remove-icon.png"/>
                        </Link>
                    </td> 
                : 
                    ''
            }
            
        </tr>
    )
}

export default TbodyContent;