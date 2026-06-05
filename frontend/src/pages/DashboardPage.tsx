import { useExpenses } from "../hooks/useExpenses";
import Navbar from "../components/layout/Navbar";
import TotalCard from "../components/expense/TotalCard";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";
import { useMemo, useState } from "react";
import ExpenseChart from "../components/expense/ExpenseChart";
const DashboardPage = () => {
  const { expenses, loading, error, addExpense, removeExpense, editExpense } =
    useExpenses();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((e) => {
        return selectedCategory ? e.category === selectedCategory : true;
      })
      .filter((e) => {
        return selectedMonth ? e.date.slice(0, 7) === selectedMonth : true;
      })
      .filter((e) => {
        return search
          ? e.title.toLowerCase().includes(search.toLowerCase())
          : true;
      });
  }, [expenses, search, selectedCategory, selectedMonth]);
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const exportCSV = () => {
    const headers = ["Title", "Amount", "Date", "Category"];
    const rows = filteredExpenses.map((e) => [
      e.title,
      e.amount,
      e.date,
      e.category,
      new Date(e.date).toLocaleDateString("en-GB"),
      e.description ?? "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <TotalCard total={total} count={filteredExpenses.length} />
        <ExpenseChart expenses={filteredExpenses} />
        <ExpenseForm onAdd={addExpense} />
        {/* Filter & Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 gap-3">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={exportCSV}
            className="text-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition"
          >
            Export CSV
          </button>
        </div>
        <ExpenseList
          expenses={filteredExpenses}
          loading={loading}
          error={error}
          onDelete={removeExpense}
          onEdit={editExpense}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
