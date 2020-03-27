import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';

export default function Register(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);
      alert(`Success ! Your access ID: ${response.data.id}`);
      history.push('/');
    } catch(err) {
      setMessage(err.response.data.message || 'Internal server error.');
    }
    setLoading(false);
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Sign Up</h1>
          <p>Create your account, add some campaigns and help people to find your NGO.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            I already have an account
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Name of the NGO"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="my-input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="ST" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <h3>{message}</h3>
          <button className="button" type="submit">
          {loading ? 
              <FaSpinner className="icon-spin" size={18} color="#fff"/>
              : 'Create my account'}
          </button>
        </form>
      </div>    
    </div>
  )
}