import React from "react";
import pizzaData from "../../pizzas.json";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../context/Context";

export const Home = () => {
  const { setCar } = useContext(Context);
  const [homepizzas, setHomepizzas] = useState([]);
  const navigate = useNavigate();

  const add = (i, x) => {
    setHomepizzas((prevHomepizzas) => [...prevHomepizzas, i]);
    setCar((currentHomepizzas) => [...currentHomepizzas, i]);

  }


  const GoToPizza = (name) => {
    navigate(`/Pizza/${name}`);
  };

  return (
    <>
      <div className="div-img-home">
        <img src={pizzaData[5].img} alt="" />
        <div className="text-overimg-home">
          <h1>¡Pizzería Mamma Mía!</h1>
        </div>
      </div>
      <div className="div-products-home" id="div-products-home">
        {pizzaData.map((i, x) => (
          <div key={i.price} className="div-product-home" id={i.id}>
            <img src={i.img} alt={i.name} />
            <h4 id="first-letter">{i.name}</h4>
            <h5>Ingredientes:</h5>
            <ul>
              {i.ingredients.map((i) => (
                <li key={i.price}>🍕
                <p id="first-letter">{i}</p>
                </li>
              ))}
            </ul>
            <h4>$ {i.price.toLocaleString("de-DE")}</h4>
            <div className="div-button">
              <button onClick={() => GoToPizza(i.name)} className="button-home-1" id="allbutton">Ver más👀</button>
              <button onClick={() => add(i, x)} className="button-home-2" id="allbutton">Añadir🛒</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
