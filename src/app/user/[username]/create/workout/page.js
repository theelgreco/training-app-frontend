"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";

export default function Page({ params }) {
  const { username } = params;
  const [workoutName, setWorkoutName] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (exercises.length) console.log(exercises);
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

  const findExerciseIndex = (exercise) => {
    const exercisesCopy = [...exercises];
    const index = exercisesCopy.findIndex((el) => {
      return exercise === el.exerciseName;
    });
    return index;
  };

  const handleSelectChange = (e) => {
    const indexToInsert = Number(e.target.value);
    const { id } = e.target;
    const exercisesCopy = [...exercises];
    const indexToRemove = findExerciseIndex(id);
    const exerciseToChange = exercisesCopy[indexToRemove];
    const exercisesRemoved = exercisesCopy.toSpliced(indexToRemove, 1);
    const exerciseAfterAdd = exercisesRemoved.toSpliced(
      indexToInsert - 1,
      0,
      exerciseToChange
    );

    setExercises(exerciseAfterAdd);
  };

  const postWorkout = async (e) => {
    const payload = {
      username: username,
      workoutName: workoutName,
      exercises: exercises,
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
            <div>
              {exercises.map((ex, index) => {
                return (
                  <div key={`${ex.exerciseName}_${index}`}>
                    <p>{ex.exerciseName}</p>
                    <select
                      onChange={handleSelectChange}
                      id={ex.exerciseName}
                      defaultValue={`${
                        findExerciseIndex(ex.exerciseName) + 1
                      }`}>
                      {exercises.map((opt, optIndex) => {
                        return (
                          <option
                            value={`${findExerciseIndex(opt.exerciseName) + 1}`}
                            key={`${ex.exerciseName}_${optIndex}_option`}>
                            {optIndex + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
            <Button method={postWorkout} text={"Upload workout"} />
          </section>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
