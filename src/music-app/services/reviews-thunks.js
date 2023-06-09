import {createAsyncThunk} from '@reduxjs/toolkit';
import * as service from './reviews-service';

export const findReview = createAsyncThunk(
  'reviews/findReview', 
  async (albumId) => await service.findReview(albumId)
);

export const findAllReview = createAsyncThunk(
  'reviews/findAllReview',
  async () => await service.findAllReview()
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({review, albumId}) => {
    return await service.createReview({review, albumId});    
  }
);

export const findMyReviewThunk = createAsyncThunk(
  'reviews/findMyReview',
  async () => {
    const res = await service.findMyReview();
    console.log(typeof(res));
    return res;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    await service.deleteReview(reviewId);
    return reviewId;
});

export const updateReviewThunk = createAsyncThunk(
  'reviews/updateReview',
  async (newReview) => {
    return await service.updateReview(newReview);
  }
);