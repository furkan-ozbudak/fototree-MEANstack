import { Photo } from "./photo";

export interface PhotoDetails {
  id: string;
  fname: string;
  lname: string;
  email: string;
  uploaded_photos;
  //  [
  //   {
  //      comments [],
  //      _id "5d88fc4a3108523694b8b144",
  //      url "https://images.unsplash.com/photo-1566398484393-54dfba620f06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //      category "personalCategory",
  //      title "photoTitle",
  //      description "Very nice photo",
  //      price 10,
  //      likes 100
  //   }
  // ]
}
