export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={`font-semibold text-lg ${className}`}>{children}</h2>;
}
