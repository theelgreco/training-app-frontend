"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/Workouts.module.css";

export default function Workouts({ params }) {
  const { username } = params;
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    console.log(workouts);
  }, [workouts]);

  const fetchWorkouts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouts?username=${username}`
      );
      let workout_arr = [];
      data.workouts.forEach((workout) => {
        workout_arr.push(workout);
      });
      setWorkouts(workout_arr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        {workouts.length ? (
          workouts.map((workout, index) => {
            return (
              <div
                key={`${workout.workoutName}_${index}`}
                className={styles["exercise-container"]}>
                <h2>{workout.workoutName}</h2>
                <div className={styles.exercise}>
                  {workout.exercises.map((exercise, index) => {
                    return (
                      <div key={`${exercise.exerciseName}_${index}`}>
                        <h3>{exercise.exerciseName}</h3>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Rest: {exercise.rest}s</p>
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
