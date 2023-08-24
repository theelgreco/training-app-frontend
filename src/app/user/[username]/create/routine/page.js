"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import DragContainer from "@/components/DragContainer";
import Workout from "@/components/Workout";
import { twoPointer } from "src/utils/utils";

export default function Page({ params }) {
  const { username } = params;
  const [routineName, setRoutineName] = useState("");
  const [workout, setWorkout] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [defaultRoutine, setDefaultRoutine] = useState(false);
  const containerRef = React.createRef();

  useEffect(() => {
    fetchWorkouts();
    import("@theelgreco/dragdropreact");
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

  const postRoutine = async (e) => {
    const ids = containerRef.current.getIds();
    const sortedRoutine = twoPointer(ids, routine, "workoutName");

    const payload = {
      username: username,
      routineName: routineName,
      workouts: sortedRoutine,
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
            <DragContainer
              data={routine}
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
              idKey={"workoutName"}
              boxContent={Workout}
            />
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
