"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { workouts } from "constants/workouts";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewWorkout({ params }) {
  const { username } = params;
  const router = useRouter();
  const [currentSet, setCurrentSet] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentExerciseName, setCurrentExerciseName] = useState(null);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentWorkoutName, setCurrentWorkoutName] = useState(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [lastSet, setLastSet] = useState(null);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [setWeight, setSetWeight] = useState("");

  useEffect(() => {
    fetchNextWorkout();
  }, []);

  useEffect(() => {
    if (workoutFinished) {
      postWorkout();
    }
  }, [workoutFinished]);

  useEffect(() => {
    if (currentWorkout) {
      console.log(currentWorkout);
    }
  }, [currentWorkout]);

  const postWorkout = async () => {
    const msgBody = {
      username: username,
      date: new Date(),
      workout: currentWorkoutName,
      exercises: currentWorkout,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouts?username=${username}`,
        msgBody
      );
      router.push(`/user/${username}`);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNextWorkout = async () => {
    const lookupObj = { A: "B", B: "A" };
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouts?username=${username}&order=desc&limit=1`
      );
      if (!data.workouts.length) {
        setCurrentWorkoutName("A");
        setCurrentWorkout(workouts.A);
      } else {
        const lastWorkout = data.workouts[0].workout;
        const nextWorkout = lookupObj[lastWorkout];
        setCurrentWorkoutName(nextWorkout);
        setCurrentWorkout(workouts[nextWorkout]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startWorkout = () => {
    const workoutCopy = JSON.parse(JSON.stringify(currentWorkout));
    const ex_name = Object.keys(workoutCopy[0])[0];
    setWorkoutStarted(true);
    setCurrentWorkout(workoutCopy);
    setCurrentSet(0);
    setCurrentExercise(0);
    setCurrentExerciseName(ex_name);
    setLastSet(workoutCopy[0][ex_name].length - 1);
  };

  const handleFinishSet = (e) => {
    e.preventDefault();
    const workoutCopy = JSON.parse(JSON.stringify(currentWorkout));
    workoutCopy[currentExercise][currentExerciseName][currentSet] = setWeight;
    setCurrentWorkout(workoutCopy);

    if (currentSet === lastSet && currentExercise === 2) {
      setWorkoutFinished(true);
    } else if (currentSet < lastSet) {
      setCurrentSet(currentSet + 1);
    } else {
      const nextExercise = currentExercise + 1;
      const ex_name = Object.keys(workoutCopy[nextExercise])[0];
      setCurrentSet(0);
      setCurrentExercise(nextExercise);
      setCurrentExerciseName(ex_name);
      setLastSet(workoutCopy[nextExercise][ex_name].length - 1);
    }

    setSetWeight("");
  };

  const handleChange = (e) => {
    setSetWeight(e.target.value);
  };

  return (
    <main className={styles.main}>
      <Link href={`/user/${username}`} className={styles.home}>
        HOME
      </Link>
      {!workoutStarted ? (
        <div className={styles.start}>
          {currentWorkoutName ? (
            <h1>Next Workout: {currentWorkoutName}</h1>
          ) : (
            <></>
          )}
          <button onClick={startWorkout}>Start</button>
        </div>
      ) : (
        <section className={styles.set}>
          <h1 className={styles.title}>Workout {currentWorkoutName}</h1>
          <div className={styles.content}>
            <h1>Exercise: {currentExerciseName}</h1>
            <h2>
              Set: {currentSet + 1} / {lastSet + 1}
            </h2>
            <form onSubmit={handleFinishSet} className={styles.form}>
              <span>
                <input
                  type="text"
                  value={setWeight}
                  onChange={handleChange}></input>
                <label>KG</label>
              </span>
              <button type="submit">+</button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
