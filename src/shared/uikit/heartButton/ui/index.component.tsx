"use client";

import { FunctionComponent } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Props } from "./index.types";

export const HeartButton: FunctionComponent<Props> = ({ isLiked, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 mobile:p-2 rounded-full bg-gray-200"
    >
      {isLiked ? (
        <FavoriteIcon className="text-saffron-500" />
      ) : (
        <FavoriteBorderIcon className="text-gray-500" />
      )}
    </button>
  );
};
