import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function SplitText({text}: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("p")!
            )

            // Animate the words in the h1
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
        <div className='conatainer'ref={containerRef}>
            <p>
               {text}
            </p>
            <style>{`
                .container {
                    display: block;
                    
                    width: 100%;
                    max-width: 420px;
                    text-align: left;
                    visibility: hidden;
                }

                .split-word {
                    will-change: transform, opacity;
                }
            `}</style>
        </div>
    )
}

// function Stylesheet() {
//     return (
//         <style>{`
//             .container {
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 width: 100%;
//                 max-width: 420px;
//                 text-align: left;
//                 visibility: hidden;
//             }

//             .split-word {
//                 will-change: transform, opacity;
//             }
//         `}</style>
//     )
// }