import styles from "@/styles/Button.module.css";

export default function Button({ method, text, style }) {
  return (
    <button onClick={method} className={styles.button} style={style}>
      {text}
    </button>
  );
}
