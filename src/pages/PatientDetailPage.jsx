import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    height: "",
    weight: "",
  });

  const [bmi, setBmi] = useState(null);
  const [success, setSuccess] = useState(false);

  // Hasta verilerini getir
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setFormData({
          name: res.data.name || "",
          age: res.data.age || "",
          email: res.data.email || "",
          height: res.data.height || "",
          weight: res.data.weight || "",
        });
        setBmi(res.data.bmi || null);
      } catch (err) {
        console.error("Hasta getirilemedi:", err);
      }
    };

    fetchPatient();
  }, [id]);

  // Değişiklikleri takip et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Güncelleme işlemi
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/patients/${id}`, formData);
      setBmi(res.data.bmi);
      setSuccess(true);
    } catch (err) {
      console.error("Hasta güncellenemedi:", err);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h3>Hasta Detayı</h3>
      {success && <Alert variant="success">Bilgiler güncellendi ✅</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Yaş</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
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

            <Form.Group className="mb-4">
              <Form.Label>Beden Kitle İndeksi (BMI)</Form.Label>
              <Form.Control type="text" value={bmi || "-"} disabled />
            </Form.Group>

            <Button type="submit" variant="primary">
              Güncelle
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientDetailPage;
