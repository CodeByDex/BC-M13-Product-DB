const router = require('express').Router();
const util = require("../util");
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
   util.SafeRequest(req, res, async (req, res) => {
    const catData = await Category.findAll({
      include: [{model: Product}]
    });

    res.json(catData.map(x => x.get()));
  })
});

router.get('/:id', (req, res) => {
  util.SafeRequest(req, res, async (req, res) => {
    const cat = await getCategoryByID(req.params.id);

    res.json(cat.get());
  })
});

router.post('/', (req, res) => {
   util.SafeRequest(req, res, async (req, res) => {
    const newCatReq = req.body.Category;

    const newCatRec = await Category.create(newCatReq);

    res.json(newCatRec);
  })
});

router.put('/:id', (req, res) => {
  util.SafeRequest(req, res, async (req, res) => {
    let cat = await getCategoryByID(req.params.id);

    const upCatReq = req.body.Category;
    cat.set(upCatReq);

    let upCatRec = await cat.save();

    res.json(upCatRec);
  })
});

router.delete('/:id', (req, res) => {
  util.SafeRequest(req, res, async (req, res) => {
    let cat = await getCategoryByID(req.params.id);

    let catRes = await cat.destroy();

    res.json(catRes);
  })
});

module.exports = router;
async function getCategoryByID(id) {
  if (isNaN(id)) {
    throw new Error("Param Invalid Format");
  }

  const cat = await Category.findByPk(id, {
    include: [{ model: Product }]
  });
  return cat;
}

