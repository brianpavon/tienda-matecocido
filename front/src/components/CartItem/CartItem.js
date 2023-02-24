import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
const CartItem = ({ id, name, img, price, quantity }) => {
  const { removeItem } = useContext(CartContext)
  return (
    <>
      <tr>
        <th scope="row" className="d-flex justify-content-start">
          <div className="p-2">
            <img src={img} alt={`img-${name}`}  width="70" className="img-fluid rounded shadow-sm"/>
            <div className="ms-3 d-inline-block align-middle">
              <h5 className="mb-0">                
                {name}                
              </h5>              
            </div>
          </div>
        </th>
        <td className="align-middle">
          <strong>${price}</strong>
        </td>
        <td className="align-middle">
          <strong>{quantity}</strong>
        </td>
        <td className="align-middle">
          <button className="btn btn-danger rounded-pill py-2 btn-block" onClick={() => removeItem(id)}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
