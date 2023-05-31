import React, { useState, useEffect } from 'react';

const PeticionApi = () => {
  const [productos, setProductos] = useState([]);
  const [paginacion, setPaginacion] = useState(1);

  useEffect(() => {
    traerProductos();
  }, [paginacion]);

  const traerProductos = async () => {
    try {
      const resp = await fetch(
        `https://servicios.neunapp.com/api/tienda/productos/lista/?page=${paginacion}`
      );
      const data = await resp.json();
      const nuevosProductos = data.results;
      setProductos(nuevosProductos);
    } catch (error) {
      console.log(error);
    }
  };

  const siguientePagina = () => {
    setPaginacion(paginacion + 1);
    setProductos([]);
  };

  const anteriorPagina = () => {
    if (paginacion > 1) {
      setPaginacion(paginacion - 1);
      setProductos([]);
    }
  };

  return (
    <div>
      <h1 className="text-center">Lista de Productos</h1>
      <button className="btn btn-primary" onClick={anteriorPagina} disabled={paginacion === 1}>
        Anterior
      </button>
      <button className="btn btn-primary" onClick={siguientePagina} disabled={paginacion ===2}>Siguiente</button>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-6" key={producto.id}>
            <div className="card">
              <img className="card-img-top img-fluid" src={producto.main_image} alt={producto.name} style={{ height: '500px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{producto.name}</h5>
                <p className="card-text">Precio: {producto.price}</p>
                   </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeticionApi;
