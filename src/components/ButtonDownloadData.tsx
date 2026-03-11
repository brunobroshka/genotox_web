import { FaFileDownload } from "react-icons/fa";
import useDownloadData from "../hooks/useDownloadData";

type ButtonDownloadDataProps = {
  result: object | boolean;
  casNum: string;
};

function ButtonDownloadData(props: ButtonDownloadDataProps) {

  const { result, casNum } = props;
  const { downloadData } = useDownloadData();

  return (
    <button
      disabled={!result}
      onClick={() => downloadData(casNum, result)}
      className="rounded-md flex justify-center items-center gap-1 border disabled:grayscale grayscale-0 disabled:opacity-50 text-green-600 disabled:cursor-not-allowed p-1 px-2 shadow-md transition-all ease-in-out duration-300 hover:bg-gray-100 transform hover:-translate-y-1 active:-translate-y-0 font-semibold"
    >
     <span className="text-xs">Download</span> <FaFileDownload size={18} />
    </button>
  );
}

export default ButtonDownloadData;
