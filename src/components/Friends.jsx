import styles from "@/styles/Friends.module.css";
import User from "./User";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";

export default function Friends({
  friends,
  requests,
  openRequests,
  openSearch,
  username,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles["button-container"]}>
        <Button method={openRequests} text={`Requests (${requests.length})`} />

        <Button method={openSearch} text={"Add friends"} />
        <LinkButton url={`/user/${username}/messages`} text={"messages"} />
      </div>
      <div className={styles["friends-container"]}>
        <h1>Friends</h1>
        <div>
          {friends.length ? (
            friends.map((user, index) => {
              return <User user={user} key={`${user.username}_${index}`} />;
            })
          ) : (
            <h2>No friends... Billy no mates</h2>
          )}
        </div>
      </div>
    </section>
  );
}
