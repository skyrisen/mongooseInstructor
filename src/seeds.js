import _ from 'lodash';
import faker from 'faker';
import { Db, Server } from 'mongodb';
import { GENRES } from './constants';

const MINIMUM_INSTRUCTORS = 2;
const INSTRUCTORS_TO_ADD = 15;

let instructorsCollection;
const db = new Db('instructor_info', new Server('localhost', 27017));
db.open()
  .then(() => {
    instructorsCollection = db.collection('instructors');
    return instructorsCollection.count({});
  })
  .then(count => {
    if (count < MINIMUM_INSTRUCTORS) {
      const instructors = _.times(INSTRUCTORS_TO_ADD, () => createInstructor());

      instructorsCollection.insertMany(instructors);
    }
  })
  .catch(e => console.log(e));


function createInstructor() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    retired: faker.random.boolean(),
    courses: getCourses()
  };
}

function getCourses() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      image: getCourseImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getCourseImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);
  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max-min)) + min;
}
