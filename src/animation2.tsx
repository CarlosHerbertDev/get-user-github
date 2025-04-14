import { frame, motion, useSpring } from "motion/react"
import { RefObject, useEffect, useRef } from "react"

export default function Drag({img}: { img: any }) {
    const ref = useRef<HTMLDivElement>(null)
    const { x, y } = useFollowPointer(ref)

    return (    
    <motion.div 
    className="min-w-[200px] min-h-[200px]"
    ref={ref} style={{ x, y }}>

        <img src={img} alt="imagem do perfil"  className="w-[200px] h-[200px] rounded-[50%] border-2 border-solid border-secundary"/>

    </motion.div>
    )
}

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 }

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        if (!ref.current) return

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!

            frame.read(() => {
                x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY - element.offsetTop - element.offsetHeight / 2)
            })
        }

        window.addEventListener("pointermove", handlePointerMove)

        return () =>
            window.removeEventListener("pointermove", handlePointerMove)
    }, [])

    return { x, y }
}

/**
 * ==============   Styles   ================
 */

// const ball = {
//     width: 100,
//     height: 100,
//     backgroundColor: "#ff0088",
//     borderRadius: "50%",
// }