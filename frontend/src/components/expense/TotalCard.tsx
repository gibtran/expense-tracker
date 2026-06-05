interface Props {
  total: number;
  count: number;
}

const TotalCard = ({ total, count }: Props) => (
  <div className="bg-blue-600 text-white rounded-2xl p-6">
    <p className="text-sm opacity-80">Total Spent</p>
    <p className="text-4xl font-bold mt-1">${total.toFixed(2)}</p>
    <p className="text-sm opacity-70 mt-1">{count} expenses</p>
  </div>
);

export default TotalCard;
