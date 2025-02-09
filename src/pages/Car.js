import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/CarStyling.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGaugeSimpleHigh, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';


const Car = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ UserEmail: "", Subject: "", Message: "" });
  const [message, setMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

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

    // Sending Email
    const sendEmail = async (e) => {
      e.preventDefault();
      setEmailLoading(true);

      try {
        const response = await axios.post("http://localhost:5151/api/email/send", formData);
        setMessage(response.data.message);
        // Reset form fields after submission
        setFormData({ UserEmail: "", Subject: "", Message: "" });
      } catch (error) {
        setMessage("Failed to send email.");
        console.log(error)
      }
      setEmailLoading(false)
    };

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

  return (
    <div className='container'>
      <div className='car-info mt-3'>

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
      <div className='car-infos'>
        <p className='car-info'><FontAwesomeIcon icon={faCar} /> {carData.model}</p>
        <p className='car-info'><FontAwesomeIcon icon={faMoneyBill} /> {carData.price} AUD</p>
        <p className='car-info'><FontAwesomeIcon icon={faGaugeSimpleHigh} /> {carData.odometer} km</p>
      </div>
      <div className='email-form'>
        <h3>Get in touch with seller</h3>
        <form onSubmit={sendEmail}>
          <div className='email-div'>
              <label htmlFor="UserEmail">Your Email Address:</label>
              <input type="email" name="UserEmail"
              placeholder="Your Email Address"
              id='form-email'
              required
              value={formData.UserEmail}
              disabled={emailLoading}
              onChange={(e) => setFormData({ ...formData, UserEmail: e.target.value })} />
          </div>

          <div className='subject-div'>
            <label htmlFor="Subject">Subject:</label>
            <input type="text" name="Subject"
            placeholder="Subject"
            id='form-subject'
            required
            value={formData.Subject}
            disabled={emailLoading}
            onChange={(e) => setFormData({ ...formData, Subject: e.target.value })} />
          </div>


          <div className='message-div'>
            <label htmlFor="UserEmail">Your Message:</label>
            <textarea name="Message"
            id='form-message'
            placeholder="Message"
            required
            value={formData.Message}
            disabled={emailLoading}
            onChange={(e) => setFormData({ ...formData, Message: e.target.value })}></textarea>
          </div>
          <div className='d-flex justify-content-center'>
            <Button variant="primary" type="submit" disabled={emailLoading}>{emailLoading ? "Submitting..." : "Submit Request" }</Button>
          </div>
          <p>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Car
