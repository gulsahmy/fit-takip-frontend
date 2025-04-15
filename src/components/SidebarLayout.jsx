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
      <div className="d-flex justify-content-between align-items-center p-3 mt-2">
        <div>
          <h5 className="">👋 Merhaba, {userName}!</h5>
        </div>

        {/* ✅ Çıkış Butonu */}
        <div className="text-end ">
          <Button
            variant="secondary"
            onClick={handleLogout}
            style={{
              fontSize: "0.8rem",
              backgroundColor: "#e0e0e0",
              color: "#000",
              borderColor: "#d3d3d3",
            }}
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
      <div className="p-3 mt-2">
        <Row className="mt-0">
          <Col
            md={4}
            className="py-5 text-center text-white rounded-3"
            style={{
              backgroundImage: 'url("/img/img7.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center text-center position-relative"
            style={{
              position: "relative",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <h1
                className="fw-bold text-center"
                style={{
                  fontSize: "3rem",
                  textShadow: "2px 2px 4px rgba(221, 17, 167, 0.6)",
                }}
              >
                FitTakip
              </h1>
              <p
                className="lead text-center"
                style={{ textShadow: "1px 1px 2px  rgba(221, 17, 167, 0.6)" }}
              >
                Sağlıklı yaşamın dijital asistanı
              </p>
            </div>
          </Col>

          <Col
            md={4}
            className="py-5 text-center text-white rounded-3"
            style={{
              backgroundImage: 'url("/img/img6.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></Col>
        </Row>
      </div>

      <Row className="bg-light">
        {/* Sol Menü */}
        <Col md={2} className="p-4 mt-5 min-vh-100">
          <Nav className="flex-column h-100 p-3 rounded-5 shadow-lg">
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
          </Nav>
        </Col>

        {/* Sağ İçerik */}
        <Col md={10} className="">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
