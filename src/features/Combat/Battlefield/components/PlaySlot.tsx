import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Droppable } from "../../DraggableAndDroppable/Droppable";

export interface IPlaySlotProps {
  droppableId?: string;
}

export const PlaySlot = (props: IPlaySlotProps) => {
  return (
    <Droppable droppableId={props.droppableId ?? "noId"}>
      <Card
        sx={{
          maxWidth: 345,
          height: 480,
          boxShadow:
            "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::MsOverflowStyle": "none",
          "&::scrollbarWidth": "none",
        }}
      >
        {/* <ContentImage
        image={card?.image}
        name={card?.name}
        isEdit={isEdit}
        updateImage={props?.updateImage}
        contentType="Gene"
      ></ContentImage> */}
        <CardContent>
          |=============|
          {/* <ContentName
          name={card?.name}
          isEdit={isEdit}
          updateName={props.updateCardProperty}
          contentType="Gene"
        ></ContentName>
        <ContentDescription
          isEdit={isEdit}
          description={card?.description}
          updateDescription={props.updateCardProperty}
          contentType="Gene"
        ></ContentDescription> */}
        </CardContent>
      </Card>
    </Droppable>
  );
};
