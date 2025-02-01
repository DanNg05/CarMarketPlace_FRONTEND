import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Store = () => {
  const { id } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);


  useEffect(() => {
    // Fetch data from back-end "/api/stores/:id"
    const fetchStore = async () => {
      try {
        const response = await fetch(`http://localhost:5151/api/stores/${id}`);
        if (!response.ok) {
          throw new Error(`Cannot fetch! Status: ${response.status}`);
        }
        const data = await response.json();
        setStoreData(data);
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
    <div className='container'>
      {/* <h1>Store is here</h1> */}
      <p>{storeData.name}</p>
      {cars.map((car) => (
        <div key={car.id}>
        <p>Model:<Link to={`/cars/${car.id}`}>{car.model}</Link></p>
        <p>Odometer: {car.odometer}</p>
        <p>Price: {car.price}</p>
        <img src={car.imageUrls[0]} alt={car.model} width={'550px'} height={'auto'} />
        {/* {console.log(car.imageUrls[0])} */}
        </div>
      ))}
    </div>
  )
}

export default Store
