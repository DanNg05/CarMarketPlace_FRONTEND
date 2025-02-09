import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Store.css'

const Store = () => {
  const { id } = useParams();
  // const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  const goToCar = useNavigate();

  useEffect(() => {
    // Fetch data from back-end "/api/stores/:id"
    const fetchStore = async () => {
      try {
        const response = await fetch(`http://localhost:5151/api/stores/${id}`);
        if (!response.ok) {
          throw new Error(`Cannot fetch! Status: ${response.status}`);
        }
        const data = await response.json();
        // setStoreData(data);
        setCars(data?.cars);
      }
      catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  // console.log(cars);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  // console.log(storeData);
  return (
    <div className='container cars-grid'>
      {/* <p>{storeData.name}</p> */}
      {cars.map((car) => (
        <div key={car.id} className='car' onClick={() => goToCar(`/cars/${car.id}`)}>
        <img
        className='car-image'
        src={car.imageUrls[0]} alt={car.model} width={'550px'} height={'auto'} />
        <p className='car-info'>Model: {car.model}</p>
        <p className='car-info'>Odometer: {car.odometer} km</p>
        <p className='car-info'>Price: {car.price} AUD</p>
        </div>
      ))}
    </div>
  )
}

export default Store
