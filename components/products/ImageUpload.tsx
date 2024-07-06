"use client";
import { CldUploadWidget } from "next-cloudinary";
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

type ImageUploadProps = {
  image: string | undefined;
};

const ImageUpload = ({ image }: ImageUploadProps) => {
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
            <div className="flex justify-between h-auto">
              {image && !imageUrl && (
                <div className="space-y-2 w-full">
                  <label htmlFor="">Imagen Actual:</label>
                  <div className=" relative w-64 h-64">
                    <Image
                      fill
                      src={getImagePath(image)}
                      alt="Imagen de Producto"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              )}
              <div
                className=" relative cursor-pointer hover:opacity-70 transition p-10 flex flex-col justify-center items-center gap-4  bg-slate-100 rounded-lg w-full"
                onClick={() => open()}
              >
                <div className="flex flex-col justify-center items-center">
                  <FontAwesomeIcon icon={faCameraAlt} className="w-52" />
                  <p className=" text-lg">Agrergar Imagen</p>
                  {imageUrl && (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        fill
                        src={getImagePath(imageUrl)}
                        alt="Imagen de Producto"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : image}
          />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
