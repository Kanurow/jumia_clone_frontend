import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateProductForm from './form/CreateProductForm';
import Register from './form/Register';
import Signin from './form/SignIn';
import PhonesAndTablets from './categories/PhonesAndTablets';
import Supermarket from './categories/Supermarket'
import BabyProducts from './categories/BabyProducts';
import Computing from './categories/Computing';
import Electronics from './categories/Electronics'
import Books from './categories/Books'
import OtherProducts from './categories/OtherProducts';
import Travels from './categories/Travels';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Appliances from './categories/Appliances';
import DepositeIntoJumiaAccount from './pages/DepositeIntoJumiaAccount';
import ViewProduct from './pages/ViewProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Signin />} />
          <Route exact path="/createProduct" element={<CreateProductForm />} />
          <Route exact path='/phonesAndTablets' element={<PhonesAndTablets />}></Route>
          <Route exact path="/computing" element={<Computing />} />
          <Route exact path="/babyProducts" element={<BabyProducts />} />
          <Route exact path="/supermarket" element={<Supermarket />} />
          <Route exact path="/electronics" element={<Electronics />} />
          <Route exact path="/travels" element={<Travels />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/appliances" element={<Appliances />} />
          <Route exact path="/others" element={<OtherProducts />} />
          <Route exact path="/viewProduct/:id" element={<ViewProduct />} />

          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/orderHistory" element={<OrderHistory />} />
          <Route exact path="/deposite" element={<DepositeIntoJumiaAccount />} />


        </Routes>

        

      </Router>

    </div>
  );
}

export default App;
