export class Trie {
  children: { [key: string]: Trie };
  isWordEnd: boolean;

  static fromWords(words: string[]): Trie {
    const root = new Trie()

    for(const word of words) {
      root.addWord(word)
    }

    return root
  }

  constructor() {
    this.isWordEnd = false;
    this.children = {};
  }

  containsPrefix(prefix: string): boolean {
    const next = this.children[prefix.charAt(0)]
    if (!next) return false

    if (prefix.length === 1) {
      return true
    } else {
      return next.containsPrefix(prefix.slice(1))
    }
  }

  contains(word: string): boolean {
    const next = this.children[word.charAt(0)]
    if (!next) return false

    if (word.length === 1) {
      return next.isWordEnd
    } else {
      return next.contains(word.slice(1))
    }
  }

  words(): string[] {
    const words = []

    for (const char in this.children) {
      const child = this.children[char]
      if (child.isWordEnd) words.push(char)

      for (const word of child.words()) {
        words.push(char + word)
      }
    }

    return words
  }

  addWord(word: string) {
    const char = word.charAt(0)
    const next = this.children[char] || (this.children[char] = new Trie())

    if (word.length === 1) {
      next.isWordEnd = true
    } else {
      next.addWord(word.slice(1))
    }
  }
}
