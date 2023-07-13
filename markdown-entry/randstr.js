// A nodejs code to generate a random string
// Usage: node randstr.js [length]

let randomInt = (l, r) => Math.floor(Math.random() * (r - l + 1)) + l;

// Define a function to generate a random string of a given length
function random_string(length) {
  let result = "";
  
  for (let i = 0; i < length; i++) {
    let byte = randomInt(32, 126);
    let char = String.fromCharCode(byte);
    result += char;
  }

  return result;
}

// Get the length argument from the command line
let length = parseInt(process.argv[2]) || 10;

console.log(`# ${random_string(length)}

${random_string(length * 2)}
`);
