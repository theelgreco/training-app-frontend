"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";

export default function Page({ params }) {
  const { username } = params;
  const [routineName, setRoutineName] = useState("");
  const [workout, setWorkout] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [defaultRoutine, setDefaultRoutine] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (workouts.length) console.log(workouts);
  }, [workouts]);

  useEffect(() => {
    console.log(routine);
  }, [routine]);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workouts?username=${username}`
      );
      setWorkouts(res.data.workouts);
      setWorkout(res.data.workouts[0].workoutName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setWorkout(value);
  };

  const handleAdd = (e) => {
    const routineCopy = [...routine];
    const index = workouts.findIndex((el) => {
      return el.workoutName === workout;
    });
    routineCopy.push(workouts[index]);
    setRoutine(routineCopy);
  };

  const handleOrderSelect = (e) => {
    const indexToInsert = Number(e.target.value);
    const { id } = e.target;
    const routineCopy = [...routine];
    const indexToRemove = findWorkoutIndex(id);
    const workoutToChange = routineCopy[indexToRemove];
    const routineRemoved = routineCopy.toSpliced(indexToRemove, 1);
    const routineAfterAdd = routineRemoved.toSpliced(
      indexToInsert - 1,
      0,
      workoutToChange
    );

    setRoutine(routineAfterAdd);
  };

  const findWorkoutIndex = (work_out) => {
    const routineCopy = [...routine];
    const index = routineCopy.findIndex((el) => {
      return work_out === el.workoutName;
    });
    return index;
  };

  const postRoutine = async (e) => {
    const payload = {
      username: username,
      routineName: routineName,
      workouts: routine,
      current: defaultRoutine,
      nextWorkout: routine[0].workoutName,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/routines`,
        payload
      );
      setRoutineName("");
      setRoutine([]);
      setWorkout(workouts[0].workoutName);
      setDefaultRoutine(false);
      alert("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section>
          {routine.length ? (
            <h2>{routineName}</h2>
          ) : (
            <Textinput
              type={"text"}
              labelText={"routine name"}
              setMethod={setRoutineName}
              value={routineName}
            />
          )}
        </section>
        {routineName || routine.length ? (
          <section>
            <select onChange={handleSelect} value={workout}>
              {workouts.map((el, index) => {
                return (
                  <option
                    key={`${el.workoutName}_${index}`}
                    value={el.workoutName}
                    id={el.workoutName}>
                    {el.workoutName}
                  </option>
                );
              })}
            </select>
            <Button method={handleAdd} text={"Add workout"} />
          </section>
        ) : (
          <></>
        )}
        {routine.length ? (
          <section>
            <div>
              {routine.map((el, index) => {
                return (
                  <div key={`${el.workoutName}_${index}`}>
                    <p>{el.workoutName}</p>
                    <select
                      onChange={handleOrderSelect}
                      id={el.workoutName}
                      defaultValue={`${findWorkoutIndex(el.workoutName) + 1}`}>
                      {routine.map((opt, optIndex) => {
                        return (
                          <option
                            value={`${findWorkoutIndex(opt.workoutName) + 1}`}
                            key={`${opt.workoutName}_${optIndex}_option`}>
                            {optIndex + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
            <div>
              <input
                type="checkbox"
                id="default"
                name="default"
                onChange={(e) => {
                  setDefaultRoutine(e.target.checked);
                }}
              />
              <label htmlFor="default" style={{ color: "white" }}>
                Set to default routine?
              </label>
            </div>
            <Button method={postRoutine} text={"Upload routine"} />
          </section>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
