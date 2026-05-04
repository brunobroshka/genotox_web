import { useState } from "react";
import { toast } from "react-toastify";
import * as genotoxApi from "../service/genotoxService";

function useGenotoxQuery(setResult, handleSubmittedCasNum) {
  const [isLoading, setLoading] = useState(false);

  const executeQuery = async (casNum: string, showDetails: string) => {
    setLoading(true);
    setResult(false);
    
    const formData = new FormData();
    formData.append("cas_rn", casNum);
    formData.append("details", showDetails);


    let isPolling = true;
    const toastId = toast.loading("Processing data 0%", {
      position: "top-right"
    });


    const pollProgress = async () => {
      if (!isPolling) return;
      try {
        const resultado = await genotoxApi.queryProgress(casNum);
        const progress = Number(resultado.data.progress || 0);

        toast.update(toastId, { render: `Processing data ${progress}%` });

        if (progress < 100 && isPolling) {
          setTimeout(pollProgress, 1000); // Vuelve a consultar en 1 segundo
        }
      } catch (error) {
        console.error("Error trying to get the progress...", error);
      }
    };

    try {
     
      setTimeout(pollProgress, 500);

   
      const response = await genotoxApi.query(formData);
      isPolling = false; 

      if (response.status == 200) {
        setResult(response.data);
        handleSubmittedCasNum(casNum);
        
    
        toast.update(toastId, {
          render: "Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (err) {
   
      isPolling = false; 
      console.error("Error getting data...", err);
      
  
      toast.update(toastId, {
        render: "Error getting data...",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
      isPolling = false; 
    }
  };

  return { isLoading, executeQuery };
}

export default useGenotoxQuery;