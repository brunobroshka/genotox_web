import Plot from "react-plotly.js";


type PieChartProps = {
  result:any;
  setHoverEffectDatabases: React.Dispatch<React.SetStateAction<object>>;
};

function PieChart(props: PieChartProps) {
  const { result, setHoverEffectDatabases  } = props;
  const formatData = (labels, data) => {
    const result = {
      Negative: [],
      Positive: [],
      Conflicted: [],
      Equivocal: [],
    };

    for (const key of Object.keys(data)) {
      for (const value of Object.keys(data[key])) {
        if (data[key][value] > 0 && result.hasOwnProperty(value)) {
          result[value].push(key);
        }
      }
    }
    return result;
  };



    const totals = result.overall_totals
    const labels = ["Conflicted", "Equivocal", "Negative", "Positive"];
    const values = labels.map((label) => totals[label] || 0);
    const databases = formatData(
      labels,
      result.databases,
    );
    const max = Math.max(...values);
    const min = Math.min(...values);

    function interpolateColor(value, min, max, colorStart, colorEnd) {
      const fraction = (value - min) / (max - min);
      const start = colorStart.match(/\w\w/g).map((c) => parseInt(c, 16));
      const end = colorEnd.match(/\w\w/g).map((c) => parseInt(c, 16));
      const rgb = start.map((s, i) => Math.round(s + fraction * (end[i] - s)));
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    const colors = values.map((v, i) =>
      labels[i].toLowerCase().includes("positive")
        ? "red"
        : interpolateColor(v, min, max, "a7f3d0", "065f46"),
    );

    const data = [
      {
        values: values,
        labels: labels,
        type: "pie",
        marker: { colors: colors },
        textinfo: "percent",
        databases: databases,
      },
    ];




  return (
    <>
      <div className=" mt-2 max-w-lg mx-auto flex justify-center items-center">
        {data && (
          <Plot
            onHover={(e) =>
              setHoverEffectDatabases({
                color: e.points[0].color,
                databases: e.points[0].data.databases[e.points[0].label],
              })
            }
            data={data}
            layout={{ autosize: true, font: { color: "green" } }}
            useResizeHandler={true}
            className="w-96 lg:w-[100%] "
          />
        )}
      </div>
    </>
  );
}

export default PieChart;
