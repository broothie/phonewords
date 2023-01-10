import {Trie} from "../../src/js/Trie";

describe("Trie tests", () => {
    let words: Array<string>;
    let myTrie: Trie;

    beforeEach(() => {
        words = [
            "a", "apple", "anagram",
            "be", "bee", "bees",
            "cat", "cthulhu", "cute",
        ];
        myTrie = Trie.fromWords(words);
    });

    describe("fromWords", () => {
        it("first layer of Trie is accurate", () => {
            const firstLayer = myTrie.children;
            expect(Object.keys(firstLayer).length).toBe(3);
            expect(firstLayer["a"].isWordEnd).toBeTruthy();
            expect(firstLayer["b"].isWordEnd).toBeFalsy();
            expect(firstLayer["c"].isWordEnd).toBeFalsy();
        });
    });

    describe("contains", () => {
        it("contains the words", () => {
            expect(myTrie.contains("a")).toBeTruthy();
            expect(myTrie.contains("cthulhu")).toBeTruthy()
        });

        it("does not contain the words", () => {
            expect(myTrie.contains("apples")).toBeFalsy();
            expect(myTrie.contains("beer")).toBeFalsy();
        });
    });

    describe("containsPrefix", () => {
        it("contains the prefixes", () => {
            expect(myTrie.containsPrefix("a")).toBeTruthy();
            expect(myTrie.containsPrefix("anagram")).toBeTruthy();
        });

        it("does not contain the prefixes", () => {
            expect(myTrie.containsPrefix("d")).toBeFalsy();
            expect(myTrie.containsPrefix("cuter")).toBeFalsy();
        });
    });

    describe("addWord", () => {
        it("adds a new prefix properly", () => {
           myTrie.addWord("donut");
           const firstLayer = myTrie.children;
           expect(Object.keys(firstLayer).length).toBe(4);
        });

        it("amends the children of existing paths", () => {
           myTrie.addWord("apples");
           expect(myTrie.children["a"]?.containsPrefix("pples"));
        });
    });

    describe("words", () => {
        it("contains all words provided in construction", () => {
            const actual = myTrie.words().slice().sort();
            const expected = words.slice().sort();
            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });

    describe("deadbeef", () => expect(1).toBe(2));
});