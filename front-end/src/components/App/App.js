import { Home, Login, Register, User, Profile } from '../';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import styles from './App.module.css';

import axios from 'axios';
import { useState, useLayoutEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useLayoutEffect(() => {
    if (token === '') return;

    axios({
      method: 'GET',
      url: API_BASE_URL + '/user/',
      headers: {
        authorisation: 'Bearer ' + token,
      },
    })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [token]);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Router>
        <nav className={styles.navigation}>
          <h1 className={styles.logo}>
            <Link to='/'>
              Uber<span className={styles.red}></span>Clone
            </Link>
          </h1>

          {token.length === 0 ? (
            <ul className={styles.routes}>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          ) : (
            <User user={user} setUser={setUser} setToken={setToken} />
          )}
        </nav>

        <Routes>
          <Route exact path='/' element={<Home user={user} />} />
          <Route exact path='/login' element={<Login setToken={setToken} />} />
          <Route
            exact
            path='/register'
            element={<Register setToken={setToken} />}
          />
          <Route exact path='/profile' element={<Profile user={user} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
