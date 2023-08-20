import styles from "@/styles/Requests.module.css";
import User from "./User";
import axios from "axios";

export default function Requests({
  openRequests,
  requests,
  username,
  setRequests,
}) {
  const acceptFriendRequest = async (user) => {
    const payload = { requestee: username, requestor: user };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/request/accept`,
        payload
      );
      console.log("friends!!");
      const indexToRemove = requests.findIndex((el) => {
        return el.username === user;
      });
      const requestsCopy = [...requests];
      requestsCopy.splice(indexToRemove, 1);
      setRequests(requestsCopy);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.request}>
      <button onClick={openRequests}>x</button>
      {requests.length ? (
        <div className={styles.results}>
          {requests.map((user, index) => {
            return (
              <User
                key={`${user.username}_${index}_request`}
                acceptFriendRequest={acceptFriendRequest}
                user={user}
                page={"request"}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
