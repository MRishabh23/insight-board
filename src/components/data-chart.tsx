import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartComponent = ({ ...props }) => {
  return (
    <div className="mt-3 h-[35rem]">
      <div className="min-h-full rounded-md bg-gray-200 px-10 py-4">{props.children}</div>
    </div>
  );
};
