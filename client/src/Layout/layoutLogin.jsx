import "../styles/login.css";

export default function LayoutLogin({ children }) {
  return (
    <div className="flex w-full h-screen justify-end loginLayout">
      <div className="w-full h-full flex justify-center relative bg-white sm:w-1/2 lg:w-[30%] py-10">
        {children}
      </div>
    </div>
  );
}
