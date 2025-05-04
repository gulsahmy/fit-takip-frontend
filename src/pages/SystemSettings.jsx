import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { FaCogs } from "react-icons/fa";
import axios from "../axios";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    clinicName: "",
    workingHours: "",
    language: "tr",
    appointmentDuration: 30,
  });
  const [success, setSuccess] = useState(false);

  // ✅ Sayfa yüklendiğinde ayarları getir
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/system-settings");
        if (res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error("Ayarlar alınamadı:", err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/system-settings", settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Ayarlar kaydedilemedi:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingTop: "40px" }}>
      <Container>
        <h3 className="mb-4 d-flex align-items-center" style={{ color: "#4CAF50" }}>
          <FaCogs style={{ fontSize: "1.8rem", marginRight: "10px" }} />
          Sistem Ayarları
        </h3>

        <Card className="p-4 shadow-sm">
          {success && <Alert variant="success">Ayarlar başarıyla kaydedildi ✅</Alert>}
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

            <Button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                color: "#fff",
              }}
            >
              Ayarları Kaydet
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SystemSettings;
