import { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import Tarjeta from './components/Tarjeta';
import Buscador from './components/Buscador';
import Coinciden from './components/Coinciden';
import './App.css';

interface Personaje {
  id: number;
  name: string;
  image: string;
}

function App() {
  const [data, setData] = useState<Personaje[]>([]);
  const [personaje, setPersonaje] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setData(data.results);
        setTotalPages(data.info.pages);
      })
      .catch(error => console.error(error));
  }, [currentPage]);

  useEffect(() => {
    if (personaje) {
      console.log('Buscando personaje:', personaje);
      fetch(`https://rickandmortyapi.com/api/character/?name=${personaje}`)
        .then(response => response.json())
        .then(data => {
          setData(data.results);
        })
        .catch(error => console.error(error));
    }
  }, [personaje]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {data.length > 0 ? (
        <Container>
          <Row>
            <img src="/logo.png" alt="" style={{ width: '400px', height: '150px', margin: 'auto' }} />
          </Row>
          <Row>
            <Buscador palabra="Buscar" plHo='Buscar personaje' setPersonaje={setPersonaje} />
            <Coinciden personajes={data} />
          </Row>
          <Row>
            {data.map((personaje) => (
              <Col key={personaje.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Tarjeta id={personaje.id} nombre={personaje.name} imagen={personaje.image} />
              </Col>
            ))}
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col>

              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                >
                  Atrás
                </Pagination.Prev>
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}

export default App;
