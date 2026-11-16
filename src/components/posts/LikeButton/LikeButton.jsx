import { useState } from 'react';
import styles from './LikeButton.module.css';

function LikeButton({ initialLikes }) {
  const [liked, setLiked] = useState(false);
  const likeCount = initialLikes + (liked ? 1 : 0);

  return (
    <button
      type="button"
      className={`${styles.button} ${liked ? styles.liked : ''}`}
      aria-pressed={liked}
      onClick={() => setLiked(!liked)}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 20.5s-7.6-4.7-9.4-9.6C1.4 7.4 3.6 4 7 4c2.1 0 3.7 1.2 5 3 1.3-1.8 2.9-3 5-3 3.4 0 5.6 3.4 4.4 6.9-1.8 4.9-9.4 9.6-9.4 9.6Z" />
      </svg>
      {liked ? 'Liked' : 'Like'} ({likeCount})
    </button>
  );
}

export default LikeButton;
