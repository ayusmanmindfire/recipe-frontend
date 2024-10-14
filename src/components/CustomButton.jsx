export const CustomButton = ({text}) => {
    return (
        <>
            <button className="bg-primary hover:bg-hoverPrimary text-white mt-3 rounded p-3 font-Rubik">
                {text}
            </button>
        </>
    )
}