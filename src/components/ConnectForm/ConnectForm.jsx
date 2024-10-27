// src/components/ContactForm/ContactForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "./ConnectForm.scss";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, phoneNumber, message } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!message) newErrors.message = "Message is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      const emailParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phoneNumber,
        message: formData.message,
      };

      try {
        await emailjs.send(
          "service_xvatvno",
          "template_0e0ueun",
          emailParams,
          "BUsb5TZJEqDXXlbgA"
        );

        Swal.fire({
          title: "Message Sent!",
          text: "We've received your message! We’ll be in *joint* contact soon to keep things *moving* in the right direction. Thanks for reaching out to KinetiScan!",
          icon: "success",
          confirmButtonText: "Return to Home",
          customClass: {
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");  
          }
        });

        setFormData({ name: "", email: "", phoneNumber: "", message: "" });
      } catch (error) {
        console.error("EmailJS Error:", error);
        Swal.fire(
          "Oops!",
          "Something went wrong. Please try again later.",
          "error"
        );
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h1 className="contact-form__title">Connect with Us</h1>
      <div className="contact-form__group">
        <label htmlFor="name" className="contact-form__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="contact-form__input"
        />
        {errors.name && <p className="contact-form__error">{errors.name}</p>}

        <label htmlFor="email" className="contact-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="contact-form__input"
        />
        {errors.email && <p className="contact-form__error">{errors.email}</p>}

        <label htmlFor="phoneNumber" className="contact-form__label">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="contact-form__input"
        />
        {errors.phoneNumber && (
          <p className="contact-form__error">{errors.phoneNumber}</p>
        )}

        <label htmlFor="message" className="contact-form__label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          className="contact-form__input contact-form__textarea"
        />
        {errors.message && (
          <p className="contact-form__error">{errors.message}</p>
        )}
      </div>
      <button className="contact-form__button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
