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

  const [routineName, setRoutineName] = useState("");
  const [currentWorkout, setCurrentWorkout] = useState(null); //workout object containing info from db

  const [currentSet, setCurrentSet] = useState(0); // counter to keep track of set
  const [lastSet, setLastSet] = useState(null); // set counter to change exercise when last set finished

  const [currentExerciseObject, setCurrentExerciseObject] = useState(null); // exercise obj to be pushed to payload
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0); // index to increment once last set finished
  const [lastExerciseIndex, setLastExerciseIndex] = useState(null);

  const [setWeight, setSetWeight] = useState(""); // wait for current set to be pushed to current exercise obj

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const [finalWorkoutArray, setFinalWorkoutArray] = useState([]); // Array of exercise objects to send with payload when finished

  useEffect(() => {
    if (!currentWorkout) {
      fetchNextWorkout();
    }
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
      routineName: routineName,
      date: new Date(),
      workoutName: currentWorkout.workoutName,
      exercises: finalWorkoutArray,
    };

    console.log(msgBody);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${username}/workouthistory`,
        msgBody
      );
      router.push(`/user/${username}`);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNextWorkout = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${username}/nextworkout`
      );
      const data = res.data.nextWorkout;
      setCurrentWorkout(data.workout);
      setRoutineName(data.routine);
    } catch (error) {
      console.error(error);
    }
  };

  const startWorkout = () => {
    setCurrentExerciseObject({
      exerciseName: currentWorkout.exercises[0].exerciseName,
      sets: [],
    });
    setWorkoutStarted(true);
    setLastSet(currentWorkout.exercises[0].sets - 1);
    setLastExerciseIndex(currentWorkout.exercises.length - 1);
  };

  const handleFinishSet = (e) => {
    e.preventDefault();
    const exerciseCopy = { ...currentExerciseObject };
    exerciseCopy.sets.push(Number(setWeight));
    setSetWeight("");

    if (currentSet === lastSet && currentExerciseIndex === lastExerciseIndex) {
      const finalWorkoutArrayCopy = [...finalWorkoutArray];
      finalWorkoutArrayCopy.push(exerciseCopy);
      setFinalWorkoutArray(finalWorkoutArrayCopy);
      setWorkoutFinished(true);
    } else if (currentSet === lastSet) {
      const finalWorkoutArrayCopy = [...finalWorkoutArray];
      const nextExerciseIndex = currentExerciseIndex + 1;

      finalWorkoutArrayCopy.push(exerciseCopy);
      setFinalWorkoutArray(finalWorkoutArrayCopy);

      setCurrentSet(0);
      setCurrentExerciseIndex(nextExerciseIndex);
      setCurrentExerciseObject({
        exerciseName: currentWorkout.exercises[nextExerciseIndex].exerciseName,
        sets: [],
      });
      setLastSet(currentWorkout.exercises[nextExerciseIndex].sets - 1);
    } else {
      setCurrentExerciseObject(exerciseCopy);
      setCurrentSet(currentSet + 1);
    }
  };

  const handleChange = (e) => {
    setSetWeight(Number(e.target.value));
  };

  return (
    <main className={styles.main}>
      <Link href={`/user/${username}`} className={styles.home}>
        HOME
      </Link>
      {!workoutStarted ? (
        <div className={styles.start}>
          {currentWorkout ? (
            <h1>Next Workout: {currentWorkout.workoutName}</h1>
          ) : (
            <></>
          )}
          <button onClick={startWorkout}>Start</button>
        </div>
      ) : (
        <section className={styles.set}>
          <h1 className={styles.title}>Workout {currentWorkout.workoutName}</h1>
          <div className={styles.content}>
            <h1>Exercise: {currentExerciseObject.exerciseName}</h1>
            <h2>
              Set: {currentSet + 1} / {lastSet + 1}
            </h2>
            <form onSubmit={handleFinishSet} className={styles.form}>
              <span>
                <input
                  type="number"
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
