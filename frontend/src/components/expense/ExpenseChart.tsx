import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Expense } from "../../types";

const COLORS = [
  "#f97316",
  "#3b82f6",
  "#ec4899",
  "#a855f7",
  "#22c55e",
  "#6b7280",
];

const CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "entertainment",
  "health",
  "other",
];

interface Props {
  expenses: Expense[];
}

const ExpenseChart = ({ expenses }: Props) => {
  const data = CATEGORIES.map((category, index) => ({
    name: category,
    // lấy ra những expense thuộc về category và tính tổng amount của chúng
    value: expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0),
    fill: COLORS[index % COLORS.length], // gán màu từ mảng COLORS
  })).filter((item) => item.value > 0); // chỉ lấy những category có giá trị > 0

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          ></Pie>
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
