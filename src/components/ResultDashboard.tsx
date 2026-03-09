import VisualizeData from "./VisualizeData";
import PieChart from "./pieChart";
import { AnimatePresence, motion } from "framer-motion";
import ModalInformationDatabase from "./ModalInformationDatabase";
import { useState } from "react";
import HeatMapChart from "./HeatMapChart";

interface ResultDashboardProps {
  submittedCas: string;
  result: any;
}

function ResultDashboard({ submittedCas, result }: ResultDashboardProps) {
  const [hoverEffectDatabases, setHoverEffectDatabases] = useState<object>({});
  const [selectedDatabase, setSelectedDatabase] = useState<string | undefined>(
    undefined,
  );

  const handleChangeDatabase = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDatabase(event.target.value);
  };

  const closeModalDataBaseInformation = () => {
    setSelectedDatabase(undefined);
  };

  return (
    <>
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-hidden"
        >

          <VisualizeData
            setSelectedDatabase={setSelectedDatabase}
            hoverEffectDatabases={hoverEffectDatabases}
            result={result}
            selectedDatabase={selectedDatabase}
            handleChangeDatabase={handleChangeDatabase}
          />

          <div className="flex flex-col justify-center items-center lg:flex-row flex-1 min-h-0">
            <div className="flex-1 min-w-0 overflow-auto">
              <PieChart
                casNum={submittedCas}
                setHoverEffectDatabases={setHoverEffectDatabases}
              />
            </div>
            <div className="flex-1 min-w-0 overflow-auto">
              <HeatMapChart casNum={submittedCas} />
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {result && selectedDatabase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed shadow p-1 ring-2 ring-neutral-200 rounded-md  
             w-[95%] h-[95%] bg-neutral-100 top-[1%] left-[2.5%] flex flex-col"
          >
            <ModalInformationDatabase
              result={result}
              selectedDatabase={selectedDatabase}
              onClose={closeModalDataBaseInformation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResultDashboard;
