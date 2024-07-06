"use client";

import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="border border-orange-400 rounded-full text-white py-2 px-4 bg-orange-400 hover:bg-orange-500 transition-colors  cursor-pointer"
    >
      Volver
    </button>
  );
};

export default GoBackButton;
