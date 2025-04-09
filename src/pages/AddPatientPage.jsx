import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios"; // 📌 eklendi

const AddPatientPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    height: "",
    weight: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/patients", formData); // 🔗 bağlantı burada
      setShowSuccess(true);
      setFormData({ name: "", age: "", email: "" });
    } catch (error) {
      console.error("Hasta eklenemedi:", error);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3>Yeni Hasta Ekle</h3>
      {showSuccess && <Alert variant="success">Hasta başarıyla eklendi!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ad Soyad</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Yaş</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Boy (cm)</Form.Label>
          <Form.Control
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kilo (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Kaydet
        </Button>
      </Form>
    </Container>
  );
};

export default AddPatientPage;
