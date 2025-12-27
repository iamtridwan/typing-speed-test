import Modal from "./Modal";

type Props = {
  currentText: string;
  startTime: boolean;
  setStartTime: () => void;
};

const TextArea = ({ currentText, startTime, setStartTime }: Props) => {
  return (
    <div className="w-full p-5 h-screen relative">
      <p className="text-start text-lg md:text-xl lg:text-2xl leading-16">{currentText}</p>
      {!startTime && <Modal setStartTime={setStartTime} />}
    </div>
  );
};

export default TextArea;
