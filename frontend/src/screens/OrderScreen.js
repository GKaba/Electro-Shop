import React, { useState, useEffect } from 'react'
import axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import {  Row, Col, Image, ListGroup, Card ,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { deliverOrder, getOrderDetails ,payOrder} from '../actions/orderActions'
import  {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match,history }) => {
  const orderId = match.params.id

  const [sdkReady,setSdkReady]=useState(false)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  if (!loading) {
    //Calculate Prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
 

  useEffect(() => {

      if(!userInfo)
      {
        history.push('/login')
      }
    const addPayPalScript =async ()=>{
      const {data:clientId}=await axios.get('/api/config/paypal')
      const script =document.createElement('script');
      script.type='text/javascript'
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async=true
      script.onload=()=>{
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    
//|| order._id !== orderId 
      if(!order || successPay || successDeliver|| order._id !== orderId)
      {
        dispatch({type:ORDER_PAY_RESET})
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
      }else if(!order.isPaid)
      {
        if(!window.paypal){
          addPayPalScript()
        }else{
          setSdkReady(true)
        }
      }
    
    // eslint-disable-next-line 
  }, [dispatch,orderId,successPay,order,successDeliver])

  

const successPaymentHandler=(paymentResult)=>{

  dispatch(payOrder(orderId,paymentResult))

}
const deliverHandler=()=>{

  dispatch(deliverOrder(orderId))
}

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong > Shipping To: </strong> {order.user.name}</p>
              <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode} ,{' '}
                {order.shippingAddress.city}
              </p>
              <p>{order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt.substring(0,10)}</Message> :<Message variant='danger'>Not Delivered</Message>}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
             <p><strong>Method: </strong>
              {order.paymentMethod}</p>
              <p>{order.isPaid ? <Message variant="success">Paid On {order.paidAt.substring(0,10)}</Message> :<Message variant='danger'>Not Paid</Message>}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty !</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {order.shippingPrice === 0 ? (
                    <Col className="text-danger">Shipping free</Col>
                  ) : (
                    <Col>${order.shippingPrice}</Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax (GST & QST)</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid ? (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                  )}
                </ListGroup.Item>
              ): userInfo && userInfo.isAdmin && !successDeliver && !order.isDelivered && (
              <ListGroup.Item>
                 {loadingDeliver && <Loader/>}
                <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
              </ListGroup.Item>)
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen