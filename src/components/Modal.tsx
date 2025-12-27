type Props = {
  setStartTime: () => void;
};

const Modal = ({ setStartTime }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-md bg-black/5">
      <div className="w-full h-full flex items-center flex-col justify-center">
        <button
          onClick={setStartTime}
          className="bg-[#177DFF] hover:cursor-pointer text-white rounded-lg p-3 text-base font-medium"
        >
          Start Typing Test
        </button>
        <p className="text-white mt-2">Or click the text and start typing</p>
      </div>
    </div>
  );
};

export default Modal;
