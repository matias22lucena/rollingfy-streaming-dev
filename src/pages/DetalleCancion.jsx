import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { cancionesIniciales } from '../helpers/DatosInicio';

const DetalleCancion = () => {
  const { id } = useParams();
  const [cancion, setCancion] = useState(null);

  useEffect(() => {
    let cancionesGuardadas = JSON.parse(localStorage.getItem('canciones')) || [];

    if (cancionesGuardadas.length === 0) {
      localStorage.setItem('canciones', JSON.stringify(cancionesIniciales));
      cancionesGuardadas = cancionesIniciales;
    }

    const cancionEncontrada = cancionesGuardadas.find(
      (cancion) => cancion.id === id
    );

    setCancion(cancionEncontrada);
  }, [id]);

  return (
    <div className="bg-black text-white min-vh-100 py-5">
      <Container>
        {!cancion ? (
          <>
            <h2>No se encontró la canción</h2>

            <Link to="/">
              <Button variant="outline-light">
                Volver al inicio
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Row className="align-items-center g-5">
              <Col xs={12} md={5}>
                <img
                  src={cancion.imagen}
                  alt={cancion.nombre}
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ objectFit: 'cover', maxHeight: '450px' }}
                />
              </Col>

              <Col xs={12} md={7}>
                <p className="text-success fw-bold mb-2">
                  Detalle de canción / artista
                </p>

                <h1 className="display-5 fw-bold mb-3">
                  {cancion.nombre}
                </h1>

                <h4 className="text-secondary mb-4">
                  Artista: {cancion.artista}
                </h4>

                <p>
                  <strong>Canción:</strong> {cancion.nombre}
                </p>

                <p>
                  <strong>Álbum:</strong> {cancion.album}
                </p>

                <p>
                  <strong>Año:</strong> {cancion.anio}
                </p>

                <p>
                  <strong>Género:</strong> {cancion.genero}
                </p>

                <Link to="/">
                  <Button variant="outline-light" className="rounded-pill px-4">
                    Volver al catálogo
                  </Button>
                </Link>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <h3 className="fw-bold mb-3">Reproductor</h3>

                <iframe
                  style={{ borderRadius: '12px' }}
                  src={cancion.url}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={cancion.nombre}
                ></iframe>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default DetalleCancion;