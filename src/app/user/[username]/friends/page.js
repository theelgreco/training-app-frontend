"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Friends from "@/components/Friends";
import Requests from "@/components/Requests";
import Search from "@/components/Search";

export default function FriendsPage({ params }) {
  const { username } = params;
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile?username=${username}`
      );
      setProfile(data.profile[0]);
      setFriends(data.profile[0].friends);
      setRequests(data.profile[0].requests);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const openRequests = () => {
    setRequestsOpen(!requestsOpen);
  };

  return (
    <main className={styles.main}>
      {searchOpen ? (
        <Search
          openSearch={openSearch}
          friends={friends}
          profile={profile}
          username={username}
        />
      ) : (
        <></>
      )}
      {requestsOpen ? (
        <Requests
          openRequests={openRequests}
          requests={requests}
          setRequests={setRequests}
          username={username}
        />
      ) : (
        <></>
      )}
      <Friends
        friends={friends}
        requests={requests}
        openRequests={openRequests}
        openSearch={openSearch}
        username={username}
      />
    </main>
  );
}
