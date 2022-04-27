import { Link } from 'react-router-dom';
import { useState } from 'react';

import banner from '../../images/banner.webp';

import styles from './Home.module.css';

const Home = ({ user }) => {
  const [rideInfo, setRideInfo] = useState({
    pickupLocation: '',
    destination: '',
  });

  function handleInputChange(event) {
    const target = event.target.name;

    switch (target) {
      case 'pickupLocation':
        setRideInfo((prev) => ({
          ...prev,
          pickupLocation: event.target.value,
        }));
        break;
      case 'destination':
        setRideInfo((prev) => ({
          ...prev,
          destination: event.target.value,
        }));
        break;
      default:
        break;
    }
  }

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
        <div className={styles.service}>
          <h1 className={styles.serviceTitle}>Request a ride now</h1>
          <div className={styles.rideInputs}>
            <input
              type='text'
              name='pickupLocation'
              placeholder='Enter pickup location.'
              value={rideInfo.pickupLocation}
              onChange={handleInputChange}
            />
            <input
              type='text'
              name='destination'
              placeholder='Enter destination.'
              value={rideInfo.destination}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button className={styles.serviceBtnPrimary}>Request Now</button>
            <button className={styles.serviceSecondaryBtn}>
              Schedule For Later
            </button>
          </div>
        </div>
        <div className={styles.service}>
          <h1 className={styles.serviceTitle}>Discover delicious eats</h1>
          <p className={styles.serviceDescription}>
            Order delivery from restaurants you love!
          </p>
          <button className={styles.serviceBtnPrimary}>Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
