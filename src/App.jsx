import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home'
import Pizza from './views/Pizza'
import Carrito from './views/Carrito'
import Navegacion from './components/Navegacion'
import ContextProvider from './context/Context';

function App() {

  return (
    <>
    <ContextProvider>
    <Navegacion />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/carrito' element={<Carrito />}/>
      <Route path='/pizza/:id' element={<Pizza/>}/>
    </Routes>
    </ContextProvider>
    </>
  )
}

export default App;
