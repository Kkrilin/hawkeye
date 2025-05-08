"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuffeleSymbol = exports.shuffleIconRandomly = exports.getRandomSymbols = void 0;
var symbols = [
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
    "🪔",
    "🍺",
    "🐱",
    "🐶",
];
var getRandomSymbols = function (n, shouldBeUnique) {
    if (n === void 0) { n = 8; }
    if (shouldBeUnique === void 0) { shouldBeUnique = false; }
    var mySymbol = [];
    while (mySymbol.length < 8) {
        var randomNumber = Math.floor(Math.random() * symbols.length);
        if (!mySymbol.includes(symbols[randomNumber])) {
            mySymbol.push(symbols[randomNumber]);
        }
    }
    return mySymbol;
};
exports.getRandomSymbols = getRandomSymbols;
var shuffleIconRandomly = function (items) {
    for (var i = 0; i < items.length; i++) {
        var randomId = Math.floor(Math.random() * items.length - i);
        var temp = items[items.length - i];
        items[items.length - i] = items[randomId];
        items[randomId] = temp;
    }
    return items;
};
exports.shuffleIconRandomly = shuffleIconRandomly;
var getSuffeleSymbol = function (n, shouldBeUnique) {
    if (shouldBeUnique === void 0) { shouldBeUnique = false; }
    var symbol = (0, exports.getRandomSymbols)(n, shouldBeUnique);
    var doubleTheSymbol = symbol.concat(symbol);
    return (0, exports.shuffleIconRandomly)(doubleTheSymbol);
};
exports.getSuffeleSymbol = getSuffeleSymbol;
