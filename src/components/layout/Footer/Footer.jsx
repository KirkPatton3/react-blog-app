import styles from './Footer.module.css';

function Footer({ blogTitle }) {
  return (
    <footer className={styles.footer}>
      &copy; 2026 {blogTitle}. All rights reserved.
    </footer>
  );
}

export default Footer;
