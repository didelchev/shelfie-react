import React from "react";
import { useLocation } from "react-router-dom";

const BookDetailsView = ( ) => {

  const location = useLocation();

  const passedBook = location.state.book

  console.log(passedBook)
  return (
   <>

   </>
)};

export default BookDetailsView;
