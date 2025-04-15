import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function SplitText({text}: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("div")!
            )
            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 1,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })


    }, [])

    return (
        <div ref={containerRef}>
            <div>
                {text}
            </div>
        </div>
    )
}