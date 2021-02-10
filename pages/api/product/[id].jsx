import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Products.findById(id)
        if(!product) return res.status(400).json({err: 'This product does not exist.'})
        
        res.json({ product })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProduct = async (req, res) => {
    try {

        const {id} = req.query
        const {title, price, inStock, description, content, images} = req.body

        if(!title || !price || !inStock || !description || !content ||  images.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})

        await Products.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), price, inStock, description, content,  images
        })

        res.json({msg: 'Success! Updated a product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.query

        await Products.findByIdAndDelete(id)
        res.json({msg: 'Deleted a product.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}