"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import DragContainer from "@/components/DragContainer";
import { twoPointer } from "src/utils/utils";
import Exercise from "@/components/Exercise";

export default function Page({ params }) {
  const { username } = params;
  const [workoutName, setWorkoutName] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [exercises, setExercises] = useState([]);
  const containerRef = React.createRef();

  useEffect(() => {
    if (exercises.length) console.log(exercises);
    import("@theelgreco/dragdropreact");
  }, [exercises]);

  const handleAdd = () => {
    const exerciseToAdd = {
      exerciseName: exercise,
      sets: Number(sets),
      reps: Number(reps),
      rest: Number(rest),
    };
    const exercisesCopy = [...exercises];
    exercisesCopy.push(exerciseToAdd);
    setExercises(exercisesCopy);
    resetFields();
  };

  const resetFields = () => {
    setExercise("");
    setRest("");
    setReps("");
    setSets("");
  };

  const postWorkout = async (e) => {
    const ids = containerRef.current.getIds();
    const sortedExercises = twoPointer(ids, exercises, "exerciseName");

    const payload = {
      username: username,
      workoutName: workoutName,
      exercises: sortedExercises,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouts`,
        payload
      );
      setWorkoutName("");
      setExercises([]);
      resetFields();
      alert("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section>
          {exercises.length ? (
            <h2>{workoutName}</h2>
          ) : (
            <Textinput
              type={"text"}
              labelText={"workout name"}
              setMethod={setWorkoutName}
              value={workoutName}
            />
          )}
        </section>
        {workoutName || exercises.length ? (
          <section>
            <Textinput
              type={"text"}
              labelText={"exercise"}
              setMethod={setExercise}
              value={exercise}
            />
            <Textinput
              type={"number"}
              labelText={"number of sets"}
              setMethod={setSets}
              value={sets}
            />
            <Textinput
              type={"number"}
              labelText={"reps per set"}
              setMethod={setReps}
              value={reps}
            />
            <Textinput
              type={"number"}
              labelText={"rest (seconds)"}
              setMethod={setRest}
              value={rest}
            />

            {(exercise && sets && reps && rest) || exercises.length ? (
              <Button method={handleAdd} text={"Add exercises"} />
            ) : (
              <></>
            )}
          </section>
        ) : (
          <></>
        )}
        {exercises.length ? (
          <section>
            <DragContainer
              data={exercises}
              containerRef={containerRef}
              containerStyle={{
                width: "100%",
                flexFlow: "row wrap",
                gap: "10px",
                justifyContent: "center",
              }}
              boxStyle={{
                height: "100px",
                width: "100px",
                border: "1px solid",
                background: "gray",
              }}
              idKey={"exerciseName"}
              boxContent={Exercise}
            />
            <Button method={postWorkout} text={"Upload workout"} />
          </section>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
