import styles from './Accordion.module.sass'

const Accordion = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <h3>{title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Accordion;

