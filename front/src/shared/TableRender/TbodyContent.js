import { Link } from "react-router-dom";
import { modalDelete } from "../../notification/NotificationService";

const TbodyContent = ({element,keys,actions,functionDelete}) =>{
    
    const formatFecha = (fechaToformat) =>{        
        const fecha = new Date(fechaToformat);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth()+1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${anio} ${horas}:${minutos}`
    }

    const sureToDelete = async() => {
        //console.log(element['codigo']);
        const code = element.codigo;
        const confirm = await modalDelete('el producto');
        if(confirm){
            functionDelete(code)
        }
    }
    
    return(   
        <tr>
            { keys.map(key => key==='imagenes' ? <td className="align-middle" key={`img-${key}`}><img width="40" height="50" src={process.env.REACT_APP_url_server_local+element[key][0].path_img} alt="img-edit"/></td> : '')}
            { keys.map(key => key==='imagenes' ? '' : <td className="align-middle" key={`td${element[key]}`}>{(key === "updated_at") ? formatFecha(element[key]) : element[key]}</td>)}
            {
                (actions) 
                ? 
                    <td className="bg-light">                        
                        <Link className="btn btn-sm" title="Editar" to={`/backoffice/productos/editar-producto/${element['codigo']}`} state={element}>
                            <img width="20" height="20" src="../images/edit-icon.png" alt="img-edit"/>
                        </Link>
                        <button className="btn btn-sm" title="Borrar" onClick={sureToDelete}>
                            <img width="20" height="20" src="../images/remove-icon.png" alt="img-remove"/>
                        </button>
                    </td> 
                : 
                    ''
            }
            
        </tr>
    )
}

export default TbodyContent;