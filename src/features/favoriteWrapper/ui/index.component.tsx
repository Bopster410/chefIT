"use client";

import { HeartButton } from "@/shared/uikit/heartButton";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Props } from "./index.types";
import { addFavorite, removeFavorite } from "@/entities/recipe/api";

export const FavoriteWrapper: FunctionComponent<PropsWithChildren<Props>> = ({
  isLiked,
  id,
  children,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const [liked, setLiked] = useState(isLiked || false);

  const addOrRemove = () => {
    if (liked) {
      removeFavorite(id).then(() => {
        onRemoveFavorite?.(id);
      });
    } else {
      addFavorite(id).then(() => {
        onAddFavorite?.();
      });
    }
    setLiked(!liked);
  }

  const onHeartClick = () => {
    addOrRemove();
  };

  return (
    <>
      <div className="relative group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <HeartButton isLiked={liked} onClick={onHeartClick} />
        </div>
        {children}
      </div>
    </>
  );
};
