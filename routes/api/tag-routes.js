const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const util = require("../util");

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  util.SafeGetAll(res, Tag, [{model: Product}]);
});

router.get('/:id', (req, res) => {
  util.SafeGetByID(req.params.id, res, Tag, [{model: Product}])
});

router.post('/', (req, res) => {
  util.SafeCreate(res, Tag, req.body.Tag);
});

router.put('/:id', (req, res) => {
  util.SafeUpdate(req.params.id, res, Tag, req.body.Tag);
});

router.delete('/:id', (req, res) => {
  util.SafeDelete(req.params.id, res, Tag);
});

module.exports = router;
