import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Carousel,
} from "react-bootstrap";
import axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Geçersiz giriş");
    }
  };

  return (
    <Container
      fluid
      className="p-0"
      style={{ height: "100vh", overflow: "hidden" }}
    >
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
                  src="/img/img5.jpg"
                  alt="Sağlıklı Beslenme"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // beyaz yarı saydam zemin
                    color: "#000", // siyah yazı
                    borderRadius: "8px",
                    padding: "5px",
                  }}
                >
                  <h5>Sağlıklı Beslenme</h5>
                  <p>Dengeli bir yaşam için doğru beslenme şart.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100 h-100 rounded"
                  src="/img/diyet-plan.jpg"
                  alt="Diyet Planı"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // beyaz yarı saydam zemin
                    color: "#000", // siyah yazı
                    borderRadius: "8px",
                    padding: "5px",
                  }}
                >
                  <h5>Kişiye Özel Diyet</h5>
                  <p>Her bireyin ihtiyacı farklıdır.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100 h-100 rounded"
                  src="/img/spor.jpg"
                  alt="Aktif Yaşam"
                  style={{ objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // beyaz yarı saydam zemin
                    color: "#000", // siyah yazı
                    borderRadius: "8px",
                    padding: "5px",
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
          <Card
            style={{ width: "100%", maxWidth: "400px" }}
            className="p-4 shadow"
          >
            <h2 className="text-center mb-4" style={{ color: "#4CAF50" }}>
              Diyetisyen Girişi
            </h2>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "#fff",
                }}
              >
                Giriş Yap
              </Button>
            </Form>

            <p className="mt-3 text-center">
              Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
