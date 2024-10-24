
import { useCart } from './hooks/useCart';
import Guitar from './components/Guitar';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const { 
    guitars, cart, addToCart, removeFromCart, 
    decreaseQuantity, increaseQuantity, clearCart,
    isEmpty, totalPrice
  } = useCart();

  return (
    <>
      <Header
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        totalPrice={totalPrice}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {
                guitars.map((guitar) => (
                    <Guitar
                      key={guitar.id}
                      guitar={guitar}
                      addToCart={addToCart}
                    />
                ))
              }
          </div>
      </main>

      <Footer />
    </>
  )
}

export default App