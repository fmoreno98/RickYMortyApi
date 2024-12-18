import React, { useState, useEffect } from 'react';
import './Buscador.css';

interface Personaje {
    id: number;
    name: string;
}

function Buscador(props: { palabra: string, plHo: string, setPersonaje: (personaje: { id: number; name: string }) => void }) {
    const [buscador, setBuscador] = useState<string>("");
    const [personajes, setPersonajes] = useState<Personaje[]>([]);
    const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuscador(event.target.value);
    };

    useEffect(() => {
        if (buscador === "") {
            setPersonajes([]);
            setPersonajeSeleccionado(null);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${buscador}`);
                const data = await response.json();
                const results = data.results || [];
                setPersonajes(results);
                if (results.length > 0) {
                    setPersonajeSeleccionado(results[0]);
                } else {
                    setPersonajeSeleccionado(null);
                }
            } catch (error) {
                console.error("Error al obtener los personajes:", error);
                setPersonajes([]);
                setPersonajeSeleccionado(null);
            }
        };

        fetchData();
    }, [buscador]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const idSeleccionado = parseInt(event.target.value);
        const personaje = personajes.find((p) => p.id === idSeleccionado) || null;
        setPersonajeSeleccionado(personaje);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (personajeSeleccionado) {
            console.log("Personaje elegido:", personajeSeleccionado);
            props.setPersonaje({ id: personajeSeleccionado.id, name: personajeSeleccionado.name });
        } else {
            alert("No se encontraron personajes.");
        }
    };

    return (
        <div>
            <input
                className='buscador'
                type="text"
                placeholder={props.plHo}
                value={buscador}
                onChange={handleSearchChange}
            />
            <form onSubmit={handleSubmit}>
                <select
                    disabled={personajes.length === 0}
                    className='select'
                    name="personajes"
                    id="personajes"
                    onChange={handleSelectChange}
                    value={personajeSeleccionado?.id || ""}
                >
                    <option value="" disabled>
                        {personajes.length === 0
                            ? "No hay resultados"
                            : "Selecciona un personaje"}
                    </option>
                    {personajes.map((personaje) => (
                        <option key={personaje.id} value={personaje.id}>
                            {personaje.name} (ID: {personaje.id})
                        </option>
                    ))}
                </select>
                <br />
                <input type="submit" className='elegir' value={props.palabra} />
            </form>
        </div>
    );
}

export default Buscador;
