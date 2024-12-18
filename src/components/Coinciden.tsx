import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Buscador from "./Buscador";
import './Coinciden.css';

function Coinciden(props: { personajes: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [personaje1, setPersonaje1] = useState<{ id: number; name: string } | null>(null);
    const [personaje2, setPersonaje2] = useState<{ id: number; name: string } | null>(null);
    const [coincidencias, setCoincidencias] = useState<string[]>([]);

    const obtenerEpisodios = (personaje: any) => {
        return personaje.episode.map((episodio: string) => episodio.split("/").pop());
    };

    const buscarCoincidencias = () => {
        if (!personaje1 || !personaje2) {
            alert("Selecciona ambos personajes antes de buscar coincidencias.");
            return;
        }

        // Buscar información detallada de los personajes seleccionados
        const personaje1Data = props.personajes.find((p: any) => p.name === personaje1.name);
        const personaje2Data = props.personajes.find((p: any) => p.name === personaje2.name);

        if (!personaje1Data || !personaje2Data) {
            alert("No se encontraron datos para los personajes seleccionados.");
            return;
        }

        const episodios1 = obtenerEpisodios(personaje1Data);
        const episodios2 = obtenerEpisodios(personaje2Data);

        // Calcular la intersección de episodios
        const episodiosCoincidentes = episodios1.filter((episodio: string) =>
            episodios2.includes(episodio)
        );

        setCoincidencias(episodiosCoincidentes);
    };

    return (
        <>
            <div>
                <button className="modalBtn" onClick={handleShow}>
                    Ver coincidencia de episodios
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className="custom-modal">
                    <Modal.Title>Encuentra en qué capítulo coinciden dos personajes</Modal.Title>
                    <Buscador palabra="Elegir" plHo="Personaje 1" setPersonaje={(personaje) => setPersonaje1(personaje)} />
                    <Buscador palabra="Elegir" plHo="Personaje 2" setPersonaje={(personaje) => setPersonaje2(personaje)} />

                    <button className="coincidenciasBtn" onClick={buscarCoincidencias}>Buscar coincidencias</button>

                    {coincidencias.length > 0 ? (
                        <div>
                            <h5>Episodios coincidentes:</h5>
                            <ul>
                                {coincidencias.map((episodio) => (
                                    <li key={episodio}>Episodio {episodio}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No hay episodios en común o no se han buscado todavía.</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Coinciden;
