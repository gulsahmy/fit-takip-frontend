import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Hastalar alınamadı:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu hastayı silmek istediğine emin misin?")) {
      try {
        await axios.delete(`http://localhost:5000/api/patients/${id}`);
        setPatients((prev) => prev.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingTop: "40px" }}>
      <Container>
        <h2 className="mb-4 text-center" style={{ color: "#4CAF50" }}>
          Diyetisyen Paneli
        </h2>

        <Form.Control
          type="text"
          placeholder="🔍 Hasta ara (isim veya email)"
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Row>
          {patients
            .filter(
              (p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.email &&
                  p.email.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((patient) => (
              <Col key={patient._id} md={4} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{patient.name}</Card.Title>
                    <Card.Text>Yaş: {patient.age}</Card.Text>
                    <Card.Text>
                      Email: {patient.email || "Belirtilmemiş"}
                    </Card.Text>
                    <Button
                      as={Link}
                      to={`/patient/${patient._id}`}
                      style={{
                        backgroundColor: "#1976D2",
                        borderColor: "#1976D2",
                        color: "#fff",
                      }}
                    >
                      Detay
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#E53935",
                        borderColor: "#E53935",
                        color: "#fff",
                      }}
                      onClick={() => handleDelete(patient._id)}
                      className="ms-2"
                    >
                      Sil
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>

        <div className="mt-4">
          <Link to="/add-patient">
            <Button
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              + Yeni Hasta Ekle
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
