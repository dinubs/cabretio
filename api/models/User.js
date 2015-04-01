var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    citations : { collection: 'Citation', via: 'user'} ,
    categories: { collection: 'Category', via: 'user'}
  }
};

module.exports = User;
