import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'

import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
//import DevScreen from './screens/DevScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'

import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>

          <Route path="/" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />

          <Route path="/register" component={RegisterScreen}  />
          <Route path="/login" component={LoginScreen}  />
          <Route path="/profile" component={ProfileScreen}  />
          <Route path="/admin/userlist" component={UserListScreen}  />
          <Route path="/admin/user/:id/edit" component={UserEditScreen}  />
          <Route path="/admin/productlist" component={ProductListScreen}  exact/>
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen}  />

          
          <Route path="/product/:id" component={ProductScreen}  />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/shipping" component={ShippingScreen}  />
          <Route path="/payment" component={PaymentScreen}  />
          <Route path="/placeorder" component={PlaceOrderScreen}  />
          <Route path="/order/:id" component={OrderScreen}  />
          <Route path="/admin/orderlist" component={OrderListScreen}  />

        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
