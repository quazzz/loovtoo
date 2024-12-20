"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ExerciseCardDashboard from "@/components/ExerciseCardDashboard";
export default function GroupCard({ group, onStartWorkout }) {
  const [nameVisible, setNameVisible] = useState(true);
  const [newName, setNewName] = useState("");
  const [exercises, setExercises] = useState([]);
  const handleDelete = async () => {
    try {
      const groupid = group.id;
      const res = await fetch(`/api/group?id=${groupid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.log("An error occured trying to delete");
        return 0;
      }
      window.location.reload();
      return;
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeName = async () => {
    try {
      const groupid = group.id;
      console.log(groupid);
      const res = await fetch(`/api/group?id=${groupid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) {
        console.error("An error occured when fetching");
        return 0;
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`/api/exercises?groupId=${group.id}`);
        const data = await res.json();
        console.log(data);
        setExercises(data.exercises);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);
  return (
    <div className="max-w-sm rounded-lg shadow-md bg-white p-4 m-4 text-center">
      <div
        className="border rounded-full cursor-pointer p-1.5 transition-all duration-200 hover:bg-red-500 hover:text-white inline-flex items-center justify-center shadow-sm"
        onClick={handleDelete}
        title="Delete Group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 3h6l1 3H8l1-3z"></path>
        </svg>
      </div>

      {nameVisible ? (
        <>
          <div
            className="border rounded-full cursor-pointer p-1.5 transition-all duration-200 hover:bg-blue-500 hover:text-white inline-flex items-center justify-center ml-2 shadow-sm"
            onClick={() =>
              nameVisible ? setNameVisible(false) : handleChangeName()
            }
            title="Edit Group Name"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-edit"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.99 3 21l1.01-4L16.5 3.5z"></path>
            </svg>
          </div>

          <div className="mt-2">
            <h2 className="text-base font-medium text-gray-800">
              {group.name}
            </h2>
          </div>
        </>
      ) : (
        <>
          <div
            className="border rounded-full cursor-pointer p-1.5 transition-all duration-200 hover:bg-green-500 hover:text-white inline-flex items-center justify-center ml-2 shadow-sm"
            onClick={() =>
              nameVisible ? setNameVisible(false) : handleChangeName()
            }
            title="Save Group Name"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border-b p-1 text-sm text-gray-700 w-full mt-2 placeholder-gray-400 focus:outline-none focus:border-gray-800"
            placeholder="Enter new name"
          />
        </>
      )}

      <div className="mt-4 space-y-3">
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCardDashboard
              key={exercise.id}
              name={exercise.name}
              gifUrl={exercise.gifUrl}
              bodypart={exercise.bodyPart}
              target={exercise.target}
              equipment={exercise.equipment}
              sets={exercise.sets}
              reps={exercise.reps}
              id={exercise.id}
              kg={exercise.kg}
              instructions={exercise.instructions}
            />
          ))
        ) : (
          <p className="text-xs text-gray-500">
            No exercises found. Find new in{" "}
            <Link href="/dashboard/catalog" className="underline">
              catalog
            </Link>
          </p>
        )}
        {exercises.length > 1 && (
          <button
            className="mt-2 px-3 py-1 text-sm text-white bg-black rounded-md hover:bg-gray-950 transition-all"
            onClick={() => onStartWorkout(group.id)}
          >
            Start workout
          </button>
        )}
      </div>
    </div>
  );
}
