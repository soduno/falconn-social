import { useFormStatus } from "react-dom";

export default function SubmitButton({ placeholder }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full px-4 py-2 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${pending
        ? "bg-blue-200 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
        }`}
    >
      {pending ? (
        <span className="text-black flex w-full justify-center items-center">
          Processing... <i className="ml-2 animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500"></i>
        </span>
      ) : (
        <>
          {placeholder}
        </>
      )}
    </button>
  );
}