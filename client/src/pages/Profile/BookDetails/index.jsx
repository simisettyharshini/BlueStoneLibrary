import React, { useState } from 'react';
import {Form,Col}from 'antd';
//import axios from 'axios';
import Button from "../../../components/Button";


function BookDetails({ id }) {
  /* const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/books/${bookId}/ratings`, { rating, review });
      // Optionally, update the book details or display a success message
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  }; */
 
  return (
    <Form layout="vertical">
    
    <Col span={8}> 
    <Form.Item label="Rating" name="rating" rules={ [{ required: true, message: "Please input rating" }] } > 
    <select > 
        <option  value="default" > Select Rating </option > 
        <option value="1" > 1 </option > 
        <option value="2" > 2 </option > 
        <option value="3" > 3 </option > 
        <option value="4" > 4 </option > 
        <option value="5" > 5</option > 
        <option value="6" > 6 </option > 
        <option value="7" > 7 </option > 
        <option value="8" > 8 </option > 
        <option value="9" > 9 </option > 
        <option value="10" > 10 </option > 
        </select > 
        </Form.Item > 
        </Col > 
        <Col span={24} > 
    <Form.Item label="Review" name='review' rules={ [{ required: true, message: 'Please input book review' }] } > 
    <textarea type="text"/> 
    </Form.Item > 
        </Col >
        <div>
        <Button type="submit" title="save"/>
        </div>
        </Form>
  );
}

export default BookDetails;
