import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-600">💸 Expense Tracker</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {user?.name}</span>
        <button
          onClick={logout}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
