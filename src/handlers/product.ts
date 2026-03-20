import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
      const products = await Product.findAll(
        {
            order:[
                ['price', 'DESC']
            ],
           // limit:10,
           // attributes:{exclude:['createdAt','updatedAt']}
        }
      )
      res.json({data:products})
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      /*
      const product = await Product.findOne(
        {
            where:{
                id: id,
                availability : true
            },
            attributes:{exclude:['createdAt','updatedAt']}
        }
      )*/
      if(!product){
        return res.status(404).json({
            error:'Producto no encontrado'
        })
      }
      res.json({data:product})
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if(!product){
        return res.status(404).json({
            error:'Producto no encontrado'
        })
      }
      //actualizar
      await product.update(req.body)
      await product.save()
      res.json({data:product})
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailability = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if(!product){
        return res.status(404).json({
            error:'Producto no encontrado'
        })
      }
      //actualizar estado de disponibilidad
      product.availability = !product.dataValues.availability
      await product.save()
      res.json({data:product})
  } catch (error) {
    console.log(error);
  }
};






export const deleteProduct = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if(!product){
        return res.status(404).json({
            error:'Producto no encontrado'
        })
        }
    await product.destroy()
    res.json({data:'Producto Eliminado'}) 
  } catch (error) {
    console.log(error);
  }
};