import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  ListGroup,
} from "react-bootstrap";
import axios from "../axios";

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
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/patients/${id}`);
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

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(
        `/appointments?patientName=${formData.name}`
      );
      setAppointments(res.data);
    };

    if (formData.name) {
      fetchAppointments();
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/patients/${id}`,
        formData
      );
      setBmi(res.data.bmi);
      setSuccess(true);
    } catch (err) {
      console.error("Hasta güncellenemedi:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingTop: "40px" }}>
      <Container style={{ maxWidth: "600px" }}>
        <h3 className="mb-4" style={{ color: "#4CAF50" }}>👤 Hasta Detayı</h3>
        {success && <Alert variant="success">Bilgiler güncellendi ✅</Alert>}

        <Card className="shadow-sm">
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

              <Button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "#fff",
                }}
              >
                Güncelle
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="bg-white shadow-sm rounded mt-4 p-3">
          <h5 className="mb-3">📅 Bu Hastaya Ait Randevular</h5>
          <ListGroup>
            {appointments.length === 0 ? (
              <ListGroup.Item>
                Bu hastaya ait randevu bulunamadı.
              </ListGroup.Item>
            ) : (
              appointments.map((appt) => (
                <ListGroup.Item key={appt._id}>
                  🕒 {new Date(appt.date).toLocaleString("tr-TR")}
                  <br />
                  📝 {appt.note || "Açıklama yok"}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default PatientDetailPage;
