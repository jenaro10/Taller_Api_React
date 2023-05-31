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
    </div>
  );
};

export default PeticionApi;
