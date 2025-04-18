import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const DietPlansPage = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/diet-plans");
      setDietPlans(res.data);
    } catch (err) {
      console.error("Liste alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      await axios.post("http://localhost:5000/api/diet-plans", {
        title: newTitle,
        description,
      });

      setNewTitle("");
      setDescription("");
      setSuccess(true);
      fetchPlans();
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Ekleme hatası:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/diet-plans/${editId}`, {
        title: newTitle,
        description,
      });
      setShowModal(false);
      setEditId(null);
      setNewTitle("");
      setDescription("");
      fetchPlans();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu diyeti silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/diet-plans/${id}`);
      fetchPlans();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const handleEdit = (plan) => {
    setEditId(plan._id);
    setNewTitle(plan.title);
    setDescription(plan.description);
    setShowModal(true);
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingTop: "40px" }}>
      <Container>
        <Card className="p-4 shadow-sm">
          <h3 className="mb-4 text-center" style={{ color: "#4CAF50" }}>
            🌿 Diyet Planları
          </h3>

          {success && (
            <Alert variant="success">Diyet başarıyla eklendi ✅</Alert>
          )}

          {/* Yeni Ekleme Formu */}
          <Form onSubmit={handleAdd} className="mb-4">
            <Row className="align-items-end">
              <Col md={5}>
                <Form.Label>Diyet Başlığı</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1600 kalorilik diyet"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </Col>
              <Col md={5}>
                <Form.Label>Açıklama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kahvaltı, öğle, akşam öğünleri"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
              <Col md={2}>
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

          <h5 className="mb-3 text-success">📋 Kayıtlı Diyet Planları</h5>
          {dietPlans.length === 0 ? (
            <p>Henüz hiç diyet planı eklenmemiş.</p>
          ) : (
            <ListGroup>
              {dietPlans.map((plan) => (
                <ListGroup.Item
                  key={plan._id}
                  className="d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div>
                    <strong>{plan.title}</strong>
                    <div className="text-muted">{plan.description}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#1976D2",
                        borderColor: "#1976D2",
                        color: "#fff",
                      }}
                      onClick={() => handleEdit(plan)}
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
                      onClick={() => handleDelete(plan._id)}
                    >
                      Sil
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card>
      </Container>

      {/* Modal Güncelleme Formu */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Diyet Planını Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Diyet Başlığı</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <div className="text-end mt-3">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Vazgeç
              </Button>
              <Button variant="primary" type="submit">
                Kaydet
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DietPlansPage;
