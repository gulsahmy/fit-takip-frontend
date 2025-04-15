import React, { useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";

const Accounting = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    amount: "",
    note: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setPayments([...payments, formData]);
    setFormData({ patientName: "", date: "", amount: "", note: "" });
  };

  const handleDelete = (index) => {
    const updated = [...payments];
    updated.splice(index, 1);
    setPayments(updated);
  };

  const total = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  return (
    <Container className="mt-5">
      <h3 className="mb-4 d-flex align-items-center">
        <FaMoneyBillWave style={{ color: "#198754", fontSize: "1.8rem", marginRight: "10px" }} />
        Muhasebe İşlemleri
      </h3>

      {/* Ödeme Ekleme Formu */}
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
            <Button type="submit" variant="success" className="w-100">
              Ekle
            </Button>
          </Col>
        </Row>
      </Form>

      <hr />

      {/* Ödeme Listesi */}
      <Table striped bordered hover className="mt-3 align-middle">
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
          {payments.map((p, index) => (
            <tr key={index}>
              <td>{p.patientName}</td>
              <td>{p.date}</td>
              <td>{parseFloat(p.amount).toFixed(2)}</td>
              <td>{p.note}</td>
              <td className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Toplam */}
      <h5 className="text-end mt-3">
        Toplam: <span className="text-success">{total.toFixed(2)} ₺</span>
      </h5>
    </Container>
  );
};

export default Accounting;
