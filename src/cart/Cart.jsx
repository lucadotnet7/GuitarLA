import CartTable from "./components/CartTable";

function Cart({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, totalPrice}) {
    return(
        <div id="carrito" className="bg-white p-3">
            {
                isEmpty ? (
                    <p 
                        className="text-center">
                            El carrito esta vacio
                    </p>
                ) : (
                    <>
                        <CartTable
                            cart={cart}
                            removeFromCart={removeFromCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                        <p 
                            className="text-end">
                                Total pagar: 
                                    <span className="fw-bold">
                                        ${totalPrice}
                                    </span>
                        </p>
                        <button 
                            className="btn btn-dark w-100 mt-3 p-2" 
                            onClick={clearCart}>
                                Vaciar Carrito
                        </button>
                    </>
                )
            }
        </div>
    );
}

export default Cart;