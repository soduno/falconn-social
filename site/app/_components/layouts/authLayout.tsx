import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className=" bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-10">
          <Image src="/images/falconn-logo.svg" width={0} height={0} className="w-[100px]" alt="" />
        </div>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}