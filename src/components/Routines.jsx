"use client";
import styles from "@/styles/Routines.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Routines({ params }) {
  const { username } = params;
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    console.log(routines);
  }, [routines]);

  const fetchWorkouts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/routines?username=${username}`
      );
      let routines_arr = [];
      data.routines.forEach((routine) => {
        routines_arr.push(routine);
      });
      setRoutines(routines_arr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        {routines.length ? (
          routines.map((routine, index) => {
            return (
              <div
                key={`${routine.routineName}_${index}`}
                className={styles["routine-container"]}>
                <h2>{routine.routineName}</h2>
                <div className={styles.workout}>
                  {routine.workouts.map((workout, index) => {
                    return (
                      <div key={`${workout.workoutName}_${index}`}>
                        <p>{workout.workoutName}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
