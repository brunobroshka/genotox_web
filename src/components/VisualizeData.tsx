import useIsMobile from "../hooks/useIsMobile";

function VisualizeData({
  result,
  selectedDatabase,
  handleChangeDatabase,
  setSelectedDatabase,
  hoverEffectDatabases,
}) {
  const keys = Object.keys(result.databases);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col px-1 py-1">
      {!isMobile && (
        <div className="flex flex-row flex-wrap gap-2">
          {keys.map((key, index) => {
            let isActive = undefined;
            if (Object.keys(hoverEffectDatabases).length > 0) {
              isActive = hoverEffectDatabases["databases"].includes(key);
            } else {
              isActive = false;
            }

            if (result.databases[key] !== null) {
              return (
                <button
                  className={`${
                    isActive ? "text-black" : "text-gray-500"
                  }  min-w-44 opacity-70 hover:opacity-100 hover:text-black transition-all duration-300 ease-in-out rounded shadow-md p-1 transform hover:-translate-y-1`}
                  style={{
                    boxShadow:
                      isActive &&
                      `0px 2px 1px ${hoverEffectDatabases["color"]}`,
                  }}
                  key={index}
                  onClick={() => setSelectedDatabase(key)}
                >
                  {key}
                </button>
              );
            }
          })}
        </div>
      )}
      {isMobile && (
        <select
          className="bg-white border rounded   p-[1px]"
          value={selectedDatabase}
          onChange={handleChangeDatabase}
        >
          {keys.map((key) => {
            if (result.databases[key] !== null) {
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            }
          })}
        </select>
      )}
    </div>
  );
}

export default VisualizeData;
