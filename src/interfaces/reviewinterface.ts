export interface IReview {
  id: string;
  title: string;
  review: string;
  reviewer: string;
  handleClickReview: (id: string) => void;
  userId: string;
}
