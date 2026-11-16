import styles from './CommentItem.module.css';

function CommentItem({ name, text }) {
  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}</p>
      <p className={styles.text}>{text}</p>
    </li>
  );
}

export default CommentItem;