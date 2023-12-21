import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { isAuth } from '../utils'
import { CommentModel, IComment } from '../model/commentModel'
import {  ProductModel } from '../model/productModel'
export const commentRouter = express.Router()

commentRouter.get(
  '/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const comments = await CommentModel.find({ slug: req.params.slug })
     if (comments) {
      res.json(comments.reverse());
    } else {
      res.status(404).json({ message: 'Comments Not Found' })
    }
  })
)

commentRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
   const comment =  new CommentModel({
        username:req.body.username,
        slug:req.body.slug,
        text:req.body.text,
        rating:req.body.rating,
   } as IComment);
      await comment.save();

    const product = await ProductModel.findOne({slug:req.body.slug});
    const reviews = await CommentModel.find({slug:req.body.slug});
    if(product && reviews) {
      const count = reviews.length;
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = count > 0 ? sum / count : 0;
      product.numReviews = count;
      product.rating = avgRating;
      await product.save();
    } 
    res.status(201).json({ message: 'Comment Created', product})
  })
)
