import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Homepage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch data from the backend
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:5151/api/store');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(stores)
  return (
    <div class="container mt-5">
      <div class="stores">
        {stores.map((store) => (
          <div>
            {/* <strong>{store.name}</strong> */}
            <img src={store.imageUrl} alt={store.name} width={'200px'} height={'auto'} />
            <p>Address: {store.address} </p>
            <p>Phone Number: <a href={`tel:${store.phoneNumber}`}>{store.phoneNumber}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
