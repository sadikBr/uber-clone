import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

const Register = ({ setToken }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      case 'firstName':
        setUserInfo((prev) => ({
          ...prev,
          firstName: event.target.value,
        }));
        break;
      case 'lastName':
        setUserInfo((prev) => ({
          ...prev,
          lastName: event.target.value,
        }));
        break;
      case 'username':
        setUserInfo((prev) => ({
          ...prev,
          username: event.target.value,
        }));
        break;
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
      case 'confirmPassword':
        setUserInfo((prev) => ({
          ...prev,
          confirmPassword: event.target.value,
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
      url: API_BASE_URL + '/auth/register',
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
        <div className={styles.flex}>
          <div className={styles.formInput}>
            <input
              type='text'
              name='firstName'
              value={userInfo.firstName}
              onChange={handleChange}
              required
            />
            <label>First Name</label>
          </div>
          <div className={styles.formInput}>
            <input
              type='text'
              name='lastName'
              value={userInfo.lastName}
              onChange={handleChange}
              required
            />
            <label>Last Name</label>
          </div>
        </div>
        <div className={styles.formInput}>
          <input
            type='text'
            name='username'
            value={userInfo.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>
        <div className={styles.formInput}>
          <input
            type='email'
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
        <div className={styles.formInput}>
          <input
            type='password'
            name='confirmPassword'
            value={userInfo.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
        </div>

        <input className={styles.submit} type='submit' value='Register' />
      </form>
    </div>
  );
};

export default Register;
