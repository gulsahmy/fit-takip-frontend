import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import axios from "../axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    note: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Randevuları getir
  const fetchAppointments = async () => {
    const res = await axios.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Yeni randevu ekle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/appointments", formData);
      setFormData({ patientName: "", date: "", note: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Randevu eklenemedi:", err);
    }
  };

  // Randevu sil
  const handleDelete = async (id) => {
    if (!window.confirm("Bu randevuyu silmek istediğinize emin misiniz?"))
      return;
    await axios.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  // Güncelleme başlat
  const handleEdit = (appt) => {
    setEditId(appt._id);

    const formattedDate = new Date(appt.date).toISOString().slice(0, 16);

    setFormData({
      patientName: appt.patientName,
      date: formattedDate,
      note: appt.note,
    });

    setShowModal(true);
  };

  // Güncelleme işlemi
  const handleUpdate = async () => {
    console.log("Güncelleniyor:", formData);
    try {
      await axios.put(
        `/appointments/${editId}`,
        formData
      );
      setShowModal(false);
      setEditId(null);
      setFormData({ patientName: "", date: "", note: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container className="mt-5">
        <h3 className="mb-5 text-center" style={{ color: "#4CAF50" }}>
          📅 Randevu Takibi
        </h3>

        {/* Randevu Ekleme Formu */}
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Label>Hasta Adı</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label>Randevu Tarihi</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                type="text"
                name="note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </Col>
            <Col md={1}>
              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "#fff",
                }}
              >
                Ekle
              </Button>
            </Col>
          </Row>
        </Form>

        <hr />

        {/* Randevu Listesi */}
        <ListGroup>
          {appointments.map((appt) => (
            <ListGroup.Item
              key={appt._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{appt.patientName}</strong> –{" "}
                <span className="text-muted">
                  {new Date(appt.date).toLocaleString("tr-TR")}
                </span>
                <div>{appt.note}</div>
              </div>
              <div>
                <Button
                  size="sm"
                  className="me-2"
                  style={{
                    backgroundColor: "#1976D2",
                    borderColor: "#1976D2",
                    color: "#fff",
                  }}
                  onClick={() => handleEdit(appt)}
                >
                  Güncelle
                </Button>

                <Button
                  size="sm"
                  style={{
                    backgroundColor: "#E53935",
                    borderColor: "#E53935",
                    color: "#fff",
                  }}
                  onClick={() => handleDelete(appt._id)}
                >
                  Sil
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Güncelleme Modalı */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Randevuyu Güncelle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Hasta Adı</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tarih</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Açıklama</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Vazgeç
            </Button>
            <Button
              onClick={handleUpdate}
              style={{
                backgroundColor: "#1976D2",
                borderColor: "#1976D2",
                color: "#fff",
              }}
            >
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>

        <h5 className="mt-4">📅 Takvim</h5>
        <Calendar onChange={setSelectedDate} value={selectedDate} />

        <h6 className="mt-3">
          📝 {selectedDate.toLocaleDateString("tr-TR")} tarihli randevular:
        </h6>
        <ListGroup>
          {appointments
            .filter(
              (appt) =>
                new Date(appt.date).toDateString() ===
                selectedDate.toDateString()
            )
            .map((appt) => (
              <ListGroup.Item key={appt._id}>
                <strong>{appt.patientName}</strong> - 🕒{" "}
                {new Date(appt.date).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <br />
                <small>{appt.note}</small>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default AppointmentPage;
