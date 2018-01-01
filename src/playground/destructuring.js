// const person = {
//   name: 'Roy',
//   age: 22,
//   location: {
//     city: 'houston',
//     temp: 103
//   }
// };

// const { name, age, gender='guy' } = person;

// const { city: collegeCity, temp } = person.location;

// console.log(`${name} is ${age} years old and he is ${gender}!`);
// console.log(`${collegeCity} is wow current ${temp} degrees!`);

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     //name: 'Penguin'
//   }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);



//const address = ['1215 Tates Creek Pike', 'Lexington', 'Kentucky', '40508'];

const address = [];

const [street, city, state = 'Houston', zip] = address;

console.log(`I live in ${street}, ${city}, ${state}, and with a zip of ${zip} `);

const items = ['coffee (hot)', '$200', '$2.50', '$2.75'];

const [coffee, ,medPrice] = items;

console.log(`A ${coffee} costs ${medPrice}`);