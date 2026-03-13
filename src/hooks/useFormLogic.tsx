import { useState } from "react";

function useFormLogic() {

  const [result, setResult] = useState<object | boolean>(false);
  const [submittedCas, setSubmittedCas] = useState<string>("");

  const handleSubmittedCasNum = (casNum: string) => {
        setSubmittedCas(casNum);
  };

  return {result,setResult,submittedCas,handleSubmittedCasNum};
}

export default useFormLogic;
