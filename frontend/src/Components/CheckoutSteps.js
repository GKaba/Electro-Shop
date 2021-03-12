import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (

    <Nav className="justify-content-center mb-2">

      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className='text-success'>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='text-danger'>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='text-success'>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='text-danger'>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='text-success'>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='text-danger'>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className='text-success'>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='text-danger'>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
