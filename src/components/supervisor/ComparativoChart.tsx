
import { ResponsiveBar } from "@nivo/bar";

interface DataItem {
  id: number;
  nome: string;
  taxa: number;
  [key: string]: any;
}

interface ComparativoChartProps {
  data: DataItem[];
  type: "supervisores" | "filiais";
}

const SupervisorComparativoChart = ({ data, type }: ComparativoChartProps) => {
  // Preparar dados para o gráfico
  const chartData = data.map(item => ({
    equipe: item.nome,
    taxa: item.taxa,
    taxaColor: item.taxa >= 80 ? "#3effb3" : item.taxa >= 60 ? "#ffcc00" : "#ff4d4f"
  }));

  return (
    <ResponsiveBar
      data={chartData}
      keys={["taxa"]}
      indexBy="equipe"
      margin={{ top: 20, right: 20, bottom: 100, left: 60 }} // Increased bottom margin to show labels
      padding={0.3}
      valueScale={{ type: "linear" }}
      colors={({ data }) => data.taxaColor}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45, // Angled labels for better readability
        legend: type === "supervisores" ? "Equipes" : "Filiais",
        legendPosition: "middle",
        legendOffset: 70, // Increased offset for legend
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Taxa de Conversão (%)",
        legendPosition: "middle",
        legendOffset: -50,
        truncateTickAt: 0
      }}
      enableGridY={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 3]]
      }}
      legends={[]}
      role="application"
      ariaLabel="Comparativo de taxas"
      barAriaLabel={e => e.id + ": " + e.formattedValue + " no grupo: " + e.indexValue}
      theme={{
        text: {
          fill: "#a0a0a0"
        },
        axis: {
          ticks: {
            line: {
              stroke: "#555555"
            },
            text: {
              fill: "#a0a0a0"
            }
          },
          legend: {
            text: {
              fill: "#c0c0c0"
            }
          }
        },
        grid: {
          line: {
            stroke: "#333333"
          }
        },
        tooltip: {
          container: {
            background: "#222",
            color: "#fff",
            fontSize: 12,
            borderRadius: 4,
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.5)"
          }
        }
      }}
    />
  );
};

export default SupervisorComparativoChart;
