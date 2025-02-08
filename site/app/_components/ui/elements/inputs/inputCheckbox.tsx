import InputErrors from "../validation/inputErrors";

type InputCheckboxProps = {
  state: any;
  label: string;
  id?: string;
  name: string;
};

export default function InputCheckbox({
  state,
  label,
  id: IdInitial,
  name,
}: InputCheckboxProps) {
  const id = IdInitial ? IdInitial : name;

  return (
    <>
      <label
        htmlFor={name}
        className="flex gap-2 align-center text-sm font-medium text-gray-700"
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:border-transparent"
        />
        {label}
      </label>

      {state?.errors?.[name] && <InputErrors error={state.errors[name]} />}
    </>
  );
}
