import styles from "@/styles/LinkButton.module.css";
import Link from "next/link";

export default function LinkButton({ url, text, style }) {
  return (
    <Link href={url} style={style}>
      <button className={styles.button}>{text}</button>
    </Link>
  );
}
