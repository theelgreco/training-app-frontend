"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";

export default function Page({ params }) {
  const profileUsername = params.username;
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    fetchUserDetails();
    console.log(window.location.origin);
  }, []);

  const getFriendStatus = (profile) => {
    const { friends, requests } = profile;
    const username = localStorage.getItem("username");

    const isAFriend = friends.find((el) => {
      return el.username === username;
    });
    const isPending = requests.find((el) => {
      return el.username === username;
    });
    if (isAFriend) return "friend";
    else if (isPending) return "pending";
    else return false;
  };

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/view/profile?username=${profileUsername}`
      );
      console.log(data);
      setProfile(data.profile[0]);
      setIsLoading(false);
      setIsFriend(getFriendStatus(data.profile[0]));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      {!isLoading ? (
        <div>
          <div className={styles["user-details"]}>
            <img src={profile.picture}></img>
            <h3>{profileUsername}</h3>
          </div>
          <div className={styles["button-container"]}>
            <LinkButton
              url={`/user/${username}/messages?friend=${profileUsername}`}
              text={"Send message"}
            />
            {!isFriend ? (
              <Button text={"Send request"} />
            ) : isFriend === "pending" ? (
              <Button text={"Request sent"} />
            ) : (
              <></>
            )}

            <LinkButton
              url={`/profile/${profileUsername}/workouts`}
              text={"Workouts"}
            />
            <LinkButton
              url={`/profile/${profileUsername}/routines`}
              text={"Routines"}
            />
            <LinkButton
              url={`/profile/${profileUsername}/log`}
              text={"Workout Log"}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
