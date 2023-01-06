import React, { useEffect, useState } from "react"
import { Digits } from "../Digits"
import WF from "../../assets/word_freqencies.json"
import DialPad from "./DialPad"
import classNames from "classnames"

const WordFrequencies = WF as { [key: string]: number }

export default function App() {
    const [input, setInput] = useState("tiff")
    const [hoveredWord, setHoveredWord] = useState(null as string | null)

    const digits = Digits.fromString(input)
    const words = digits.phonewords
        .slice()
        .sort((a, b) => WordFrequencies[b] - WordFrequencies[a])

    return (
        <div>
            <header className="p-5 w-full">
                <p className="text-3xl">Phonewords</p>
            </header>

            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="p-5">
                    <input
                        type="text"
                        autoFocus={true}
                        className="w-80"
                        placeholder="Try a word"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="p-5 flex flex-row gap-x-5 select-none">
                    {input.split("").map((char, index) => (
                        <div key={index} className="flex flex-col items-center gap-y-3">
                            {/* Letter */}
                            <p className="text-2xl">{char}</p>

                            {/* Digit */}
                            <p className="font-mono text-2xl">{digits.digits[index]}</p>

                            {/* DialPad */}
                            <DialPad digit={digits.digits[index]} />

                            {/* Letters */}
                            <div className="text-2xl">
                                {Digits.charsFromDigit(digits.digits[index]).map((char) => (
                                    <p
                                        key={char}
                                        className={classNames({
                                            "font-bold": hoveredWord && char === hoveredWord[index]
                                        })}
                                    >
                                        {char}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-y-3 text-3xl">
                    {words.map((word) => (
                        <div
                            key={word}
                            className="hover:font-bold"
                            onMouseEnter={() => setHoveredWord(word)}
                            onMouseLeave={() => setHoveredWord(null)}
                        >
                            {word}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
