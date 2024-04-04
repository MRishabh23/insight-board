import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2 p-5">
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <h3 className="text-2xl font-bold">Oops!</h3>
        <p className="text-gray-700 text-base font-semibold ml-2 text-pretty">
          We can&apos;t seem to find the page you&apos;re looking for.
        </p>
      </div>
      <Link
        href="/"
        className="text-white w-[150px] bg-primary rounded-md flex justify-center items-center hover:bg-primary/90 h-10 px-4 py-2"
      >
        Go Back Home
      </Link>
    </div>
  );
}
