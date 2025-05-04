import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import axios from "../axios";

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
      await axios.post("/patients", formData);
      setShowSuccess(true);
      setFormData({
        name: "",
        age: "",
        email: "",
        height: "",
        weight: "",
      });
    } catch (error) {
      console.error("Hasta eklenemedi:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingTop: "40px" }}>
      <Container style={{ maxWidth: "600px" }}>
        <Card className="p-4 shadow-sm">
          <h3 className="mb-4 text-center" style={{ color: "#4CAF50" }}>
            👤 Yeni Hasta Ekle
          </h3>

          {showSuccess && (
            <Alert variant="success">Hasta başarıyla eklendi ✅</Alert>
          )}

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

            <Form.Group className="mb-4">
              <Form.Label>Kilo (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                color: "#fff",
                width: "100%",
              }}
            >
              Kaydet
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default AddPatientPage;
