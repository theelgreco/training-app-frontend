"use client";
import styles from "@/styles/Search.module.css";
import User from "./User";
import { useState } from "react";
import axios from "axios";

export default function Search({ openSearch, friends, username, profile }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile?username=${searchText}`
      );
      setSearchResults(data.profile);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFriendRequest = async (user) => {
    console.log(user);
    const payload = {
      username: user,
      profile: { username: username, picture: profile.picture },
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/request/send`,
        payload
      );
      console.log("request sent");
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfFriends = (user) => {
    return friends.find((el) => {
      return el.username === user;
    });
  };

  return (
    <div className={styles.search}>
      <button
        onClick={() => {
          openSearch();
          setSearchText("");
          setSearchResults([]);
        }}>
        x
      </button>
      <div>
        <input
          type="text"
          placeholder="search username"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}></input>
        <button onClick={fetchUsers}>search</button>
      </div>

      {searchResults.length ? (
        <div className={styles.results}>
          {searchResults.map((user, index) => {
            return (
              <User
                key={`${user.username}_${index}_search`}
                checkIfFriends={checkIfFriends}
                sendFriendRequest={sendFriendRequest}
                user={user}
                page={"search"}
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
