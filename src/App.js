import './App.css';
import Products from './pages/Products';
import Navbar from './pages/components/Navbar';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
    <Navbar/>
     <Routes>
       <Route path='/' element={<Products/>}/>
       <Route path='/product' element={<ProductPage/>}/>
       <Route path='/cart' element={<Cart/>}/>
     </Routes>
    </Router>
  );
}

export default App;
