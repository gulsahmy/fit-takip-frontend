import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sol Menü */}
        <Col md={3}>
          <Nav className="flex-column bg-light p-3 rounded shadow-sm">
            <Nav.Link as={Link} to="/dashboard">🏥 Hasta Paneli</Nav.Link>
            <Nav.Link as={Link} to="/diet-plans">🥗 Diyet Listeleri</Nav.Link>
            <Nav.Link as={Link} to="/appointments">📅 Randevular</Nav.Link>
            <Nav.Link as={Link} to="/statistics">📊 İstatistikler</Nav.Link>


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
