import './Tarjeta.css'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

function Tarjeta(props: { id: number, nombre: string, imagen: string }) {
    return (
        <>
            <Container>
                <Link to={`/personaje/${props.id}`} className="tarjeta">
                    <Row>
                        <img src={props.imagen} alt="" />
                    </Row>
                    <Row>
                        <h1>{props.nombre}</h1>
                    </Row>
                </Link>
            </Container>
        </>
    )
}

export default Tarjeta