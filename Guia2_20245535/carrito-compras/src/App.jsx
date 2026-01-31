import React, { useState, useEffect} from 'react'
import { Header } from  "./components/Header"
import { Footer } from "./components/Footer";
import { Guitar } from './components/Guitar';
import { db } from "./data/db";



export const App = () => {

function initialCart(){
  const localStorageCard = localStorage.getItem('cart')
  return localStorageCard? JSON.parse(localStorageCard) : []
}

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart) 

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(guitar){
      const itemIndex = cart.findIndex((item)=>guitar.id===item.id) 
      if(itemIndex===-1){
        guitar.quantity=1
        setCart([...cart, guitar])
      }

      else{
        const updatedCart= [...cart]
        updatedCart[itemIndex].quantity++;
        setCart(updatedCart);
      } 
    }

  function calculateTotal(){
    const total = cart.reduce((total, item)=>total+item.price*item.quantity,0);
    return total; 
  }

  function removeFromCart(selectedGuitar){
    const updatedCart = cart.filter(guitar => guitar.id !==selectedGuitar.id);
    setCart(updatedCart);
  }

  function clearCart(){
    setCart([]);
  }

  function reduceAmmount(guitar){
    const itemIndex = cart.findIndex((item)=>guitar.id===item.id);
    if(guitar.quantity===1){
      removeFromCart(guitar);
    }

    else{
      const updatedCart= [...cart]
      updatedCart[itemIndex].quantity--;
      setCart(updatedCart);
    }

  }


  return (
    <>
    <Header cart={cart} total={calculateTotal()} removeFromCart={removeFromCart} clearCart={clearCart} addToCart={addToCart} reduceAmmount={reduceAmmount}/>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
        {data.map((guitar)=>(
          <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}/>))}
        </div>
        </main>
    <Footer/>
    </>
  )
}
