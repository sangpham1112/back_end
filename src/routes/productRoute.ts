import express, { Request, Response, query } from 'express'
import asyncHandler from 'express-async-handler'
import {  IProduct, ProductModel } from '../model/productModel'
import { Filters } from '../utils/types'

export const productRouter = express.Router()
// /api/prodcuts
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, priceMin, priceMax, rating } = req.query;
    const filters:Filters = {};

    if (category && typeof category === 'string') {
      const arrayCate = category.split('-');
      filters.category = { $in: arrayCate };
    }

    if (priceMax && priceMin) {
      filters.price = { $gte: Number(priceMin), $lte: Number(priceMax) };
    }

    if (rating) {
      filters.rating = { $gte: Number(rating) };
    }

    const products = await ProductModel.find(filters).lean();
    res.json(products.reverse());
  })
)

productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category').lean();
    res.json(categories)
  })
)

// /api/slug/tshirt
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug }).lean();
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)

productRouter.get(
  '/search',
  asyncHandler(async (req, res) => {
    const { name, brand, category } = req.query;
    const filter = {
        $or: [
          { name: { $regex: `.*${name}.*`, $options: 'i' } },
          { brand: { $regex: `.*${brand}.*`, $options: 'i' } },
          { category: { $regex: `.*${category}.*`, $options: 'i' } },
        ],
      };

   const products = await ProductModel.find(filter).lean();
   res.json(products);
  })
)

productRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.create({
      name:req.body.name,
      category:req.body.category,
      brand:req.body.brand,
      slug:req.body.slug,
      price:req.body.price,
      previousPrice:req.body.previousPrice,
      shippingPrice:req.body.shippingPrice,
      description:req.body.description,
      image:req.body.image,
      countInStock:req.body.countInStock,
    } as IProduct)
   res.json(product);
  })
)

productRouter.put(
  '/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({slug:req.params.slug});
    if(product) {
       product.name = req.body.name || product.name;
       product.category = req.body.category || product.category;
       product.brand = req.body.brand || product.brand;
       product.slug = req.body.slug || product.slug;
       product.price = req.body.price || product.price;
       product.previousPrice = req.body.previousPrice || product.previousPrice;
       product.shippingPrice = req.body.shippingPrice || product.shippingPrice;
       product.description = req.body.description || product.description;
       product.image = req.body.image || product.image;
       product.countInStock = req.body.countInStock|| product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct)
    }
  })
)

productRouter.delete(
  '/delete/:id',
  asyncHandler(async (req, res) => {
     await ProductModel.findByIdAndDelete(req.params.id)
    res.send('deleted product');
  })
)