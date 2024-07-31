"use client";
import { useAppState } from "@/lib/state";

function GuessesList() {
  const state = useAppState();

  return (
    <div>
      {state.guesses.map((x) => (
        <div key={x.artistGid}>
          <h5>{x.name}</h5>
          {JSON.stringify(x)}
        </div>
      ))}
    </div>
  );
}

export default GuessesList;
