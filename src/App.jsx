import { useState, useEffect } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import Footer from './components/Footer';
import { db } from './data/db';

function App() {

  const [guitars, setGuitars] = useState(db);
  const [cart, setCart] = useState([]);
  
  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  function addToCart(guitar) {
    //inmutabilidad en react
    const guitarExists = cart.findIndex((g) => g.id == guitar.id);

    if(guitarExists == -1) {
      guitar.quantity = 1;
      setCart([...cart, guitar]);
    } else {
      const updatedCart = [...cart];
      updatedCart[guitarExists].quantity++;
      setCart(updatedCart);
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity !== MAX_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        };
      }

      return guitar;
    });
  }

  //USAR useEffect para consultar una API.
  //NOTA: Para archivos locales puedo setearlo directamente en la definición del useState
  //useEffect(() => {
    //setGuitars(db);
  //}, []);

  return (
    <>
      <Header
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {
                guitars.map((guitar) => (
                    <Guitar
                      key={guitar.id}
                      guitar={guitar}
                      setCart={setCart}
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