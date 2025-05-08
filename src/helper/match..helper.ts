import { connectedWords } from "../utils/matchword";

export const getRandomItem = (itemRequired = 4, items: string[][]) => {
  const randomArray = [];
  const setId = new Set();
  let count = 0;
  while (randomArray.length < itemRequired) {
    const idx = Math.floor(Math.random() * items.length);
    if (!setId.has(idx)) {
      randomArray[count] = items[idx];
      setId.add(idx);
      count++;
    }
  }
  return randomArray;
};

export const suffleWords = (randomWordItems: string[][]) => {
  const items = randomWordItems.flat();
  for (let i = 0; i < items.length; i++) {
    const idx = Math.floor(Math.random() * (items.length - i));
    const temp = items[items.length - i - 1];
    items[items.length - i - 1] = items[idx];
    items[idx] = temp;
  }
  return items;
};

export const getConnectedGroup = (groupSize = 2, item = 4) => {
  const connectedWordsGroup = connectedWords.get(groupSize);
  if (!connectedWordsGroup) {
    return;
  }
  const randomWordItems = getRandomItem(item, connectedWordsGroup);
  const groupItems: Array<Set<string>> = [];

  randomWordItems.forEach((gItes) => {
    groupItems.push(new Set(gItes));
  });
  const allItems = suffleWords(randomWordItems);
  return [allItems, groupItems];
};

export const isWordFromSameGroup = (groupItems, selected: string[]) => {
  console.log("selected", selected);
  console.log("groupItems", groupItems);
  const group = groupItems.find((group) => group.has(selected[0]));
  if (!group) {
    return;
  }
  console.log("group", group);
  return selected.every((string) => group.has(string));
};
