import { useState, useEffect } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import Footer from './components/Footer';
import { db } from './data/db';

function App() {

  const [guitars, setGuitars] = useState([]);

  //Uso useEffect para simular que es una API.
  //NOTA: Para archivos locales puedo setearlo directamente en la definición del useState
  useEffect(() => {
    setGuitars(db);
  }, []);

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {
                guitars.map(() => (
                    <Guitar />
                ))
              }
          </div>
      </main>

      <Footer />
    </>
  )
}

export default App
