import { Expense, UpdateExpenseDto } from "../../types";
import { useState } from "react";
const categoryColors: Record<string, string> = {
  food: "bg-orange-100 text-orange-700",
  transport: "bg-blue-100 text-blue-700",
  shopping: "bg-pink-100 text-pink-700",
  entertainment: "bg-purple-100 text-purple-700",
  health: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-700",
};

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (data: UpdateExpenseDto, id: string) => void;
}

const ExpenseItem = ({ expense, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [date, setDate] = useState(expense.date.slice(0, 10));
  const [category, setCategory] = useState(expense.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEdit(
      {
        title,
        amount: parseFloat(amount),
        date,
        category: category as Expense["category"],
      },
      expense.id
    );
  };
  if (isEditing) {
    return (
      <li className="p-4 bg-blue-50 rounded-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Expense["category"])}
            className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg py-2 transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg py-2 transition"
          >
            Cancel
          </button>
        </form>
      </li>
    );
  }
  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            categoryColors[expense.category] ?? categoryColors.other
          }`}
        >
          {expense.category}
        </span>
        <div>
          <p className="text-sm font-medium text-gray-800">{expense.title}</p>
          <p className="text-xs text-gray-400">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-800">
          ${expense.amount.toFixed(2)}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-blue-400 hover:text-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-xs text-red-400 hover:text-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
