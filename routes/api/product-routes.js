const router = require('express').Router();
const util = require("../util")
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  util.SafeGetAll(res, Product, [{ model: Category }, { model: Tag }]);
});

// get one product
router.get('/:id', (req, res) => {
  util.SafeGetByID(req.params.id, res, Product, [{ model: Category }, { model: Tag }]);
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body.Product)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.Product.tagIds.length) {
        const productTagIdArr = req.body.Product.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Internal Error");
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body.Product, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.Product.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.Product.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Internal Error");
    });
});

router.delete('/:id', (req, res) => {
  util.SafeDelete(req.params.id, res, Product);
});

module.exports = router;
