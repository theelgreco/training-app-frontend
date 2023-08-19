"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import styles from "@/styles/Log.module.css";
import LinkButton from "@/components/LinkButton";

export default function Log({ params }) {
  const router = useRouter();
  const viewingAs = usePathname().split("/")[1];
  const [workouts, setWorkouts] = useState(null);
  const { username } = params;
  const [localUser, setLocalUser] = useState("");

  useEffect(() => {
    // const storageUsername = localStorage.getItem("username");
    // const isUser = storageUsername === username;
    // if (!isUser) router.push("/");
    // else
    setLocalUser(localStorage.getItem("username"));
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouthistory?username=${username}`
      );
      console.log(res);
      setWorkouts(res.data.workouts);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const d = dateString.split("T")[0].split("-");
    return `${d[2]}/${d[1]}/${d[0]}`;
  };

  return (
    <main className={styles.main}>
      <h1>History</h1>
      {workouts ? (
        workouts.length ? (
          <section className={styles.all_workouts}>
            {workouts.map((workout, index) => {
              return (
                <div key={`workout_${index}`} className={styles.single_workout}>
                  {formatDate(workout.date)} | {workout.workout}
                  <div className={styles.single_workout_exercises}>
                    {workout.exercises.map((exercise, index) => {
                      return (
                        <div key={`${exercise}_${index}`}>
                          <p>{Object.keys(exercise)[0]}</p>
                          {exercise[Object.keys(exercise)[0]].map(
                            (set, index) => {
                              return (
                                <p key={`${exercise}_${set}_${index}`}>
                                  set {index + 1} | {set} kg
                                </p>
                              );
                            }
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <section>
            {viewingAs === "user" ? (
              <>
                <h2>You haven't done any workouts yet</h2>
                <LinkButton
                  url={`/user/${username}/workout/new`}
                  text={"Start first workout"}
                />
              </>
            ) : (
              <>
                <h2>{username} hasn't done any workouts yet</h2>
                <LinkButton
                  url={`/user/${localUser}/messages?friend=${username}`}
                  text={"Send a message - tell them to shift their bum"}
                />
              </>
            )}
          </section>
        )
      ) : (
        <></>
      )}
    </main>
  );
}
