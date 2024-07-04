"use client";
import { CldUploadWidget } from "next-cloudinary";
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "next/image";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          //@ts-ignore
          setImageUrl(result.info?.secure_url);
        }
      }}
      uploadPreset="nextcafe"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <>
          <div className=" space-y-2">
            <label htmlFor="" className="text-slate-700">
              Imagen Producto
            </label>
            <div
              className=" relative cursor-pointer hover:opacity-70 transition p-10 flex flex-col justify-center items-center gap-4  bg-slate-100 rounded-lg"
              onClick={() => open()}
            >
              <FontAwesomeIcon icon={faCameraAlt} className="w-52" />
              <p className=" text-lg">Agrergar Imagen</p>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    src={imageUrl}
                    alt="Imagen de Producto"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="image" value={imageUrl} />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
