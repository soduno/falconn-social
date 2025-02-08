import InputErrors from "../validation/inputErrors";

type InputTextProps = {
  state: any;
  label: string;
  id?: string;
  name: string;
};

export default function InputEmail({
  state,
  label,
  id: IdInitial,
  name,
}: InputTextProps) {
  const id = IdInitial ? IdInitial : name;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="email"
        id={id}
        name={name}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:border-transparent"
      />

      {state?.errors?.[name] && <InputErrors error={state.errors[name]} />}
    </div>
  );
}
