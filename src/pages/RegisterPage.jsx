import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setError(false);
      setMessage("Kayıt başarılı 🎉, giriş yapabilirsin.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Bir hata oluştu.");
    }
  };

  return (
    <Container fluid className="p-0" style={{ height: "100vh", overflow: "hidden" }}>
      <Row className="g-0 h-100">
        {/* SOL TARAF: Carousel */}
        <Col
          md={7}
          className="d-none d-md-flex justify-content-center align-items-center bg-dark"
          style={{ height: "100%" }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "500px",
              height: "400px",
              overflow: "hidden",
            }}
          >
            <Carousel fade interval={3000} controls={false} indicators={false}>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100 h-100 rounded"
                  src="./img/img5.jpg"
                  alt="Sağlıklı Beslenme"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    color: "#000",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <h5>Sağlıklı Beslenme</h5>
                  <p>Dengeli bir yaşam için doğru beslenme şart.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100 h-100 rounded"
                  src="./img/diyet-plan.jpg"
                  alt="Diyet Planı"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    color: "#000",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <h5>Kişiye Özel Diyet</h5>
                  <p>Her bireyin ihtiyacı farklıdır.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100 h-100 rounded"
                  src="./img/spor.jpg"
                  alt="Aktif Yaşam"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    color: "#000",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <h5>Aktif Yaşam</h5>
                  <p>Sağlıklı bir vücut için hareket şart.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>

        {/* SAĞ TARAF: Form */}
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center bg-light"
          style={{ height: "100%" }}
        >
          <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
            <h3 className="text-center mb-4">Kayıt Ol</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Ad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adınızı girin"
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email adresinizi girin"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Kayıt Ol
              </Button>
            </Form>

            {message && (
              <Alert variant={error ? "danger" : "success"} className="mt-3">
                {message}
              </Alert>
            )}

            <p className="mt-3 text-center">
              Zaten hesabın var mı? <Link to="/">Giriş Yap</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
