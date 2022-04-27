import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  function handleChange(event) {
    switch (event.target.name) {
      case 'email':
        setUserInfo((prev) => ({
          ...prev,
          email: event.target.value,
        }));
        break;
      case 'password':
        setUserInfo((prev) => ({
          ...prev,
          password: event.target.value,
        }));
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'POST',
      url: API_BASE_URL + '/auth/login',
      data: userInfo,
    })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
        }, 1000);
      });
  }

  function handleOAuthButtonClick(event) {
    if (event.target.className.match(/google/)) {
      console.log('google oauth');
    } else {
      console.log('facebook oauth');
    }
  }

  return (
    <div className={styles.container}>
      {error.length > 0 && <div className={styles.error}>{error}</div>}
      <div className={styles.oauthButtons}>
        <button onClick={handleOAuthButtonClick} className={styles.google}>
          Continue With Google
        </button>
        <button onClick={handleOAuthButtonClick} className={styles.facebook}>
          Continue With Facebook
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <input
            type='text'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className={styles.formInput}>
          <input
            type='password'
            name='password'
            value={userInfo.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <input className={styles.submit} type='submit' value='Login' />

        <div className={styles.register}>
          You don't have an account, register <Link to='/register'>here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
