import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import './styles.css';

export default function Logon(){

  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await api.post('session', { id });
      console.log(response.data.name);
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch(err) {
      setMessage('Error on login, please check your ID');
    }
    setLoading(false);
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Enter to your Dashboard</h1>
          <input 
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <h3>{message}</h3>
          <button className="button" type="submit">
            {loading ? 
              <FaSpinner className="icon-spin" size={18} color="#fff"/>
            : 'Enter'}
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Create an account
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}