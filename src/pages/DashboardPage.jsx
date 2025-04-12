import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";

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
    <Container className="mt-5">
      

      <h2 className="mb-4 text-center">Diyetisyen Paneli</h2>

      <Form.Control
        type="text"
        placeholder="Hasta ara (isim veya email)"
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
              <Card>
                <Card.Body>
                  <Card.Title>{patient.name}</Card.Title>
                  <Card.Text>Yaş: {patient.age}</Card.Text>
                  <Card.Text>
                    Email: {patient.email || "Belirtilmemiş"}
                  </Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/patient/${patient._id}`}
                  >
                    Detay
                  </Button>
                  <Button
                    variant="danger"
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

      <Link to="/add-patient">
        <Button variant="success" className="mb-4">
          + Yeni Hasta Ekle
        </Button>
      </Link>
    </Container>
  );
};

export default DashboardPage;
