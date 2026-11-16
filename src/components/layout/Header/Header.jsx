import { Link } from 'react-router';
import Navbar from '../Navbar/Navbar.jsx';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.titleLink}>
          {title}
        </Link>
      </h1>
      <Navbar/>
    </header>
  );
}

export default Header;
