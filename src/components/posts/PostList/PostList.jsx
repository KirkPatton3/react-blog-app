import PostCard from '../PostCard/PostCard.jsx';
import styles from './PostList.module.css';

function PostList({ posts }) {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
