const Mongo = require('mongodb');

const { Db, Server } = Mongo;

const db = new Db('instructors', new Server('localhost', 27017));
db.open()
  .then(() => {
    db.command({
      collMod: 'instructors',
      validator: {
        $and: [
          { age: { $gte: 15, $lte: 45, $type: 'number' } },
          { name: { $type: 'string' } },
          { genre: { $type: 'string' } }
        ]
      }
    })
    .then(() => {
      console.log('Mod Success');
      process.exit(0);
    })
    .catch((e) => {
      console.log('Mod Failed', e);
      process.exit(1);
    });
  });
