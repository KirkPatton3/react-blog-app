import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import LikeButton from '../../components/posts/LikeButton/LikeButton.jsx';
import CommentSection from '../../components/comments/CommentSection/CommentSection.jsx';
import { getComments, getPost, getUser } from '../../api/blogAPI.js';
import styles from './IndividualPostPage.module.css';

function IndividualPostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const [loadedPostId, setLoadedPostId] = useState(null);
  const loading = loadedPostId !== postId;

  useEffect(() => {
    let ignore = false;

    Promise.all([getPost(postId), getComments(postId)])
      .then(([postData, commentsData]) =>
        getUser(postData.userId).then((userData) => {
          if (ignore) return;
          setPost(postData);
          setComments(commentsData);
          setUser(userData);
          setError('');
          setLoadedPostId(postId);
        }),
      )
      .catch((err) => {
        console.error('Error fetching post:', err);
        if (ignore) return;
        if (err.status === 404) {
          setError('Post not found.');
        } else {
          setError('Could not load this post. Please try again later.');
        }
        setLoadedPostId(postId);
      });

    return () => {
      ignore = true;
    };
  }, [postId]);

  function handleAddComment(newComment) {
    setComments((current) => [...current, newComment]);
  }

  if (loading) {
    return <p className={styles.post}>Loading post...</p>;
  }

  if (error) {
    return (
      <p className={styles.post} role="alert">
        {error}
      </p>
    );
  }

  return (
    <article key={post.id} className={styles.post}>
      <Link to="/" className={styles.back}>
        All posts
      </Link>

      <h2 className={styles.title}>{post.title}</h2>

      <p className={styles.meta}>
        By <strong>{user.name}</strong> ·{' '}
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>

      <div className={styles.content}>
        <p>{post.body}</p>
      </div>

      <LikeButton initialLikes={0}/>

      <CommentSection
        postId={post.id}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </article>
  );
}

export default IndividualPostPage;