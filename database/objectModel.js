class Product extends Realm.Object {
  static schema = {
    name: "Product",
    properties: {
      _id: 'string',
      image: 'string',
      quantity: 'string'
    },
    primaryKey: '_id',
  };
};