import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import { useRef } from 'react';


export const Navegacion = () => {

  const {car} = useContext(Context);
  const changeCar = useRef();
  const changeCar1 = useRef();
  

  useEffect(()=>{
    if(car.length == 0){
      changeCar.current.style.display = 'none'
      changeCar1.current.style.display = 'none'
    }else{
      changeCar.current.style.display = 'block'
      changeCar1.current.style.display = 'block'
    }
  },[car])

  

  const Total = ()=>{
    let sum = 0;
    
      for (const i of car) sum = sum + i.price;
      return (
          <div className='total'>
            <p className='total-p1' id='carrito'>🛒</p>
            <p className='total-p2' ref={changeCar1}>({car.length})</p>
            <p className='total-p3' ref={changeCar}>${sum.toLocaleString()}</p>
          </div>
      );
    
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navegation" id='navegation'> 
        <Container>
          <Nav className='navegation-nav'> 
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "isActive" : "isntActive"
              }
              style={{textDecoration:'none'}}
            >
              <div>
                <p>🏡Pizzaría Mamma Mía</p>
              </div>
            </NavLink>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                isActive ? "isActive" : "isntActive"
              }
              style={{textDecoration:'none'}}
            >
                {Total()}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <nav></nav>
    </>
  );
}
export default Navegacion;
