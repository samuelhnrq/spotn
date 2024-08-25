"use client";

import type { GuessAnswer } from "@/lib/models";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

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
        {guess.comparisions.map((comp) => (
          <Typography key={comp.propId} color={comp.correct ? "green" : "gray"}>
            {comp.name}: {comp.value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

export default GuessedArtistCard;
