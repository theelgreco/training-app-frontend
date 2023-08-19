import styles from "@/styles/User.module.css";
import Link from "next/link";

export default function User({
  user,
  checkIfFriends,
  sendFriendRequest,
  page,
  acceptFriendRequest,
}) {
  return (
    <Link href={`/profile/${user.username}`}>
      <div className={styles.users}>
        <img src={`${user.picture}`}></img>
        <p>{user.username}</p>
        {page === "search" ? (
          !checkIfFriends(user.username) ? (
            <button
              onClick={() => {
                sendFriendRequest(user.username);
              }}>
              Add friend
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {page === "request" ? (
          <>
            <button
              onClick={() => {
                acceptFriendRequest(user.username);
              }}>
              Accept
            </button>
            <button>Decline</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}
