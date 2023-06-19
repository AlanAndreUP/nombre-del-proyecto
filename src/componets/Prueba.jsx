// Login.js
import React, { useState } from 'react';
import './css/Login.css';
import Zikar from '../img/Zikar.png';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState('');

  const handleLogin = async () => {
    try {
      const url = `http://alansanchez12-001-site1.htempurl.com/api/Empleadoes/VerificarCredenciales?usuario=${username}&contraseña=${password}`;
      const response = await fetch(url, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Correcto',
          text: 'Credenciales válidas',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          setId(data);
          setLoggedIn(true);
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error en la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loggedIn) {
    return <Navigate to={`/Menu/${id}`} replace />;
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="image-container">
          <img src={Zikar} alt="Logo Zikar" />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Usuario"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Iniciar sesión
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
