import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import * as genotoxApi from "../service/genotoxService";
import Loader from "./Loader";

interface HeatMapChartProps {
  casNum: string;
}

function HeatMapChart({ casNum }: HeatMapChartProps) {

  const [figure, setFigure] = useState<any>(null);
  const [rawHeatmap, setRawHeatmap] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("cas_rn", casNum);

      try {
        const response = await genotoxApi.getHeatMapData(formData);
        if (response && response.data) {
          const respData = response.data;
          setRawHeatmap(respData.combined_heatmap);
          if (respData.combined_plotly_figure_json) {
            try {
              const parsed = JSON.parse(respData.combined_plotly_figure_json);
              setFigure(parsed);
            } catch (err) {
              console.error("could not parse heatmap figure json", err);
            }
          }
        }
      } catch (err) {
        console.error("error fetching heatmap data", err);
      }
    };

    if (casNum) {
      fetchData();
    }
  }, [casNum]);

  return (
    <div className="mt-2 flex-1 min-w-0 flex justify-center items-center">
      {figure ? (
        <Plot
          data={figure.data}
          layout={{ ...figure.layout, autosize: true }}
          useResizeHandler={true}
          className="w-full"
        />
      ) : rawHeatmap ? (
        <Plot
          data={[
            {
              z: [
                Object.keys(rawHeatmap).map((k) => rawHeatmap[k]["Positive"] || 0),
                Object.keys(rawHeatmap).map((k) => rawHeatmap[k]["Negative"] || 0),
              ],
              x: Object.keys(rawHeatmap),
              y: ["Positive", "Negative"],
              type: "heatmap",
              colorscale: "Viridis",
            },
          ]}
          layout={{ autosize: true, font: { color: "green" } }}
          useResizeHandler={true}
          className="w-full"
        />
      ) : (
        <Loader position="onsite" message="Loading Heatmap chart ..." />
      )}
    </div>
  );
}

export default HeatMapChart;
