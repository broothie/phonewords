import classNames from "classnames"
import React from "react"
import { Digits } from "../Digits"

const nums = new Array(9).fill(null).map((_, i) => i + 1)

export default function DialPad({ digit }: { digit: number }) {
    return (
        <div className="grid grid-cols-3">
            {nums.map((num) => (
                <div
                    key={num}
                    className={classNames(
                        "border p-2 flex flex-col justify-center items-center",
                        { "font-bold shadow-inner bg-gray-100 dark:bg-gray-800 text-emerald-500": num === digit }
                    )}
                >
                    <p>{num}</p>
                    <p className="text-xs">
                        {[0, 1].includes(num) ? (
                            "✉️"
                        ) : (
                            Digits.charsFromDigit(num).join("")
                        )}
                    </p>
                </div>
            ))}
        </div>
    )
}
