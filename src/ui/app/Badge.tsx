type BadgeProps = {
  label: string;
};

const Badge = ({ label }: BadgeProps) => (
  <span className="inline-flex items-center rounded bg-slate-700 px-2 py-0.5 text-sm font-medium text-white">
    <svg
      className="mr-1.5 h-2 w-2 animate-pulse text-slate-700"
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx={4} cy={4} r={3} />
    </svg>
    {label}
  </span>
);

export default Badge;
