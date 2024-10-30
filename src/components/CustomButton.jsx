// Custom button with customized styles, text, and an event handler 
export const CustomButton = ({text,eventFunction}) => {
    return (
        <>
            <button className="bg-primary hover:bg-hoverPrimary text-white mt-3 rounded p-3 font-Rubik" onClick={eventFunction}>
                {text}
            </button>
        </>
    )
}