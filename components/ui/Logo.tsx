import Image from "next/image";

const Logo = () => {
  return (
    <div className=" flex justify-center mt-5">
      <div className="flex items-end">
        <Image alt="Logo NextCafe" src="/NextCafe.png" width={50} height={50} />
        <p className=" text-3xl text-slate-700 font-bold">
          Next<span className="text-orange-400">Cafe</span>
        </p>
      </div>
    </div>
  );
};

export default Logo;
