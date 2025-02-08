import axios from 'axios';
import React, { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({ to: "", subject: "", body: "" });
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5151/api/email/send", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send email.");
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <input type="email" name="to" placeholder="Recipient Email" required onChange={(e) => setFormData({ ...formData, to: e.target.value })} />
      <input type="text" name="subject" placeholder="Subject" required onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
      <textarea name="body" placeholder="Message" required onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
      <button type="submit">Send Email</button>
      <p>{message}</p>
    </form>
  );
}

export default ContactForm;
