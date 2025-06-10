export function Calendar({ selected, onSelect }: { selected: Date, onSelect: (date: Date) => void }) {
  return <input type="date" value={selected.toISOString().substring(0,10)} onChange={(e) => onSelect(new Date(e.target.value))} className="border rounded p-2 w-full" />;
}
