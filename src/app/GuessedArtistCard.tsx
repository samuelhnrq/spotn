"use client";

import React from "react";
import type { GuessAnswer } from "@/lib/models";
import { Card, CardContent, Typography } from "@mui/material";

interface GuessedArtistCardProps {
  guess: GuessAnswer;
}

function GuessedArtistCard({
  guess: { artist, ...guess },
}: GuessedArtistCardProps) {
  return (
    <Card variant="outlined" sx={{ width: "100%", marginTop: 2 }}>
      <CardContent>
        <Typography variant="h4">Name: {artist.name}</Typography>
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
      </CardContent>
    </Card>
  );
}

export default GuessedArtistCard;
