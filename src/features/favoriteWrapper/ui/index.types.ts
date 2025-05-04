export interface Props {
  isLiked?: boolean;
  id: number;
  onAddFavorite?: (id?:number) => void;
  onRemoveFavorite?: (id?:number) => void;
}
