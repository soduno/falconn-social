import { SelectBoxEntry, SelectBoxProps } from "@/app/_lib/types/inputs";
import InputErrors from "../validation/inputErrors";

export default function SelectBox({
  entries,
  state,
  label,
  Id: IdInitial,
  name,
}: SelectBoxProps) {
  const Id = IdInitial ? IdInitial : name;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={Id}
        className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {entries.map((entry: SelectBoxEntry) => (
          <option key={entry.key} value={entry.key}>
            {entry.value}
          </option>
        ))}
      </select>

      {state?.errors?.[name] && <InputErrors error={state.errors[name]} />}
    </div>
  );
}
