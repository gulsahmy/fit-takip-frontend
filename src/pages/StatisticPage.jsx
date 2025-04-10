import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const StatisticsPage = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [patientRes, appointmentRes] = await Promise.all([
        axios.get("http://localhost:5000/api/patients"),
        axios.get("http://localhost:5000/api/appointments"),
      ]);
      setPatients(patientRes.data);
      setAppointments(appointmentRes.data);
    };
    fetchData();
  }, []);

  const nextAppointment = appointments
    .filter((a) => new Date(a.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">📊 İstatistikler</h3>
      <Row>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>👥 Toplam Hasta</Card.Title>
              <Card.Text>{patients.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>📅 Randevu Sayısı</Card.Title>
              <Card.Text>{appointments.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>🕒 En Yakın Randevu</Card.Title>
              <Card.Text>
                {nextAppointment
                  ? `${nextAppointment.patientName} - ${new Date(
                      nextAppointment.date
                    ).toLocaleString("tr-TR")}`
                  : "Yaklaşan randevu yok"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsPage;
