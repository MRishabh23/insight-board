import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 p-5">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <h3 className="text-2xl font-bold">Oops!</h3>
        <p className="ml-2 text-pretty text-base font-semibold text-gray-700">
          We can&apos;t seem to find the page you&apos;re looking for.
        </p>
      </div>
      <Link
        href="/"
        className="flex h-10 w-[150px] items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Go Back Home
      </Link>
    </div>
  );
}
