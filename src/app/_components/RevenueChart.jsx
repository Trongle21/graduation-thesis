import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = ({ data }) => {
  const options = {};
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
