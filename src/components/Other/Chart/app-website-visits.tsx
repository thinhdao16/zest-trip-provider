import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Chart from "./chart";
import { useChart } from ".";

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({
  title,
  chart,
}: {
  title: string; // Specify the type for 'title'
  chart: any; // You might want to replace 'any' with a more specific type for your chart data
  // ... (add types for other props if needed)
}) {
  const { labels, colors, series, options } = chart;

  // Tạo bản sao của mảng series để không ảnh hưởng đến dữ liệu gốc
  const formattedSeries = series.map(
    (dataSet: { data: { value: string }[] }) => {
      const formattedData = dataSet.data.map((value) => value);
      return {
        ...dataSet,
        data: formattedData,
      };
    }
  );

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    fill: {
      type: formattedSeries.map((i: any) => i.fill),
    },
    labels,
    xaxis: {
      type: "category",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: string) => {
          if (typeof value !== "undefined") {
            return value;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <div className="bg-white p-4 shadow-custom-card-mui rounded-xl">
      <span className="font-medium">{title}</span>
      <Box>
        <Chart
          dir="ltr"
          type="line"
          series={formattedSeries}
          options={chartOptions}
          width="100%"
          height={235}
        />
      </Box>
    </div>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
