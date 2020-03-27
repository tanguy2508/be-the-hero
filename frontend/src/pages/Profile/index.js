import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile(){

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Welcome, {ongName}</span>
        <Link className="button" to="/incidents/new">Create a campaign</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Your fund campaigns</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CAMPAIGN:</strong>
            <p>{incident.title}</p>

            <strong>DESCRPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}