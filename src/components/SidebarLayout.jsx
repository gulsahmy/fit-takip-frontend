import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const SidebarLayout = () => {
  const userName = localStorage.getItem("userName");
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  const navLinks = (
    <>
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
      <Nav.Link as={Link} to="/staff">
        👨‍💼 Personel İşlemleri
      </Nav.Link>
      <Nav.Link as={Link} to="/accounting">
        💰 Muhasebe İşlemleri
      </Nav.Link>
      <Nav.Link as={Link} to="/settings">
        ⚙️ Sistem Ayarları
      </Nav.Link>
    </>
  );

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Üst Navbar */}
      <Navbar
        expand="lg"
        className="bg-white shadow-sm px-3 d-flex justify-content-between"
      >
        <div>
          <h6 className="m-0">👋 Merhaba, {userName}!</h6>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            className="d-lg-none"
            onClick={() => setShowMenu(true)}
          >
            ☰ Menü
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={handleLogout}
            style={{
              backgroundColor: "#e0e0e0",
              border: "none",
              color: "#000",
            }}
          >
            Çıkış Yap
          </Button>
        </div>
      </Navbar>

      {/* Üst Banner */}
      <Container fluid className="py-4 px-4">
        <Row>
          <Col
            md={4}
            className="rounded-3"
            style={{
              backgroundImage: 'url("/img/img7.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "160px",
            }}
          ></Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{ minHeight: "160px" }}
          >
            <h1
              className="fw-bold"
              style={{
                fontSize: "2.8rem",
                color: "#28a745",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              FitTakip 💚
            </h1>

            <p
              className="lead"
              style={{
                color: "#555",
                fontWeight: "500",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              Diyetisyenler için randevu, takip ve analiz sistemi
            </p>
          </Col>
          <Col
            md={4}
            className="rounded-3"
            style={{
              backgroundImage: 'url("/img/img6.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "160px",
            }}
          ></Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          {/* Sabit Sidebar (lg ve üzeri görünür) */}
          <Col lg={2} className="d-none d-lg-block px-4">
            <div className="bg-white rounded-4 shadow-sm p-3 h-100">
              <Nav className="flex-column">{navLinks}</Nav>
            </div>
          </Col>

          {/* Mobil Menü (Offcanvas) */}
          <Offcanvas
            show={showMenu}
            onHide={() => setShowMenu(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menü</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">{navLinks}</Nav>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Sayfa İçeriği */}
          <Col lg={10} className="pt-3 px-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SidebarLayout;
