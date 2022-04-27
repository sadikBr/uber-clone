import { useNavigate, Link } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = ({ setToken, setUser }) => {
  const navigate = useNavigate();

  function logOut() {
    localStorage.setItem('token', '');
    setToken('');
    setUser({});
    navigate('/');
  }

  return (
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <Link to='/profile'>Profile</Link>
      </div>
      <div className={styles.menuItem}>User Settings</div>
      <div className={styles.menuItem} onClick={logOut}>
        Log Out
      </div>
    </div>
  );
};

export default Menu;
