import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Kayıt başarılı 🎉, giriş yapabilirsin.');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Bir hata oluştu.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Ad" required onChange={(e) => setForm({ ...form, name: e.target.value })} /><br /><br />
        <input name="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} /><br /><br />
        <input name="password" type="password" placeholder="Şifre" required onChange={(e) => setForm({ ...form, password: e.target.value })} /><br /><br />
        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Zaten hesabın var mı? <Link to="/">Giriş Yap</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
