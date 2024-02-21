import React, { useContext } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {
  const { setCar, car } = useContext(Context);

  const navigate = useNavigate();
  const navigate1 = useNavigate();

  // Ordeno mi Context tipo arreglo de objetos alfabeticamente
  car.sort((a, b) => (a.name > b.name ? 1 : -1));

  // Creo un conjunto de datos Set()
  const pizzas = new Set();
  // Render es un objeto local que se usará para renderizar
  const render = [];

  // Iteramos sobre el contexto "car". Desestructuro la propiedad "name" de i, don i seria cada objeto de mi Array. Luego, se emplea la condición: si no existe dentro de mi estructura (set()) de datos "pizzas" la propiedad "name" (ejemplo:"española"), entonces agréguela a "pizzas". Seguidamente, ese objeto (i), que sí cumplió con la condición, agréguelo a mi array "render" quien será aquel que mapearemos en el return del componente. Finalmente, agrego una nueva propiedad a mi objeto actual (i) llamada "sum" y, en esta, a su vez, agrego la longitud del array (conteo de pizzas) que, a raiz del filter, he hallado y tienen exactamente el mismo nombre que posee mi propiedad desestructurada "name".
  car.forEach((i) => {
    const { name } = i;
    if (!pizzas.has(name)) {
      pizzas.add(name);
      render.push(i);
      i.sum = car.filter((i) => i.name === name).length;
    }
  });

  // Función para agregar o eliminar pizzas desde la vista "carrito". En primera instancia, he expandido el arreglo de objetos y he agregado el nuevo objeto (pizza). Como estoy usando la funcion set de mi contexto, este objeto agregado se ordena alfabeticamente al actualizar el estado. Para eliminar el objeto, o más bien, que el filter omitiera el objeto que deseamos remover, tuve que usar una variable (deleted) que sirviera como especie de bandera: al modificar su valor a "true", una vez que se encuentre el primer elemento que cumpla la condición (coincidan los nombres), no hay forma de que esta condicón vuelva a ser verdadera, por ello, no se retornará nuevamente false y así se habrá omitido solo una pizza (objeto), aquella que se desea eliminar del carrito.
  const add = (bolean, name, object) => {
    if (bolean) setCar((currentObj) => [...currentObj, object]);
    else
      setCar((currentObj) => {
        let deleted = false;
        return currentObj.filter((i) => {
          if (!deleted && i.name === name) {
            deleted = true;
            return false;
          }
          return true;
        });
      });
  };

  // Se crea la posibilidad de acceder desde el carrito al detalle de cada pizza.
  const GoToPizza = (name) => {
    console.log(name);
    navigate(`/Pizza/${name}`);
  };

  const GoToHome = ()=>{
    navigate1(`/`);
  }

  const Total = () => {
    let sum = 0;
    for (const i of car) 
      sum = sum + i.price;

    return sum.toLocaleString("de-DE");
  };

  return (
    <>
      {car.length == 0 ? (<div className="car0"><p>¡Ops! Esto parece estar vacío <p className="tohome" onClick={()=>GoToHome()}>Ir a añadir</p></p></div>) : (<section>
        <p className="detalle_del_pedido">Detalle del pedido:</p>
        {render.map((i, x) => (
          <div className="carrito-pizza" key={i.name}>
            <div className="carrito-pizza-left">
              <img src={i.img} alt={i.name} />
              <p
                onClick={() => {
                  GoToPizza(i.name);
                }}
                id="first-letter"
              >
                {i.name}
              </p>
            </div>
            <div className="carrito-pizza-right">
              <p>${(i.sum * i.price).toLocaleString("de-DE")}</p>
              <div className="carrito-pizza-right-int">
                <button
                  onClick={() => add(false, i.name, i)}
                  className="button-carrito-1"
                >
                  -
                </button>
                <h5>{i.sum}</h5>
                <button
                  onClick={() => add(true, i.name, i)}
                  className="button-carrito-2"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <p className="p-total">Total: ${Total()}</p>
        <button className="button-pagar">Ir a pagar</button>
      </section>)}
    </>
  );
};
export default Carrito;
