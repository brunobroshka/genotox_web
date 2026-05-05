import { Result } from "../interfacesAndTypes";

type ModalInformationDatabaseProps = {
  result: Result;
  selectedDatabase: any;
  setSelectedDatabase:React.Dispatch<React.SetStateAction<string | undefined>>
};
function ModalInformationDatabase(props: ModalInformationDatabaseProps) {
  const { result, selectedDatabase,setSelectedDatabase } = props;

  const infoAboutDB = result["data"][selectedDatabase] ;

  return (
    <>
      <div className="flex justify-between bg-white p-2 rounded-t-md flex-none">
        <div className="flex w-full justify-between">
          <span className="text-green-800 text-sm md:text-base font-semibold">
            {selectedDatabase} 
          </span>
          <button onClick={() => setSelectedDatabase(undefined)} className="bg-red-200 transition-all duration-300 hover:bg-red-400 rounded-full px-2 py-0.5">X</button>
        </div>
      </div>
      <div className="bg-white flex-1 rounded-b-md overflow-auto p-2">
        {selectedDatabase &&
          infoAboutDB["index"].map((value, idx) => (
            <div
              key={idx}
              className="flex flex-row gap-20 items-start border-b border-neutral-100"
            >
              <span className="text-green-900 text-sm md:text-base w-32 flex-none">
                {value}
              </span>
              {infoAboutDB["data"][idx].map((value, idx) => (
                <span
                  key={idx}
                  className={`flex-1 text-xs md:text-base ${
                    value == "Positive" ? "text-red-500" : "text-neutral-500"
                  }`}
                >
                  {value}
                </span>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default ModalInformationDatabase;
