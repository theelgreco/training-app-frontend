import styles from "@/styles/Message.module.css";
import clsx from "clsx";

export default function Message({ message, username }) {
  return (
    <div
      className={clsx(styles.message, {
        [styles["message-friend"]]: message.from !== username,
        [styles["message-self"]]: message.from === username,
      })}>
      <p>{message.message}</p>
    </div>
  );
}
