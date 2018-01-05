const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('The data resolved!');
  }, 1500);
});

console.log('before');

promise.then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});

console.log('after');