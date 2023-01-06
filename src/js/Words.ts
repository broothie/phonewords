import { Trie } from "./Trie";
import WordFrequencies from "../assets/word_freqencies.json"

export const Words = Trie.fromWords(Object.keys(WordFrequencies))
