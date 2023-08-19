import styles from "@/styles/Messages.module.css";
import Message from "@/components/Message";
import SendMessage from "@/components/SendMessage";

export default function Messages({
  openedMessages,
  username,
  newMessageText,
  setNewMessageText,
  sendMessage,
}) {
  return (
    <section className={styles.section}>
      <div className={styles["message-container"]}>
        {openedMessages?.messages && openedMessages.messages.length ? (
          openedMessages.messages.map((message, index) => {
            return (
              <Message
                key={`${message.from}_${message.to}_${message.date}_${index}`}
                message={message}
                username={username}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <SendMessage
        newMessageText={newMessageText}
        setNewMessageText={setNewMessageText}
        sendMessage={sendMessage}
      />
    </section>
  );
}
