import CommentItem from '../CommentItem/CommentItem.jsx';
import styles from './CommentList.module.css';

function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} name={comment.name} text={comment.body} />
      ))}
    </ul>
  );
}

export default CommentList;