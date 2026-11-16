import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { ThemeContext } from '../../../context/ThemeContext.js';
import { getPosts } from '../../../api/blogApi.js';
import styles from './Navbar.module.css';

function linkClass({ isActive }) {
  if (isActive) {
    return `${styles.link} ${styles.active}`;
  } else {
    return styles.link;
  }
}

function menuLinkClass({ isActive }) {
  if (isActive) {
    return `${styles.menuLink} ${styles.menuLinkActive}`;
  } else {
    return styles.menuLink;
  }
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { pathname } = useLocation();
  const onPostPage = pathname.startsWith('/posts/');

  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    getPosts()
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((err) => {
        console.error('Error fetching posts for menu:', err);
        if (!ignore) setPostsError(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handlePointerDown(event) {
      if (!dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        buttonRef.current.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  let nextTheme;
  let toggleIcon;
  let toggleLabel;
  if (theme === 'light') {
    nextTheme = 'dark';
    toggleIcon = <span className="material-symbols-outlined" aria-hidden="true">dark_mode</span>;
    toggleLabel = 'Dark';
  } else {
    nextTheme = 'light';
    toggleIcon = <span className="material-symbols-outlined" aria-hidden="true">light_mode</span>;
    toggleLabel = 'Light';
  }

  let postsButtonClass;
  if (onPostPage) {
    postsButtonClass = `${styles.link} ${styles.active}`;
  } else {
    postsButtonClass = styles.link;
  }

  let caretClass;
  if (menuOpen) {
    caretClass = `${styles.caret} ${styles.caretOpen}`;
  } else {
    caretClass = styles.caret;
  }

  let postsMenu = null;
  if (menuOpen) {
    postsMenu = (
      <ul id="posts-menu" className={styles.menu}>
        {posts.length === 0 && (
          <li className={styles.menuStatus}>
            {postsError ? 'Could not load posts.' : 'Loading posts...'}
          </li>
        )}
        {posts.map((post) => (
          <li key={post.id}>
            <NavLink
              to={`/posts/${post.id}`}
              className={menuLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {post.title}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <nav className={styles.nav} aria-label="Main">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>

      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          type="button"
          ref={buttonRef}
          className={postsButtonClass}
          aria-expanded={menuOpen}
          aria-controls="posts-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Posts
          <span className={caretClass}>v</span>
        </button>

        {postsMenu}
      </div>

      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>

      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={`Switch to ${nextTheme} mode`}
        title={`Switch to ${nextTheme} mode`}
      >
        {toggleIcon}
        <span>{toggleLabel}</span>
      </button>
    </nav>
  );
}

export default Navbar;