import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Diyetisyen Girişi</h2>

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

        <Button variant="primary" type="submit" className="w-100">
          Giriş Yap
        </Button>
        <p className="mt-3 text-center">
          Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginPage;
