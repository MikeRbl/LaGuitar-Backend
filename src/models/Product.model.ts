import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})
class Product extends Model {
    @Column({
        type: DataType.STRING(100)  
    })
    declare name: string

    @Column({
        type: DataType.STRING(100)
    })
    declare image: string // Para guardar el nombre de la imagen (ej. 'guitarra_01')

    @Column({
        type: DataType.TEXT
    })
    declare description: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product