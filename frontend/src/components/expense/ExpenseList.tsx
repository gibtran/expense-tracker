import { Expense, UpdateExpenseDto } from "../../types";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  onEdit: (data: UpdateExpenseDto, id: string) => void;
}

const ExpenseList = ({ expenses, loading, error, onDelete, onEdit }: Props) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-base font-semibold text-gray-800 mb-4">
      Your Expenses
    </h2>
    {loading ? (
      <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
    ) : error ? (
      <p className="text-sm text-red-400 text-center py-6">{error}</p>
    ) : expenses.length === 0 ? (
      <p className="text-sm text-gray-400 text-center py-6">
        No expenses yet. Add one above!
      </p>
    ) : (
      <ul className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    )}
  </div>
);

export default ExpenseList;
