import { sql } from "../config/db.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error"});
        console.log("Error at getAllProducts:", error)
    }
}


export const createProduct = async (req, res) => {
    const { name, image, price } = req.body
    if(!name || !image || !price){ 
        return res.status(400).json({success: false, error: "Missing required fields"});
    }
    try {
        const newProduct = await sql`
        INSERT INTO products (name, image, price)
        VALUES (${name}, ${image}, ${price})
        RETURNING *
        `
        console.log("Product created: ", newProduct[0])
        res.status(201).json({success: true, data: "Product created successfully"});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error"});
        console.log("Error at createProduct:", error)
    }
}
export const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await sql`
        SELECT * FROM products
        WHERE id = ${id}
        `;
        if(product.length === 0){
            return res.status(404).json({success: false, error: "Product not found"});
        }
        res.status(200).json({success: true, data: product[0]});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error"});
        console.log("Error at getProduct:", error)
    }
}

export const updateProduct = async (req, res) => {
    console.log(req.body)
    const { name, image, price } = req.body
    const id = req.params.id
    try {
        const updatedProduct = await sql`
        UPDATE products
        SET name = ${name}, image = ${image}, price = ${price}
        WHERE id = ${id}
        RETURNING *
        `
        if(updatedProduct.length === 0){
            return res.status(404).json({success: false, error: "Product not found"});
        }
        console.log("Product updated: ", updatedProduct[0])
        res.status(200).json({success: true, data: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error"});
        console.log("Error at updateProduct:", error)
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
        `
        if(deletedProduct.length === 0){
            return res.status(404).json({success: false, error: "Product not found"});
        }
        console.log("Product deleted: ", deletedProduct[0])
        res.status(200).json({success: true, data: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error"});
        console.log("Error at deleteProduct:", error)
    }

}