const symbols = [
  "🍇",
  "🍉",
  "🚗",
  "🍌",
  "🏠",
  "🥭",
  "🍎",
  "🐯",
  "🍒",
  "🍓",
  "🐵",
  "🥝",
  "🍿",
  "🏀",
  "🎱",
  "🐻",
  "🍜",
  "🍢",
  "🎓",
  "🍤",
  "🦀",
  "🍦",
  "🍩",
  "🎂",
  "🍫",
  "🍭",
  "🍼",
  // "🪔",
  "🍺",
  "🐱",
  "🐶",
];

export const getRandomSymbols = (n = 8, shouldBeUnique = false) => {
  const mySymbol: string[] = [];
  while (mySymbol.length < 8) {
    const randomNumber = Math.floor(Math.random() * symbols.length);
    if (!mySymbol.includes(symbols[randomNumber])) {
      mySymbol.push(symbols[randomNumber]);
    }
  }
  return mySymbol;
};

export const shuffleIconRandomly = <T>(items: Array<T>) => {
  for (let i = 0; i < items.length; i++) {
    const randomId = Math.floor(Math.random() * (items.length - i));
    const temp = items[items.length - i - 1];
    items[items.length - i - 1] = items[randomId];
    items[randomId] = temp;
  }
  return items;
};

export const getSuffeleSymbol = (n: number, shouldBeUnique = false) => {
  const symbol = getRandomSymbols(n, shouldBeUnique);
  const doubleTheSymbol = symbol.concat(symbol);
  return shuffleIconRandomly(doubleTheSymbol);
};
