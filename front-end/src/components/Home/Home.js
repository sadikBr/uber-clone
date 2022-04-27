import { Link } from 'react-router-dom';

import banner from '../../images/banner.webp';

import styles from './Home.module.css';

const Home = ({ user }) => {
  console.log(banner);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={banner} alt='Landing page banner' />
      {user.username ? (
        <div className={styles.welcomeMessage}>
          Welcome{' '}
          <span className={styles.name}>
            {user.lastName} {user.firstName}
          </span>
        </div>
      ) : (
        <div className={styles.welcomeMessage}>
          Welcome to UberClone, create an account{' '}
          <Link to='/register'>here</Link>
        </div>
      )}
      <div className={styles.services}>
        <div className={styles.service}></div>
        <div className={styles.service}></div>
      </div>
    </div>
  );
};

export default Home;
