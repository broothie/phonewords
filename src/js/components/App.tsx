import React, { useEffect, useState } from "react"
import { Digits } from "../Digits"
import WF from "../../assets/word_freqencies.json"
import DialPad from "./DialPad"
import classNames from "classnames"
import { queryParam, setQueryParam } from "../query"

const ALPHABET = "abcdefghijklmnopqrstuvwxyz"
const WordFrequencies = WF as { [key: string]: number }

export default function App() {
    const [input, setInput] = useState(queryParam("input"))
    const [hoveredWord, setHoveredWord] = useState(null as string | null)

    const digits = Digits.fromString(input)
    const words = digits.phonewords
        .slice()
        .sort((a, b) => WordFrequencies[b] - WordFrequencies[a])
        .filter((word) => word !== input)

    function updateInput(input: string) {
        setInput(
            input
                .split("")
                .map((char) => char.toLowerCase())
                .filter((char) => ALPHABET.includes(char))
                .join("")
        )
    }

    function selectedWord(): string | null {
        return hoveredWord || words[0]
    }

    useEffect(() => { setQueryParam("input", input) }, [input])

    return (
        <div>
            <header className="p-5 w-full">
                <p className="text-3xl">Phonewords</p>
            </header>

            <div className="container mx-auto flex flex-col items-center justify-center p-5">
                <div>
                    <input
                        type="text"
                        autoFocus={true}
                        className="w-80 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        placeholder="Try a word"
                        value={input}
                        onChange={(e) => updateInput(e.target.value)}
                    />
                </div>

                <div className="p-5 flex flex-row gap-x-5 select-none">
                    {input.split("").map((char, index) => {
                        const digit = digits.digits[index]

                        return (
                            <div key={index} className="flex flex-col items-center gap-y-3">
                                {/* Letter */}
                                <p className="text-2xl font-bold font-mono">{char}</p>

                                {/* Digit */}
                                <p className="font-mono text-2xl font-bold">{digit}</p>

                                {/* DialPad */}
                                <DialPad digit={digit} />

                                {/* Letters */}
                                <div className="text-2xl font-bold">
                                    {Digits.charsFromDigit(digit).map((char) => {
                                        const word = selectedWord()

                                        return (
                                            <span
                                                key={char}
                                                className={classNames({ "text-emerald-500": word && char === word[index] })}
                                            >
                                                {char}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-col gap-y-3 text-3xl">
                    {words.length > 0 ? (
                        <div className="flex flex-row gap-x-3">
                            <div>phoneword(s):</div>
                            <div>
                                {words.map((word, index) => (
                                    <div
                                        key={word}
                                        className={classNames("", {
                                            "font-bold": index === 0,
                                            "text-emerald-500": word === selectedWord()
                                        })}
                                        onMouseEnter={() => setHoveredWord(word)}
                                        onMouseLeave={() => setHoveredWord(null)}
                                    >
                                        {word}
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    ) : (
                        input.length > 0 && `no phonewords for "${input}" :(`
                    )}
                </div>
            </div>
        </div >
    )
}
