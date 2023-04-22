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

router.get('/:id', async (req, res) => {
  await util.SafeRequest(req, res, async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
      throw new Error("Param Invalid Format");
    }

    const cat = await Category.findByPk(id, {
      include: [{model: Product}]
    });

    res.json(cat.get());
  })
});

router.post('/', async (req, res) => {
  await util.SafeRequest(req, res, async (req, res) => {
    const newCatReq = req.body.Category;

    const newCatRec = await Category.create(newCatReq);

    res.json(newCatRec);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
