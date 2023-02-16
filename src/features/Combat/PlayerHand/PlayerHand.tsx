import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import { CombatCard } from "../CombatCards/CombatCard";
import { Draggable } from "../DraggableAndDroppable/Draggable";

interface IPlayerHandProps {
  selectCard?: (card: CombatCard) => void;
  handIsOpen?: boolean;
}

export const PlayerHand = (props: IPlayerHandProps) => {
  const [handIsOpen, setHandIsOpen] = useState<boolean>(
    props.handIsOpen ?? false
  );

  useEffect(() => {
    if (props.handIsOpen == undefined) return;
    setHandIsOpen(props.handIsOpen);
  }, [props.handIsOpen]);

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

  const handleCardClick = (card: CombatCard) => {
    if (props.selectCard == undefined) return;
    props.selectCard(card);
  };

  return (
    <>
      <Drawer anchor="bottom" open={handIsOpen} onClose={toggleDrawer}>
        <Grid container>
          {exampleCards.map((card, index) => {
            return (
              <Grid item xs={2} key={index}>
                <div onClick={() => handleCardClick(card)}>
                  <Draggable id={"draggable" + card.id}>
                    <CombatCard card={card} />
                  </Draggable>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Drawer>
    </>
  );
};
