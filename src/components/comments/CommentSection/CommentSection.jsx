import CommentForm from '../CommentForm/CommentForm.jsx';
import CommentList from '../CommentList/CommentList.jsx';
import styles from './CommentSection.module.css';

function CommentSection({ postId, comments, onAddComment }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Comments ({comments.length})</h3>
      <CommentList comments={comments} />
      <CommentForm postId={postId} onAddComment={onAddComment} />
    </section>
  );
}

export default CommentSection;