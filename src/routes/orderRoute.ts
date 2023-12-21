import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import {  IOrder, OrderModel } from '../model/orderModel'
import {  IProduct, ProductModel } from '../model/productModel'
import { isAuth } from '../utils'
export const orderRouter = express.Router()

orderRouter.get(
  '/mine/:userId',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.params.userId})
    res.json(orders)
  })
)

orderRouter.get(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({})
    res.json(orders)
  })
)

orderRouter.get(
  // /api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Order Not Found' })
    }
  })
)

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' })
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: IProduct) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.user._id,
      } as IOrder)
      res.status(201).json({ message: 'Order Created', order: createdOrder })
    }
  })
)

orderRouter.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = new Date(Date.now())
      order.status = 'in progress'
      const orderItems = order.orderItems;
      const updatedOrder = await order.save()

       await Promise.all(orderItems.map(async (item:any) => {
        const product = await ProductModel.findById(item.product);
        if (product) {
          product.countInStock -= item.quantity;
          await product.save();
        }
      }));
      res.send({ order: updatedOrder, message: 'Order Paid Successfully' })
    } else {
      res.status(404).json({ message: 'Order Not Found' })
    }
  })
)

orderRouter.delete(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    await OrderModel.findByIdAndDelete(req.params.id)
    res.status(201).json({message: 'deleted'})
  })
)

orderRouter.put(
  '/update-status',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const checkedIds = req.body.orderCheckedBoxes;
   await OrderModel.updateMany(
          { '_id': { $in: checkedIds.map((id:string) => id) } },
          { 'status': req.body.status} 
        );
    res.send('updated Status');
  })
)