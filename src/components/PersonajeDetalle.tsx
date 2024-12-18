import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './PersonajeDetalle.css';

function PersonajeDetalle() {
    interface PersonajeDet {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        url: string;
        created: string;
    }

    let [data, setData] = useState<PersonajeDet | null>(null);
    let [episodeNames, setEpisodeNames] = useState<string[]>([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/' + id)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        if (data) {
            Promise.all(data.episode.map(ep =>
                fetch(ep)
                    .then(response => response.json())
            ))
                .then(episodes => {
                    let episodeIds = episodes.map(ep => ep.id);
                    console.log(episodeIds, "episodeIds");

                    // Hacer llamadas adicionales para obtener los nombres de los episodios
                    return Promise.all(episodeIds.map(id =>
                        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
                            .then(response => response.json())
                    ));
                })
                .then(episodesWithNames => {
                    let episodeNames = episodesWithNames.map(ep => ep.name);
                    console.log(episodeNames, "episodeNames");
                    // Aquí puedes actualizar el estado con los nombres de los episodios
                    setEpisodeNames(episodeNames);
                })
                .catch(error => console.error(error));
        }
    }, [data]);

    return (
        <>
            {
                data ? (
                    <Container>
                        <Row>
                            <h1>{data.name}</h1>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                                <img className="imagen" src={data.image} alt="" />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                                <p><span className='titleSpan'>Status:</span> <span style={{
                                    color: data.status === 'Alive' ? 'rgba(0, 255, 85, 0.589)' : data.status === 'unknown' ? '#fffff;' : 'red'
                                }}>{data.status}</span></p>
                                <p><span className='titleSpan'>Species: </span> {data.species}</p>
                                <p><span className='titleSpan'>Gender: </span> {data.gender}</p>
                                <p><span className='titleSpan'>Origin: </span> {data.origin.name}</p>
                                <p><span className='titleSpan'>Location: </span> {data.location.name}</p>
                                <p><span className='titleSpan'>Episode: </span> {episodeNames.join(' | \n ')}</p>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <p>Cargando...</p>
                )
            }
        </>
    );
}
export default PersonajeDetalle;
