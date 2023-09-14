"use client";
import styles from "./page.module.css";
import fonts from "@/styles/fonts.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const load_fonts = fonts;
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login?username=${username}&password=${password}`
      );
      localStorage.setItem("username", username);

      router.push(`/user/${username}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login?username=${username}&password=${password}`
      );
      localStorage.setItem("username", username);

      router.push(`/user/${username}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <div className={styles.heading}>
          <h1>Welcome</h1>
          <p>Please fill in your details to continue</p>
        </div>
        <Textinput
          type={"text"}
          labelText={"username"}
          setMethod={setUsername}
          value={username}
        />
        <Textinput
          type={"password"}
          labelText={"password"}
          setMethod={setPassword}
          value={password}
        />
        <Button method={handleLogin} text={"LOGIN"} />
        <Button method={handleSignUp} text={"SIGN UP"} />
      </form>
    </main>
  );
}
