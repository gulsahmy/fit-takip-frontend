import React from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const SidebarLayout = () => {
  const userName = localStorage.getItem("userName");

  // ✅ Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/"; // login sayfasına yönlendir
  };
  return (
    <Container fluid className="">
      <div className="d-flex justify-content-between align-items-center p-2">
        <div>
          <h5>👋 Merhaba, {userName}!</h5>
        </div>

        {/* ✅ Çıkış Butonu */}
        <div className="text-end ">
          <Button 
          variant="secondary" 
          onClick={handleLogout}
          style={{ fontSize: "0.8rem" }}
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
      <div
        className="py-5 text-center text-white"
        style={{
          backgroundImage: 'url("/img/img7.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="fw-bold"
          style={{
            fontSize: "3rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          FitTakip
        </h1>
        <p
          className="lead"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          Sağlıklı yaşamın dijital asistanı
        </p>
      </div>

      <Row>
        {/* Sol Menü */}
        <Col md={3} className="p-3">
          <Nav className="flex-column bg-light p-3 rounded shadow-sm">
            <Nav.Link as={Link} to="/dashboard">
              🏥 Hasta Paneli
            </Nav.Link>
            <Nav.Link as={Link} to="/diet-plans">
              🥗 Diyet Listeleri
            </Nav.Link>
            <Nav.Link as={Link} to="/appointments">
              📅 Randevular
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              📊 İstatistikler
            </Nav.Link>
            <Nav.Link as={Link} to="">
              📊 Personel İşlemleri
            </Nav.Link>
            <Nav.Link as={Link} to="">
              📊 Muhasebe İşlemleri
            </Nav.Link>
            <Nav.Link as={Link} to="">
              📊 Sistem Ayarları
            </Nav.Link>

            {/* İleride buraya yeni sayfalar eklenebilir */}
          </Nav>
        </Col>

        {/* Sağ İçerik */}
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
