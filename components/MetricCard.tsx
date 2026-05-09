export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-5">
      <p className="text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  );
}
