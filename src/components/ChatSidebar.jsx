import styles from "@/styles/ChatSidebar.module.css";
import clsx from "clsx";

export default function ChatSidebar({
  sortedMessages,
  openedMessages,
  setOpenedMessages,
}) {
  const openUserMessages = (e) => {
    const friend = e.target.id;
    const friendMessages = sortedMessages.find((el) => {
      return el.friend === friend;
    });
    setOpenedMessages(friendMessages);
  };

  return (
    <section className={styles.section}>
      {sortedMessages.length ? (
        sortedMessages.map((message, index) => {
          return (
            <div
              key={`${message.friend}_${index}`}
              id={`${message.friend}`}
              onClick={openUserMessages}
              className={clsx(styles.friend, {
                [styles.active]:
                  openedMessages.messages &&
                  openedMessages.friend === message.friend,
              })}>
              <h3 style={{ pointerEvents: "none" }}>{message.friend}</h3>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </section>
  );
}
