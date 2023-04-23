const router = require('express').Router();
const util = require("../util");
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  util.SafeGetAll(res, Category, [{ model: Product }]);
});

router.get('/:id', (req, res) => {
  util.SafeGetByID(req.params.id, res, Category, [{ model: Product }]);
});

router.post('/', (req, res) => {
  util.SafeCreate(res, Category, req.body.Category);
});

router.put('/:id', (req, res) => {
  util.SafeUpdate(req.params.id, res, Category, req.body.Category);
});

router.delete('/:id', (req, res) => {
  util.SafeDelete(req.params.id, res, Category);
});

module.exports = router;
