import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaCogs } from "react-icons/fa";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    clinicName: "Sağlıklı Yaşam Diyet Kliniği",
    workingHours: "09:00 - 18:00",
    language: "tr",
    appointmentDuration: 30,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ayarlar kaydedildi!");
    // ileride API isteği yapılabilir
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4 d-flex align-items-center">
        <FaCogs style={{ color: "#0d6efd", fontSize: "1.8rem", marginRight: "10px" }} />
        Sistem Ayarları
      </h3>

      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Klinik Adı</Form.Label>
              <Form.Control
                type="text"
                name="clinicName"
                value={settings.clinicName}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Çalışma Saatleri</Form.Label>
              <Form.Control
                type="text"
                name="workingHours"
                value={settings.workingHours}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Varsayılan Dil</Form.Label>
              <Form.Select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="tr">Türkçe</option>
                <option value="en">İngilizce</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Randevu Süresi (dk)</Form.Label>
              <Form.Control
                type="number"
                name="appointmentDuration"
                value={settings.appointmentDuration}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Ayarları Kaydet
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SystemSettings;
