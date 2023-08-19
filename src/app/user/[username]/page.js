"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LinkButton from "@/components/LinkButton";

export default function User({ params }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const queryParamsUsername = params.username;

  useEffect(() => {
    const storageUsername = localStorage.getItem("username");
    const isUser = storageUsername === queryParamsUsername;
    if (!isUser) router.push("/");
    else {
      setUsername(queryParamsUsername);
    }
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        {username ? <h1>Hi, {username}</h1> : <></>}
        <LinkButton url={`/user/${username}/create`} text={"Create"} />
        <LinkButton url={`/user/${username}/mystuff`} text={"My stuff"} />
        <LinkButton url={`/user/${username}/friends`} text={"Friends"} />
        <LinkButton
          url={`/user/${username}/workout/log`}
          text={"Past Workouts"}
        />
        <LinkButton
          url={`/user/${username}/workout/new`}
          text={"New Workout"}
        />
      </section>
    </main>
  );
}
