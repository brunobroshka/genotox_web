import apiClient from './apiClient.tsx';

export const query = async (formData: any) => {
    return await apiClient.post('/api/process/', formData);
  };


export const queryProgress = async (cas_rn:string) => {
  return await apiClient.get(`/progress/${cas_rn}/`)
}


export const downloadData = async (formData:any) => {
  const response = await apiClient.post<ArrayBuffer>(
    '/api/download/',
    formData,
    { responseType: 'arraybuffer' }
  );
  return response;
}

export const getAllPlots = async (FormData:any) => {
  const response = await apiClient.post(
    '/api/combined-plots/',
    FormData
  )
  return response
}

export const getPieChartData = async (formData: any) => {
  const response = await apiClient.post(
    '/api/pie-chart/',
    formData,
  );
  return response
}


export const getHeatMapData = async (FormData:any) => {
  const response = await apiClient.post(
    '/api/heatmap/',
    FormData,
  );
  return response
}