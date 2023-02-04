import { Eye } from "../../../../../services/character-service/Character";

export const describeEyeTypes = (eyes: Eye[]): string => {
  const uniqueEyeTypes = new Set(eyes.map((eye) => eye.type));
  if (uniqueEyeTypes.size === 1) {
    return `You have ${eyes.length} ${
      uniqueEyeTypes.values().next().value
    } eyes`;
  } else {
    const rowSize = 2;
    const rows = createEyeRows(eyes, rowSize);
    let eyeDescription = "";
    rows.forEach((row, index: number) => {
      const eyesAreSameType = new Set(row.map((eye) => eye.type)).size === 1;
      if (eyesAreSameType) {
        eyeDescription =
          eyeDescription +
          `${rowDescriptors[index]} ${row.length} ${row[0].color} ${row[0].type} eyes`;
      } else {
        eyeDescription =
          eyeDescription +
          `${rowDescriptors[index]} ${row.length} different ${row[0].color} ${row[0].type} and ${row[1].color} ${row[1].type} eyes`;
      }

      eyeDescription = eyeDescription + `${rowDescriptors[index]}`;
    });
    return eyeDescription;
  }
};

const rowDescriptors = [
  "Your first row of eyes is",
  "Your second row of eyes is",
  "Your third row of eyes is",
];

const createEyeRows = (eyes: Eye[], numberPerRow: number) => {
  const chunkedEyes: Eye[][] = eyes.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / numberPerRow);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(item);

    return acc;
  }, [] as Eye[][]);

  return chunkedEyes;
};
