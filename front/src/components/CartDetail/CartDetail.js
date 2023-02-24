import CartItem from "../CartItem/CartItem";

const CartDetail = ({ cart }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase"></div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Precio</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Cantidad</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map(prod => <CartItem key={prod.id} {...prod}/>)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartDetail;
