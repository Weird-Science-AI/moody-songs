'use strict'

// const net = new brain.NeuralNetwork();
// console.log(net);
// net.train([
//   {input: [0,0], output: [0]},
//   {input: [1,0], output: [1]},
//   {input: [0,1], output: [1]},
//   {input: [1,1], output: [0]}

// ]);
// const diagram = document.getElementById('diagram');
// diagram.innerHTML = brain.utilities.toSVG(net);

// provide optional config object (or undefined). Defaults shown.
const config = {
  binaryThresh: 0.5,
  hiddenLayers: [5,5,5,5], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
]);

const output = net.run([1, 0]); // [0.987]


var d = document.getElementById('d');
console.log(d);
d.innerHTML = brain.utilities.toSVG(net);