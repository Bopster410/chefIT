import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import Link from "next/link";

export const ImagePlaceholder = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="155"
      height="151"
      viewBox="0 0 155 151"
      fill="none"
      preserveAspectRatio="none"
      className="text-gray-300 w-full h-full rounded-lg"
    >
      <rect width="155" height="151" fill="white" />
      <g clipPath="url(#clip0_319_167)">
        <path
          d="M58.9063 38.3125V23.4375C58.9063 22.4512 59.2981 21.5053 59.9955 20.8079C60.6929 20.1105 61.6387 19.7188 62.625 19.7188C63.6113 19.7188 64.5572 20.1105 65.2546 20.8079C65.952 21.5053 66.3438 22.4512 66.3438 23.4375V38.3125C66.3438 39.2988 65.952 40.2447 65.2546 40.9421C64.5572 41.6395 63.6113 42.0312 62.625 42.0312C61.6387 42.0312 60.6929 41.6395 59.9955 40.9421C59.2981 40.2447 58.9063 39.2988 58.9063 38.3125ZM77.5 42.0312C78.4863 42.0312 79.4322 41.6395 80.1296 40.9421C80.827 40.2447 81.2188 39.2988 81.2188 38.3125V23.4375C81.2188 22.4512 80.827 21.5053 80.1296 20.8079C79.4322 20.1105 78.4863 19.7188 77.5 19.7188C76.5137 19.7188 75.5679 20.1105 74.8705 20.8079C74.1731 21.5053 73.7813 22.4512 73.7813 23.4375V38.3125C73.7813 39.2988 74.1731 40.2447 74.8705 40.9421C75.5679 41.6395 76.5137 42.0312 77.5 42.0312ZM92.375 42.0312C93.3613 42.0312 94.3072 41.6395 95.0046 40.9421C95.702 40.2447 96.0938 39.2988 96.0938 38.3125V23.4375C96.0938 22.4512 95.702 21.5053 95.0046 20.8079C94.3072 20.1105 93.3613 19.7188 92.375 19.7188C91.3887 19.7188 90.4429 20.1105 89.7455 20.8079C89.0481 21.5053 88.6563 22.4512 88.6563 23.4375V38.3125C88.6563 39.2988 89.0481 40.2447 89.7455 40.9421C90.4429 41.6395 91.3887 42.0312 92.375 42.0312ZM135.513 63.6L122.125 73.6406V101.531C122.125 105.476 120.558 109.26 117.768 112.049C114.979 114.839 111.195 116.406 107.25 116.406H47.75C43.8049 116.406 40.0214 114.839 37.2318 112.049C34.4422 109.26 32.875 105.476 32.875 101.531V73.6406L19.4875 63.6C18.6985 63.0082 18.1769 62.1273 18.0374 61.1509C17.8979 60.1745 18.152 59.1828 18.7438 58.3937C19.3355 57.6047 20.2165 57.0831 21.1929 56.9436C22.1692 56.8041 23.161 57.0582 23.95 57.65L32.875 64.3437V53.1875C32.875 52.2012 33.2668 51.2553 33.9642 50.5579C34.6616 49.8605 35.6075 49.4687 36.5938 49.4687H118.406C119.393 49.4687 120.338 49.8605 121.036 50.5579C121.733 51.2553 122.125 52.2012 122.125 53.1875V64.3437L131.05 57.65C131.839 57.0582 132.831 56.8041 133.807 56.9436C134.784 57.0831 135.664 57.6047 136.256 58.3937C136.848 59.1828 137.102 60.1745 136.963 61.1509C136.823 62.1273 136.302 63.0082 135.513 63.6ZM114.688 56.9062H40.3125V101.531C40.3125 103.504 41.0961 105.396 42.4909 106.79C43.8857 108.185 45.7775 108.969 47.75 108.969H107.25C109.223 108.969 111.114 108.185 112.509 106.79C113.904 105.396 114.688 103.504 114.688 101.531V56.9062Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_319_167">
          <rect
            width="119"
            height="119"
            fill="white"
            transform="translate(18 16)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export interface RecipeProps {
  id: number;
  name: string;
  description: string;
  cookingTime: number;
  image?: string;
  link?: string;
  slots?: {
    favoriteButton?: ReactNode;
  };
}

export const RecipeCard: FunctionComponent<RecipeProps> = ({
  name,
  image,
  cookingTime,
  slots,
  link,
}) => {
  return (
    <div
      className={`h-full relative bg-gray-100 flex flex-col gap-1.5 rounded-lg p-1.5 mobile:p-2.5 z-0`}
    >
      {link && (
        <Link
          className="absolute top-0 left-0 right-0 bottom-0 z-10"
          href={link}
        />
      )}
      <div className="relative aspect-square rounded-lg z-0">
        {image ? (
          <Image className="rounded-lg" fill alt="image" src={image} />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="px-2 line-clamp-2 recipe-clamp mobile:text-[1rem]">
        {name}
      </div>
      <div className="ps-2 flex-1 items-end flex justify-between">
        <div className="flex items-center gap-0.5 text-gray-400 recipe-clamp-sm mobile:text-[0.875rem]">
          <AccessTimeFilledOutlinedIcon fontSize="inherit" />
          {`${cookingTime} мин`}
        </div>
        <div className="z-20">{slots?.favoriteButton}</div>
      </div>
    </div>
  );
};
