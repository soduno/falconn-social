type DefaultButtonProps = {
  placeholder: string;
  classes?: string;
}

export default function DefaultButton({ placeholder, classes }: DefaultButtonProps) {
  return (
    <div>
      <button className={`bg-black text-white py-2 px-6 rounded-full ${classes}`}>{placeholder}</button>
    </div>
  )
}