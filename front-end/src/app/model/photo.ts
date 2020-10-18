export interface Photo {
  id: string;
  url: string;
  category: string;
  title: string;
  description: string;
  price: number;
  likes: number;
  comments: [];
}
