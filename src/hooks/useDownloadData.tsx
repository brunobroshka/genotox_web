import { downloadData as download } from "../service/genotoxService";
import saveBlobAsExcel from "../utils/saveBlobAsExcel";

function useDownloadData() {
  const downloadData = async (casNum:string, result) => {
    
    const formData = { cas_rn: casNum, data: result };
    const response = await download(formData);
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveBlobAsExcel(blob, `gt_result_${casNum}.xlsx`);
  };

  return {downloadData}
}

export default useDownloadData;
