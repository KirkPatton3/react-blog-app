import { useState } from 'react';
import { createComment } from '../../../api/blogAPI.js';
import styles from './CommentForm.module.css';

function CommentForm({ postId, onAddComment }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === '' || text.trim() === '') {
      setError('Please enter your name and a comment.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const savedComment = await createComment(postId, {
        name: name.trim(),
        body: text.trim(),
      });

      onAddComment({ ...savedComment, id: Date.now() });

      setName('');
      setText('');
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Could not post your comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h4 className={styles.heading}>Leave a comment</h4>

      <label htmlFor={`comment-name-${postId}`} className={styles.label}> Name </label>
      <input
        id={`comment-name-${postId}`}
        type="text"
        className={styles.input}
        placeholder="Your name"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor={`comment-${postId}`} className={styles.label}> Comment </label>
      <textarea
        id={`comment-${postId}`}
        className={styles.input}
        rows={3}
        placeholder="Add a comment"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.button} disabled={submitting}>
        {submitting ? 'Posting...' : 'Submit'}
      </button>
    </form>
  );
}

export default CommentForm;