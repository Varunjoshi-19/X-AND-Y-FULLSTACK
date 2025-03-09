class Example {

  static getData() {
    return "some data"

  }

  getDetails() {
    return "main data"
  }
}


const object = new Example();

console.log(object.getDetails());
console.log(Example.getData());

