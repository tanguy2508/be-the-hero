import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

export default function NewIncident(){

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState();
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile');
    } catch(err) {
      setMessage(err.response.data.message);
    }

    setLoading(false);
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Create a campaign</h1>
          <p>Describe carefully your campaign to find a hero to resolve it.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Dashboard
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Title of the campaign"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description" 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <h3>{message}</h3>

          <button className="button" type="submit">
            {loading ? 
              <FaSpinner className="icon-spin" size={18} color="#fff"/>
              : 'Send to the Heroes'
            }
          </button>
        </form>
      </div>    
    </div>
  )
}