import { Words } from "./Words";

export class Digits {
  digits: number[];
  #chars: string[][] | null;

  static CharIndexes = [
    null,                  // 0
    null, "abc", "def",    // 1 2 3
    "ghi", "jkl", "mno",   // 4 5 6
    "pqrs", "tuv", "wxyz", // 7 8 9
  ]

  static charsFromDigit(digit: number): string[] {
    return Digits.CharIndexes[digit]!.split("")
  }

  static fromString(s: string): Digits {
    return new Digits(s.split("").map((char) => Digits.CharIndexes.findIndex((chars) => chars?.includes(char))!))
  }

  static fromNumber(n: number): Digits {
    return new Digits(n.toString().split("").map((digit) => parseInt(digit)))
  }

  constructor(digits: number[]) {
    this.digits = digits;

    this.#chars = null;
  }

  get chars(): string[][] {
    if (this.#chars) {
      return this.#chars
    } else {
      return this.#chars = this.digits.map(Digits.charsFromDigit)
    }
  }

  get phonewords(): string[] {
    let phonewords = [""]

    this.chars.forEach((chars, index) => {
      phonewords = phonewords.flatMap((phoneword) => {
        return chars.map((char) => phoneword + char).filter((word) => {
          if (index === this.chars.length - 1) {
            return Words.contains(word)
          } else {
            return Words.containsPrefix(word)
          }
        })
      })
    })

    return phonewords
  }
}
