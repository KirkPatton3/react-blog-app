import { useEffect, useState } from 'react';
import PostList from '../../components/posts/PostList/PostList.jsx';
import { getPosts, getUsers } from '../../api/blogAPI.js';
import styles from './BlogPostsPage.module.css';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    Promise.all([getPosts(), getUsers()])
      .then(([postsData, usersData]) => {
        if (ignore) return;

        const authorNames = Object.fromEntries(usersData.map((user) => [user.id, user.name]));
        setPosts(postsData.map((post) => ({ ...post, author: authorNames[post.userId] })));
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        if (!ignore) setError('Could not load posts. Please try again later.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  let content;
  if (loading) {
    content = <p className={styles.intro}>Loading posts...</p>;
  } else if (error) {
    content = (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  } else {
    content = <PostList posts={posts} />;
  }

  return (
    <section>
      <h2 className={styles.heading}>All Posts</h2>
      <p className={styles.intro}>
        Pick a post to read the whole thing and join the conversation in the comments!
      </p>
      {content}
    </section>
  );
}

export default BlogPostsPage;