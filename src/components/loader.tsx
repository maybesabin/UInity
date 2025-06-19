"use client"

type PropsType = {
    color?: string | "white";
    size: number;
}

const Loader = ({ color = "white", size }: PropsType) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                border: `2px solid ${color}`,
                borderTop: `2px solid transparent`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}
        />
    )
}

export default Loader