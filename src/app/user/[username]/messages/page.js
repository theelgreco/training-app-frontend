"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Messages from "@/components/Messages";
import ChatSidebar from "@/components/ChatSidebar";

export default function page() {
  const [username, setUsername] = useState("");
  const [sortedMessages, setSortedMessages] = useState([]);
  const [openedMessages, setOpenedMessages] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const usernameFromStorage = localStorage.getItem("username");
    setUsername(usernameFromStorage);
    fetchMessages(usernameFromStorage);
  }, []);

  const fetchMessages = async (username) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${username}/messages`
      );
      const messagesFromApi = res.data.messages;
      const uniqueUsernames = getUniqueUsernames(messagesFromApi, username);
      const sorted = [];
      uniqueUsernames.forEach((user) => {
        const userMessages = sortMessagesByUser(messagesFromApi, user);
        sorted.push(userMessages);
      });

      const usernameFromParams = searchParams.get("friend");
      const usernameFromParamsIsValid = await isValidUser(usernameFromParams);
      const indexInMessages = findIndexFromParams(sorted, usernameFromParams);

      console.log(
        usernameFromParams,
        usernameFromParamsIsValid,
        indexInMessages
      );

      if (!usernameFromParamsIsValid || !usernameFromParams) {
        console.log("either no params provided or invalid user");
        setOpenedMessages(sorted[0]);
      } else if (indexInMessages < 0) {
        console.log("creating and opening new chat with valid user");
        sorted.unshift({ friend: usernameFromParams, messages: [] });
        setOpenedMessages(sorted[0]);
      } else {
        console.log("opening chat with user from params");
        const ind = findIndexFromParams(sorted, usernameFromParams);
        setOpenedMessages(sorted[ind]);
      }

      setSortedMessages(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const getUniqueUsernames = (messagesArray, username) => {
    let names = [];

    messagesArray.forEach((message) => {
      const sender = message.from;
      const receiver = message.to;

      if (sender !== username) {
        names.push(sender);
      } else if (receiver !== username) {
        names.push(receiver);
      }
    });

    let uniqueNames = Array.from(new Set([...names]));
    return uniqueNames;
  };

  const sortMessagesByUser = (messagesArray, username) => {
    const messages = [];

    messagesArray.forEach((message) => {
      const sender = message.from;
      const receiver = message.to;

      if (sender === username) {
        messages.push(message);
      } else if (receiver === username) {
        messages.push(message);
      }
    });

    return { friend: username, messages: messages };
  };

  const sendMessage = async (e) => {
    const receiver = openedMessages.friend;
    const payload = {
      from: username,
      message: newMessageText,
      date: new Date(),
    };
    openedMessages.messages.unshift({ ...payload, to: receiver });
    e.target.blur();
    setNewMessageText("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${receiver}/messages`,
        payload
      );

      console.log("message sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const findIndexFromParams = (messagesArray, username) => {
    return messagesArray.findIndex((el) => {
      return el.friend === username;
    });
  };

  const isValidUser = async (username) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile?username=${username}`
      );
      console.log("is valid");
      console.log(res.data.profile.length);
      return res.data.profile.length;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <main className={styles.main}>
      <ChatSidebar
        sortedMessages={sortedMessages}
        openedMessages={openedMessages}
        setOpenedMessages={setOpenedMessages}
      />
      <Messages
        openedMessages={openedMessages}
        newMessageText={newMessageText}
        setNewMessageText={setNewMessageText}
        username={username}
        sendMessage={sendMessage}
      />
    </main>
  );
}
