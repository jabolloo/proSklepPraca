import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//


const OrderScreen = () => {
const order = useSelector((state) => state.cart)







  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
  <h1>Zamówienie {order._id}</h1>
  <Row>
    <Col md={8}>
        <ListGroup>
            <ListGroupItem variant='flush'>
            <h1>Adres wysyłki</h1>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
            {order.shippingAddress.address}  <br></br>
            {order.shippingAddress.country}  <br></br>
            {order.shippingAddress.postalCode}   {order.shippingAddress.city}
            </p>
            {order.isDelivered ? <Message variant='success'>Dostarczone {order.paidAt}</Message> : <Message variant='danger'>Nie dostarczone</Message>}
            </ListGroupItem>
            
            <ListGroupItem>
            <h1> Metoda płatności </h1>
            <p>
            {order.paymentMethod}
            </p>
            {order.isPaid ? <Message variant='success'>Zapłacone w {order.paidAt}</Message> : <Message variant='danger'>Brak wpłaty</Message>}
            </ListGroupItem>

            <ListGroupItem>
            <h1> Wybrane produkty </h1>
            {order.orderItems.lenght === 0 ? ( <Message> Zamówienie jest puste </Message> 
            ) : (
            <ListGroup variant='flush'>
            {order.orderItems.map((item, index) => ( 
            <ListGroupItem key={index}>
                <Row>
                    <Col md={1}>
                    <Image src={item.image} alt={item.name}
                    fluid rounded />
                    </Col>
                    
                    <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    
                    <Col md={4}>
                    {item.qty} x {item.price} zł = {item.qty * item.price} zł
                    </Col>
                    </Row>
                </ListGroupItem>
            ))}
                </ListGroup>
        )}
            </ListGroupItem>
        </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Podsumowanie</h2>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Produkty</Col>
                        <Col>{order.itemsPrice} zł</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Wysyłka</Col>
                        <Col>{order.shippingPrice} zł</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col><strong><h1>Suma</h1></strong></Col>
                        <Col>{order.totalPrice} zł</Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    </Col>
</Row>
    </>
}

export default OrderScreen
