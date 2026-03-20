import {Router} from 'express'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product'
import { body,param } from 'express-validator'
import { handlerInputErrors } from './middleware'
const router = Router()

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('id No valido')
    , handlerInputErrors,getProductsById)

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value>0).withMessage('Precio no valido menor a 0'),
    handlerInputErrors,
    createProduct)

router.put('/:id',
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value>0).withMessage('Precio no valido menor a 0'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido')
    ,handlerInputErrors,updateProduct)

router.patch('/:id',
     param('id').isInt().withMessage('id No valido'),
     handlerInputErrors,updateAvailability)

router.delete('/:id' ,
    param('id').isInt().withMessage('id No valido'),
    handlerInputErrors,deleteProduct)



export default router