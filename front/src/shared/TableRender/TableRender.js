import Table from 'react-bootstrap/Table';
import TbodyContent from './TbodyContent';
import Thead from './Thead';

const TableRender = ({elements,haveActions,element,functionToDelete}) => {
    //no quiero mostrar en la tabla el id de la db ni el created    
    const keysExcluidas = ["created_at",`id_${element}`,'categorias','colores']
    const keysElement = Object.keys(elements[0]).filter(key => !keysExcluidas.includes(key));    
    return(
        <Table striped bordered hover className='mt-5 shadow'>
            <Thead thElements={keysElement} actions={haveActions}/>
            <tbody>
                {elements.map( obj => (<TbodyContent actions={haveActions} key={`td-${obj.codigo}`} element={obj} keys={keysElement} functionDelete={functionToDelete}/>) )}                
            </tbody>
        </Table>
    )
}

export default TableRender;