import Link from "next/link";

const Foot = () => {
  return (
    <div>
      <div className="flex items-center justify-center lg:justify-between px-6 py-4  shadow-lg bg-gray-800">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-2xl tracking-wider transform transition-all hover:scale-110">
          Movie
        </h1>
        <div className="flex ml-auto gap-4 hidden md:flex">
          <Link href="/">
            <p className="text-white">Home</p>
          </Link>
          <Link href="/Cart">
            <p className="text-white">Cart</p>
          </Link>
          <p className="text-white">Menu2</p>
          <p className="text-white">Menu3</p>
          <p className="text-white">Menu4</p>
        </div>
      </div>
    </div>
  );
};

export default Foot;
