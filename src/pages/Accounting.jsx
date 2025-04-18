import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";

const Accounting = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    amount: "",
    note: "",
  });
  const [editId, setEditId] = useState(null); // güncelleme modunu belirle

  // Ödemeleri API'den çek
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Ödeme listesi alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Yeni ödeme ekle
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Güncelleme
        const res = await axios.put(
          `http://localhost:5000/api/payments/${editId}`,
          formData
        );
        const updatedPayments = payments.map((p) =>
          p._id === editId ? res.data : p
        );
        setPayments(updatedPayments);
        setEditId(null); // editId sıfırlanır
      } else {
        // Ekleme
        const res = await axios.post(
          "http://localhost:5000/api/payments",
          formData
        );
        setPayments([...payments, res.data]);
      }

      setFormData({ patientName: "", date: "", amount: "", note: "" });
    } catch (err) {
      console.error("Ödeme eklenemedi veya güncellenemedi:", err);
    }
  };

  // Ödeme sil
  const handleDelete = async (id) => {
    if (!window.confirm("Bu kaydı silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/payments/${id}`);
      setPayments(payments.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const total = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container>
        <h3
          className="mb-4 d-flex align-items-center"
          style={{ color: "#4CAF50" }}
        >
          <FaMoneyBillWave
            style={{ fontSize: "1.8rem", marginRight: "10px" }}
          />
          Muhasebe İşlemleri
        </h3>

        {/* Form */}
        <Form onSubmit={handleAdd}>
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Label>Hasta Adı</Form.Label>
              <Form.Control
                type="text"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                required
              />
            </Col>
            <Col md={2}>
              <Form.Label>Tarih</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </Col>
            <Col md={2}>
              <Form.Label>Tutar (₺)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                type="text"
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
                  backgroundColor: editId ? "#1976D2" : "#4CAF50",
                  borderColor: editId ? "#1976D2" : "#4CAF50",
                  color: "#fff",
                }}
              >
                {editId ? "Kaydet" : "Ekle"}
              </Button>
            </Col>
          </Row>
        </Form>

        <hr />

        {/* Tablo */}
        <div className="bg-white shadow-sm rounded mt-3 p-3">
          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Hasta</th>
                <th>Tarih</th>
                <th>Tutar (₺)</th>
                <th>Açıklama</th>
                <th className="text-end">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.patientName}</td>
                  <td>{p.date}</td>
                  <td>{parseFloat(p.amount).toFixed(2)}</td>
                  <td>{p.note}</td>
                  <td className="text-end">
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => {
                        setFormData({
                          patientName: p.patientName,
                          date: p.date?.slice(0, 10),
                          amount: p.amount,
                          note: p.note,
                        });
                        setEditId(p._id);
                      }}
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
                      onClick={() => handleDelete(p._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Toplam */}
        <h5 className="text-end mt-4">
          Toplam:{" "}
          <span className="text-success fw-bold">{total.toFixed(2)} ₺</span>
        </h5>
      </Container>
    </div>
  );
};

export default Accounting;
