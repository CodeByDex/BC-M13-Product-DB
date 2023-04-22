const router = require('express').Router();
const util = require("../util");
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  await util.SafeRequest(req, res, async (req, res) => {
    const catData = await Category.findAll({
      include: [{model: Product}]
    });
    
    res.json(catData.map(x => x.get()));
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
