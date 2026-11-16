import { useState } from 'react';
import styles from './ContactPage.module.css';

const emptyForm = { name: '', email: '', message: '' };

function ContactPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [submittedName, setSubmittedName] = useState('');

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedName(formData.name);
    setFormData(emptyForm);
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Contact Me</h2>
      <p className={styles.intro}>
        Want to get in contact with me? Submit a form below!
      </p>

      {submittedName && (
        <p className={styles.success}>
          Thanks, {submittedName}! Your message was received.
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message" className={styles.label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            className={styles.input}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </section>
  );
}

export default ContactPage;