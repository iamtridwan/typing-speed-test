
const ScoreBoard = () => {
    return (
        <div className="flex items-center md:gap-4 justify-between md:justify-start w-full md:w-fit">
            <div className="flex items-center md:gap-2 pr-12 md:pr-4 border-r border-[#949497] flex-col md:flex-row justify-center">
                <p className="text-[#949497] text-base m-0 md:text-lg">WPM:</p>
                <p className="text-white font-bold m-0 text-xl md:text-lg">0</p>
            </div>
            <div className="flex items-center md:gap-2 pr-12 md:pr-4 border-r border-[#949497] flex-col md:flex-row justify-center">
                <p className="text-[#949497] m-0 text-base md:text-lg">Accuracy:</p>
                <p className="text-white font-bold m-0 text-xl md:text-lg">100%</p>
            </div>
            <div className="flex items-center md:gap-2 flex-col md:flex-row justify-center">
                <p className="text-[#949497] text-base m-0 md:text-lg">Time:</p>
                <p className="text-white font-bold m-0 text-xl md:text-lg">0:60</p>
            </div>
        </div>
    )
}

export default ScoreBoard