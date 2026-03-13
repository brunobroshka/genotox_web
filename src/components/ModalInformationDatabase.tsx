import { Result } from "../interfacesAndTypes";

type ModalInformationDatabaseProps = {
  result: Result,
  selectedDatabase : any
}
function ModalInformationDatabase(props: ModalInformationDatabaseProps) {

    const {result,selectedDatabase} = props;
    
  return (
    <>
      <div className="flex justify-between bg-white p-2 rounded-t-md flex-none">
        <div>
          <span className="text-green-800 text-sm md:text-base font-semibold">
            {selectedDatabase}
          </span>
        </div>
      </div>
      <div className="bg-white flex-1 rounded-b-md overflow-auto p-2">
        {selectedDatabase &&
          result[selectedDatabase]["index"].map((value, idx) => (
            <div
              key={idx}
              className="flex flex-row gap-20 items-start border-b border-neutral-100"
            >
              <span className="text-green-900 text-sm md:text-base w-32 flex-none">
                {value}
              </span>
              {result[selectedDatabase]["data"][idx].map((value, idx) => (
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
