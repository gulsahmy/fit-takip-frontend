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

  // Ortalama BMI
  const validPatients = patients.filter((p) => p.height && p.weight);
  const averageBMI =
    validPatients.length > 0
      ? (
          validPatients.reduce((sum, p) => {
            const heightM = p.height / 100;
            return sum + p.weight / (heightM * heightM);
          }, 0) / validPatients.length
        ).toFixed(1)
      : "Veri yok";

  // En aktif hasta
  const patientCountMap = {};
  appointments.forEach((appt) => {
    if (appt.patientName) {
      patientCountMap[appt.patientName] =
        (patientCountMap[appt.patientName] || 0) + 1;
    }
  });
  const mostActivePatient = Object.entries(patientCountMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // En yoğun randevu günü
  const dayCountMap = {};
  appointments.forEach((appt) => {
    const day = new Date(appt.date).toLocaleDateString("tr-TR", {
      weekday: "long",
    });
    dayCountMap[day] = (dayCountMap[day] || 0) + 1;
  });
  const busiestDay = Object.entries(dayCountMap).sort((a, b) => b[1] - a[1])[0];

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container>
        <h3 className="mb-5 text-center" style={{ color: "#4CAF50" }}>
          📊 İstatistikler
        </h3>
        <Row className="g-5">
          <Col md={4} className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#4CAF50" }}>
                  👥 Toplam Hasta
                </Card.Title>
                <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {patients.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}  className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#1976D2" }}>
                  📅 Randevu Sayısı
                </Card.Title>
                <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {appointments.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#E53935" }}>
                  🕒 En Yakın Randevu
                </Card.Title>
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

          {/* Yeni Eklenen 3 Kart */}
          <Col md={4} className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#FF9800" }}>
                  📈 Ortalama BMI
                </Card.Title>
                <Card.Text>{averageBMI}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#9C27B0" }}>
                  🏅 En Aktif Hasta
                </Card.Title>
                <Card.Text>
                  {mostActivePatient
                    ? `${mostActivePatient[0]} (${mostActivePatient[1]} randevu)`
                    : "Veri yok"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#009688" }}>
                  📆 En Yoğun Gün
                </Card.Title>
                <Card.Text>
                  {busiestDay
                    ? `${busiestDay[0]} (${busiestDay[1]} randevu)`
                    : "Veri yok"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatisticsPage;
