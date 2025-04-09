import React, { useEffect, useState } from "react";
import { Container, Form, Button, ListGroup, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const DietPlansPage = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

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
      fetchPlans(); // Listeyi yenile
      setTimeout(() => setSuccess(false), 2000); // ✅ Kısa süreli başarı mesajı
    } catch (err) {
      console.error("Ekleme hatası:", err);
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

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">Diyet Planları</h3>

      {success && <Alert variant="success">Diyet başarıyla eklendi ✅</Alert>}

      {/* Yeni Plan Formu */}
      <Form onSubmit={handleAdd}>
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
            <Form.Label>Açıklama (isteğe bağlı)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kahvaltı, öğle, akşam öğünleri"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="success" className="w-100">
              Ekle
            </Button>
          </Col>
        </Row>
      </Form>

      <hr className="my-4" />

      <h5 className="mb-3">📋 Kayıtlı Diyet Planları</h5>
      {dietPlans.length === 0 ? (
        <p>Henüz hiç diyet planı eklenmemiş.</p>
      ) : (
        <ListGroup>
          {dietPlans.map((plan) => (
            <ListGroup.Item key={plan._id} className="d-flex justify-content-between align-items-start">
              <div>
                <strong>{plan.title}</strong>
                <div className="text-muted">{plan.description}</div>
              </div>
              <Button variant="danger" onClick={() => handleDelete(plan._id)}>
                Sil
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default DietPlansPage;
