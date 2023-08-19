import styles from "@/styles/SendMessage.module.css";
import Button from "@/components/Button";

export default function SendMessage({
  newMessageText,
  setNewMessageText,
  sendMessage,
}) {
  return (
    <div className={styles["new-message-container"]}>
      <textarea
        value={newMessageText}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage(e);
        }}
        onChange={(e) => {
          setNewMessageText(e.target.value);
        }}
      />
      <Button method={sendMessage} text={"send"} />
    </div>
  );
}
