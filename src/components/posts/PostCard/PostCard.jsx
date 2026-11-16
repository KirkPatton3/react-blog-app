import { Link } from 'react-router';
import styles from './PostCard.module.css';

const PREVIEW_LENGTH = 120;

function getPreview(body) {
  const text = body.replace(/\n/g, ' ');
  if (text.length <= PREVIEW_LENGTH) {
    return text;
  }
  return `${text.slice(0, PREVIEW_LENGTH).trimEnd()}...`;
}

function PostCard({ post }) {
  const postUrl = `/posts/${post.id}`;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link to={postUrl} className={styles.titleLink}>
          {post.title}
        </Link>
      </h3>

      <p className={styles.meta}>
        By <strong>{post.author}</strong>
      </p>

      <Link to={postUrl} className={styles.readMore} aria-label={`Read full post: ${post.title}`}>
        Read full post
      </Link>
    </article>
  );
}

export default PostCard;