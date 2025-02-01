import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/CarStyling.css'
const Car = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
      // Fetch data from back-end "/api/cars/:id"
      const fetchStore = async () => {
        try {
          const response = await fetch(`http://localhost:5151/api/cars/${id}`);
          if (!response.ok) {
            throw new Error(`Cannot fetch! Status: ${response.status}`);
          }
          const data = await response.json();
          setCarData(data);
        }
        catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchStore();
    }, [id]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

  return (
    <div className='container'>
        <p>Model:{carData.model}</p>
        <p>Odometer: {carData.odometer}</p>
        <p>Price: {carData.price}</p>

        {/* Test Image Gallery */}
        <div className="image-gallery">
          {/* Main Image */}
          <div className="main-image">
            <img src={carData.imageUrls[0]} alt="Main Cover" onClick={() => setShow(true)}/>
          </div>

          {/* Thumbnails */}
          <div className="thumbnails">
            <div className="thumbnail">
              <img src={carData.imageUrls[1]} alt="Thumbnail 1" onClick={() => setShow(true)}/>
            </div>
            <div className="thumbnail">
              <img src={carData.imageUrls[2]} alt="Thumbnail 1" onClick={() => setShow(true)}/>
            </div>
          </div>
    </div>



          <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
            <Modal.Header closeButton>
              <Modal.Title className="w-100 text-center">{carData.make} {carData.model} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel>
                {carData.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={imageUrl}
                      alt={`${index + 1} of ${carData.make} ${carData.model}`}
                      style={{
                        maxHeight: "100%",
                        width: "auto",
                        objectFit: "contain"
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Modal.Body>
          </Modal>
        {/* {console.log(car.imageUrls[0])} */}
        </div>
  )
}

export default Car
