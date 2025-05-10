class Trie {
  trie: { [key in string]: any };

  constructor(arrOfWord: string[] = []) {
    this.trie = {};
    this.addWordsToTrie(arrOfWord);
  }

  addWordsToTrie(arrOfWords: string[]) {
    for (const word of arrOfWords) {
      let obj: { [key in string]: any } = this.trie;
      const item = word.toLowerCase();
      for (const letter of item) {
        if (!Object.prototype.hasOwnProperty.call(obj, letter)) {
          obj[letter] = {};
        }
        obj = obj[letter];
      }
      obj.end = true;
    }
  }

  getWordsFromTrie(word: string, count: number): string[] {
    word = word.toLowerCase();
    let obj: { [key in string]: any } = this.trie;
    for (const letter of word) {
      obj = obj[letter];
      if (!obj) {
        return [];
      }
    }
    return this.getWordsByDFS(obj, count, word);
  }

  getWordsByDFS(
    trie: { [key in string]: any },
    count: number,
    word: string,
    result: string[] = []
  ) {
    if (trie.end) {
      result.push(word);
      if (result.length === count) {
        return result;
      }
    }
    for (const key in trie) {
      if (Object.prototype.hasOwnProperty.call(trie, key)) {
        this.getWordsByDFS(trie[key], count, word + key, result);
        if (result.length === count) {
          break;
        }
      }
    }
    return result;
  }
}

export default Trie;
