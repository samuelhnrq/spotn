"use client";
import { useAppState } from "@/lib/state";
import { Typography } from "@mui/material";

function GuessesList() {
  const state = useAppState();
  console.log(state);

  return (
    <div>
      <Typography variant="h2">Guesses</Typography>
      {state.guesses.map(({ artist, ...guess }) => (
        <div key={artist.artistGid}>
          <Typography variant="h3">Name: {artist.name}</Typography>
          <Typography color={guess.countryCorrect ? "green" : "gray"}>
            Country: {artist.country}
          </Typography>
          <Typography color={guess.debutYearDelta === 0 ? "green" : "gray"}>
            DebutYear: {artist.debutYear}
          </Typography>
          <Typography color={guess.genreCorrect ? "green" : "gray"}>
            Genre: {artist.genre}
          </Typography>
          <Typography color={guess.genderCorrect ? "green" : "gray"}>
            Gender: {artist.gender}
          </Typography>
          <Typography color={guess.membersDelta === 0 ? "green" : "gray"}>
            Members: {artist.members}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default GuessesList;
