import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Loader from "./Loader";

interface HeatMapChartProps {
  result: any;
}

function HeatMapChart({ result }: HeatMapChartProps) {
  const [figure, setFigure] = useState<any>(null);
  const [rawHeatmap, setRawHeatmap] = useState<any>(null);

  useEffect(() => {
    try {
      setRawHeatmap(result.combined_heatmap);
      const parsed = JSON.parse(result.combined_plotly_figure_json);
      setFigure(parsed);
    } catch (err) {
      console.error("error fetching heatmap data", err);
    }
  }, []);

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
                Object.keys(rawHeatmap).map(
                  (k) => rawHeatmap[k]["Positive"] || 0,
                ),
                Object.keys(rawHeatmap).map(
                  (k) => rawHeatmap[k]["Negative"] || 0,
                ),
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
