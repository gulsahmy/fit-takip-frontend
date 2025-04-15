import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import axios from "axios";

const StaffOperations = () => {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Verileri API'den çek
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/staff");
        setStaffList(res.data);
      } catch (err) {
        console.error("Personel verisi alınamadı:", err);
      }
    };
    fetchStaff();
  }, []);

  // Yeni personel ekleme
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/staff", formData);
      setStaffList([...staffList, res.data]);
      setFormData({ name: "", role: "", phone: "" });
    } catch (err) {
      console.error("Personel eklenemedi:", err);
    }
  };

  // Silme işlemi
  const handleDelete = async (id) => {
    if (!window.confirm("Bu personeli silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      setStaffList(staffList.filter((staff) => staff._id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  // Güncelleme başlat
  const handleEdit = (staff) => {
    setEditId(staff._id);
    setFormData({ name: staff.name, role: staff.role, phone: staff.phone });
    setShowModal(true);
  };

  // Güncelleme işlemi
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/staff/${editId}`, formData);
      const updatedList = staffList.map((s) => (s._id === editId ? res.data : s));
      setStaffList(updatedList);
      setFormData({ name: "", role: "", phone: "" });
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4 d-flex align-items-center">
        <FaUsers style={{ color: "#dd11a7", fontSize: "1.8rem", marginRight: "10px" }} />
        Personel İşlemleri
      </h3>

      {/* Ekleme Formu */}
      <Form onSubmit={handleAdd}>
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Label>Görev</Form.Label>
            <Form.Control
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </Col>
          <Col md={1}>
            <Button type="submit" variant="success" className="w-100">
              <FaUserPlus />
            </Button>
          </Col>
        </Row>
      </Form>

      <hr />

      {/* Liste */}
      <Table striped bordered hover className="mt-3">
      <thead>
    <tr>
      <th style={{ width: "25%" }}>Ad Soyad</th>
      <th style={{ width: "25%" }}>Görev</th>
      <th style={{ width: "25%" }}>Telefon</th>
      <th style={{ width: "25%" }}>İşlemler</th>
    </tr>
  </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.phone}</td>
              <td className="text-end">
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(staff)}
                >
                  Güncelle
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(staff._id)}
                >
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Güncelleme Modalı */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Personeli Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Görev</Form.Label>
              <Form.Control
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Vazgeç
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StaffOperations;
