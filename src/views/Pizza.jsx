import React from 'react';
import pizzasData from '../../pizzas.json';
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '../context/Context';

export const Pizza = () => {

    const {id} = useParams();
    const {car, setCar} = useContext(Context);

    const product = pizzasData.find((i)=>i.name === id)

    const add = ()=>{
      setCar((currentPizza) => [...currentPizza, product]);
    }

  return (
    <>
      <div className='div-pizza'>
        <img src={product.img} alt={product.name} />
        <div className='div-pizza-int'>
          <div className='div-pizza-int-top'>
            <h3 id="first-letter">{product.name}</h3>
            <p>{product.desc}</p>
            <h5>Ingredientes:</h5>
            <ul>
              {product.ingredients.map((i) => (
                <li key={i.price}>🍕
                <p id="first-letter">{i}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className='div-pizza-int-bottom'>
            <h3>Precio: ${product.price.toLocaleString("de-DE")}</h3>
            <button onClick={() => add()} className='button-pizza'>Añadir🛒</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pizza;
