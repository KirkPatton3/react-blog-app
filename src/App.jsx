import { Route, Routes } from 'react-router';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import BlogPostsPage from './pages/BlogPostsPage/BlogPostsPage.jsx';
import IndividualPostPage from './pages/IndividualPostPage/IndividualPostPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header title="Kirks Blog"/>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<BlogPostsPage/>}/>
          <Route path="/posts/:postId" element={<IndividualPostPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      </main>
      <Footer blogTitle="Kirks Blog"/>
    </div>
  );
}

export default App;
