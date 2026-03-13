import { useState } from "react";
import { toast } from "react-toastify";
import * as genotoxApi from "../service/genotoxService";

function useGenotoxQuery(setResult, handleSubmittedCasNum) {
  const [isLoading, setLoading] = useState(false);

  const executeQuery = async (casNum: string, showDetails: string) => {
    setLoading(true);
    setResult(false);

    let siguePidiendoProgreso = true;
    const toastId = toast.loading("Processing data 0%");

    async function sondearProgreso() {
      if (!siguePidiendoProgreso) return;

      const resultado = await genotoxApi.queryProgress(casNum);
      const progress = Number(resultado.data.progress);

      toast.update(toastId, { render: `Processing data ${progress}%` });

      if (progress < 100) {
        setTimeout(sondearProgreso, 1000);
      }
    }

    async function iniciarProceso() {
      const formData = new FormData();
      formData.append("cas_rn", casNum);
      formData.append("details", showDetails);

      try {
        setTimeout(sondearProgreso, 500);

        const result = await genotoxApi.query(formData);

        if (!result.data.download_ready) {
          toast.update(toastId, {
            render: result.data.error,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          siguePidiendoProgreso = false;
          setLoading(false);
          return;
        }

        siguePidiendoProgreso = false;

        toast.update(toastId, {
          render: "Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setResult(result.data.data);
        console.log("useGenotoxQuery")
        console.log(result.data.data)
        handleSubmittedCasNum(casNum);
        setLoading(false);
      } catch (error) {
        console.error(error);
        siguePidiendoProgreso = false;
        setLoading(false);

        toast.update(toastId, {
          render: "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }

    iniciarProceso();
  };

  return { isLoading, executeQuery };
}

export default useGenotoxQuery;
