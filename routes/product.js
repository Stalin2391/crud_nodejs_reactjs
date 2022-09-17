const express =  require('express');
const connection = require('../connection');
const router = require('express').Router();


router.post('/create', (req, res) => {
    const {name, description, price} = req.body;
    query = "INSERT INTO product (name, description, price) VALUES (?, ?, ?)";
    connection.query(query, [name, description, price],(error, results) => {
        if(!error) {
            return res.status(200).json(
                {
                    message:"Product Created Successfully"
                });
        }else {
            return res.status(500).json(error);
        }
    });
});

router.get('/get', (req, res) => {
    query = "SELECT * FROM product";
    connection.query(query, (error, results) => {
        if(!error) {
            return res.status(200).json(results);
        }else {
            return res.status(500).json(error);
        }
    });
})

router.get('/get/:id', (req, res) => {
    const { id } = req.params;
    query = "SELECT * FROM product WHERE id = ?";
    connection.query(query, id,(error, results) => {
        if(!error) {
            return res.status(200).json(results);
        }else {
            return res.status(500).json(error);
        }
    });
})

router.patch('/update/:id', (req, res) => {
    const id = req.params.id;
    const {name, description, price} = req.body;
    query = "UPDATE product SET name=?, description=?, price=? WHERE id=?";
    connection.query(query, [name, description, price, id],(error, results) => {
        if(!error) {
            if(results.affectedRows==0) {
                return res.status(404).json(
                    {
                        message:"Product id does not found"
                    });
            }
            return res.status(200).json({message: "Product updated successfully"});
        }
        else {
            return res.status(500).json(error);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    query = "DELETE FROM product WHERE id=?";
    connection.query(query, [id],(error, results) => {
        if(!error) {
            if(results.affectedRows==0) {
                return res.status(404).json(
                    {
                        message:"Product id does not found"
                    });
            }
            return res.status(200).json({message: "Product DELETED successfully"});
        }
        else {
            return res.status(500).json(error);
        }
    });
});

module.exports = router;