import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import { CombatCard } from "../CombatCards/CombatCard";

interface IPlayerHandProps {
  //   item: any;
}

export const PlayerHand = (props: IPlayerHandProps) => {
  const [handIsOpen, setHandIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setHandIsOpen(!handIsOpen);
  };

  const exampleCards: CombatCard[] = [
    {
      id: 1,
      name: "Laser Blast",
      description: "Fire everything!",
      cost: 1,
      type: "Action",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/laserBlast.png",
    },
    {
      id: 2,
      name: "Force Field",
      description: "Da Bubble",
      cost: 1,
      type: "Reaction",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/forceField.png",
    },
    {
      id: 3,
      name: "Deployable Auto Turret",
      description: "Relax, Its got this",
      cost: 1,
      type: "Spawn",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/deployableAutoTurret.png",
    },
  ];

  return (
    <>
      <Button onClick={toggleDrawer}>Open Hand</Button>
      <Drawer anchor="bottom" open={handIsOpen} onClose={toggleDrawer}>
        <Grid container>
          {exampleCards.map((card, index) => {
            return (
              <Grid item xs={2} key={index}>
                <CombatCard card={card} />
              </Grid>
            );
          })}
        </Grid>
      </Drawer>
    </>
  );
};
