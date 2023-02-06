import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Player } from "../../../../services/character-service/character-factory";

interface IPlayerMorphologyProps {
  player: Player;
}

export const PlayerMorphology = (props: IPlayerMorphologyProps) => {
  const [player, setPlayer] = useState<Player>(props.player);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          A look at
        </Typography>
        <Typography variant="h3" component="div">
          {player.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card>
              <Typography variant="h4">Overall</Typography>
              <div>Health: {props.player.health}</div>
              <div>Name: {props.player.name}</div>
              <div>Gender: {props.player.morphology.gender}</div>
              <Typography variant="h6">-- Skin --</Typography>
              <div>Type : {props.player.morphology.skin.type}</div>
              <div>Color : {props.player.morphology.skin.color}</div>
              <Typography variant="h6">-- Muscle --</Typography>
              <div>Type : {props.player.morphology.muscle.type}</div>
              <div>Size : {props.player.morphology.muscle.size}</div>
              <div>Tone : {props.player.morphology.muscle.tone}</div>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Typography variant="h4">Head</Typography>
              <div>Face: {props.player.morphology.head.face}</div>
              <div>Ears: {props.player.morphology.head.ears}</div>
              <Typography variant="h6">-- Hair --</Typography>
              <div>Style: {props.player.morphology.head.hair.style}</div>
              <div>Color: {props.player.morphology.head.hair.color}</div>
              <Typography variant="h6">-- Eyes --</Typography>
              {props.player.morphology.head.eyes.map((eye, index) => {
                return (
                  <div key={index}>
                    <div>Eye: {eye.type}</div>
                    <div>Color: {eye.color}</div>
                  </div>
                );
              })}
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Typography variant="h4">Stats</Typography>
              <div>Strength: {props.player.stats.strength}</div>
              <div>Fortitude: {props.player.stats.fortitude}</div>
              <div>Agility: {props.player.stats.agility}</div>
              <div>Will: {props.player.stats.will}</div>
              <div>Intelligence: {props.player.stats.intelligence}</div>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Typography variant="h4">Torso</Typography>
              <div>Type: {props.player.morphology.head.face}</div>
              <div>Back: {props.player.morphology.torso.back}</div>
              <Typography variant="h6">-- Arms --</Typography>
              {props.player.morphology.torso.arms.map((arm, index) => {
                return (
                  <div key={index}>
                    <div>Type: {arm.type}</div>
                    <div>Hand: {arm.hand}</div>
                  </div>
                );
              })}
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Typography variant="h4">Bottom</Typography>
              <div>Type: {props.player.morphology.bottom.type}</div>
              <Typography variant="h6">-- Legs --</Typography>
              {props.player.morphology.bottom.legs.map((leg, index) => {
                return (
                  <div key={index}>
                    <div>Type: {leg.type}</div>
                    <div>Foot: {leg.foot}</div>
                  </div>
                );
              })}
            </Card>
          </Grid>
        </Grid>
        <div>name {props.player.name}</div>
      </CardContent>
    </Card>
  );
};
