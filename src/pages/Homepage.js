import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import '../styles/HomePage.css';
// import CarDeal from '../photos/CarDeal.jpg';

const Homepage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch data from the backend
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:5151/api/stores');
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

  // console.log(stores)
  return (
    <div className="container">
      <div className='welcome'>
        <p id='welcome-p'>Welcome to Car Marketplace</p>
      </div>
      <div className="stores">
        {stores.map((store) => (
          <div key={store.id} className='store'>
            {/* <strong>{store.name}</strong> */}
            <div className='store-image'>
              <Link to={`/stores/${store.id}`}>
                <img src={store.imageUrl} alt={store.name} width={'200px'} height={'auto'} />
              </Link>
            </div>

            <p>Address: {store.address} </p>
            <p>Phone Number: <a href={`tel:${store.phoneNumber}`}>{store.phoneNumber}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
