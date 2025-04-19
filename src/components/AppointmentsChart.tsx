import { AppointmentsPerYear } from "@/types/Dashboard";
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

const CustomLegend = ({ totalAppointments }: { totalAppointments: number }) => (
  <div className="flex items-center justify-center gap-2">
    <p className="font-semibold">Total appointments:</p>
    <span>{totalAppointments}</span>
  </div>
);

function AppointmentsChart({
  appointmentsPerYear,
  totalAppointments,
}: {
  appointmentsPerYear: AppointmentsPerYear[] | undefined;
  totalAppointments: number;
}) {
  return (
    <div className="mt-8">
      <ResponsiveContainer
        initialDimension={{ width: 450, height: 300 }}
        minHeight={300}
        minWidth={400}
      >
        <BarChart
          width={500}
          height={300}
          data={appointmentsPerYear}
          margin={{
            right: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend
            content={<CustomLegend totalAppointments={totalAppointments} />}
          />
          <Bar
            maxBarSize={100}
            dataKey="appointments"
            fill="#132bd0"
            activeBar={<Rectangle fill="#364f67" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AppointmentsChart;
