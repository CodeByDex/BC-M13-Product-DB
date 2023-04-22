// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: "category_id"
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "RESTRICT"
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  timestamps: false
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  timestamps: false
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
