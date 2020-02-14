const express = require("express");
const mdAuth = require("../middlewares/autentication");

const ProductWarehouse = require("../models/productWarehouses");

const app = express();

// CREAR PRODUCTOS POR ALMACEN
app.post("/", mdAuth.verificationToken, (req, res) => {
  const body = req.body;
  const productWarehouse = new ProductWarehouse({
    warehouse: body.warehouse,
    product: body.product,
    quantity: body.quantity
  });

  // Si existe un almacen con el producto, se actualiza, sino se crea
  ProductWarehouse.findOne(
    { product: body.product._id, warehouse: body.warehouse._id },
    (err, result) => {
      if (err) return res.status(400).json(err);
      if (!result) {
        productWarehouse.save((err, productWarehouseSave) => {
          if (err) return res.status(400).json(err);
          res.status(200).json(productWarehouseSave);
        });
      } else {
        const quantityTotal = result.quantity + body.quantity;
        ProductWarehouse.findByIdAndUpdate(
          result._id,
          { quantity: quantityTotal },
          (err, pwupdate) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(pwupdate);
          }
        );
      }
    }
  );
});

// ACTUALIZAR PRODUCTOS POR ALMACEN
app.put("/:id", mdAuth.verificationToken, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ProductWarehouse.findByIdAndUpdate(
    id,
    {
      warehouse: body.warehouse,
      product: body.product,
      quantity: body.quantity
    },
    (err, productWarehouseUpdate) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(productWarehouseUpdate);
    }
  );
});

// LISTAR PRODUCTOS POR ALMACEN
app.get("/", mdAuth.verificationToken, (req, res) => {
  ProductWarehouse.find({})
    .sort({ updatedAt: -1 })
    .populate("product warehouse")
    .exec((err, productWarehousesDB) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(productWarehousesDB);
    });
});

module.exports = app;
