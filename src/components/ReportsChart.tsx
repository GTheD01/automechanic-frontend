import { ReportsPerYear } from "@/types/Dashboard";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomLegend = ({ totalReports }: { totalReports: number }) => (
  <div className="flex items-center justify-center gap-2">
    <p className="font-semibold">Total reports:</p>
    <span>{totalReports}</span>
  </div>
);

function ReportsChart({
  reportsPerYear,
  totalReports,
}: {
  reportsPerYear: ReportsPerYear[] | undefined;
  totalReports: number;
}) {
  return (
    <div className="mt-8 lg:w-1/2">
      <ResponsiveContainer
        initialDimension={{ width: 450, height: 300 }}
        minHeight={300}
        minWidth={400}
      >
        <BarChart
          width={500}
          height={300}
          data={reportsPerYear}
          margin={{
            right: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend totalReports={totalReports} />} />
          <Bar
            maxBarSize={100}
            dataKey="reportsCount"
            fill="#132bd0"
            activeBar={<Rectangle fill="#364f67" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReportsChart;
