'use strict';
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
// const net = new brain.NeuralNetwork(config);

// net.train([
//   { input: [0, 0], output: [0] },
//   { input: [0, 1], output: [1] },
//   { input: [1, 0], output: [1] },
//   { input: [1, 1], output: [0] },
// ]);

// const output = net.run([1, 0]); // [0.987]

function numberizeString(string){

}

const trainingData = [
  // 'Jane saw Doug.',
  // 'Doug saw Jane.',
  // 'Spot saw Doug and Jane looking at each other.',
  // 'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.'
  {input: 'today was a great day', output: 'positive'},
  {input: 'today was pretty great', output: 'positive'},
  {input: 'today was a great day', output: 'positive'},
  {input: 'i had a nice day today', output: 'positive'},
  {input: 'today was fantastic', output: 'positive'},
  {input: 'today was great', output: 'positive'},
  {input: 'today i was so happy', output: 'positive'},
  {input: 'today i got a raise', output: 'positive'},
  {input: 'today i got everything done early', output: 'positive'},
  {input: 'today i went on a date', output: 'positive'},
  {input: 'my day was fantastic', output: 'positive'},
  {input: 'my day was the best day', output: 'positive'},
  {input: 'today i helped an old lady cross the road', output: 'positive'},
  {input: 'my day was pretty good', output: 'positive'},
  {input: 'my day was pretty decent', output: 'positive'},
  {input: 'my day was pretty positive', output: 'positive'},
  {input: 'my day was positive', output: 'positive'},
  {input: 'my day was great', output: 'positive'},
  {input: 'my day was incredible', output: 'positive'},
  {input: 'it was great', output: 'positive'},
  {input: 'it was fantastic', output: 'positive'},
  {input: 'it as amazing', output: 'positive'},
  {input: 'it was decent', output: 'positive'},
  {input: 'it was the greatest', output: 'positive'},
  {input: 'it was not too bad', output: 'negative'},
  {input: 'good', output: 'positive'},
  {input: 'decent', output: 'positive'},
  {input: 'not bad', output: 'positive'},
  {input: 'not too bad', output: 'positive'},
  {input: 'pretty good', output: 'positive'},
  {input: 'great', output: 'positive'},
  {input: 'amazing', output: 'positive'},
  {input: 'quite fantastic', output: 'positive'},
  {input: 'fantastic', output: 'positive'},
  {input: 'superb', output: 'positive'},

  {input: 'it was ok', output: 'neutral'},
  {input: 'nothing interesting happened today', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},
  // {input: '', output: 'neutral'},


  {input: 'today sucked', output: 'negative'},
  {input: 'today was pretty lame', output: 'negative'},
  {input: 'i needed a boost today', output: 'negative'},
  {input: 'my day was bad', output: 'negative'},
  {input: 'my day was a long one', output: 'negative'},
  {input: 'my day was boring', output: 'negative'},
  {input: 'my day was lame', output: 'negative'},
  {input: 'my day was underwhelming', output: 'negative'},
  {input: 'my day was less than ideal', output: 'negative'},
  {input: 'my day sucked', output: 'negative'},
  {input: 'today was super boring', output: 'negative'},
  {input: 'today was a shitty day', output: 'negative'},
  {input: 'i had a shitty day today', output: 'negative'},
  {input: 'i stepped in dog poop', output: 'negative'},
  {input: 'my wife left me', output: 'negative'},
  {input: 'i lost all my money', output: 'negative'},
  {input: 'i was depressed today', output: 'negative'},
  {input: 'i felt depressed today', output: 'negative'},
  {input: 'depressing', output: 'negative'},
  {input: 'i was very sad today', output: 'negative'},
  {input: 'i was very tired today', output: 'negative'},
  {input: 'today went on forever', output: 'negative'},
  {input: 'today drug on', output: 'negative'},
  {input: 'today was a drag', output: 'negative'},
  {input: 'my day sucked', output: 'negative'},
  {input: 'today was so boring', output: 'negative'},
  {input: 'today was boring', output: 'negative'},
  {input: 'bad', output: 'negative'},
  {input: 'terrible', output: 'negative'},
  {input: 'horrendous', output: 'negative'},
  {input: 'really bad', output: 'negative'},
  {input: 'not good', output: 'negative'},
  {input: 'pretty bad', output: 'negative'},
  {input: 'not great', output: 'negative'},
  {input: 'not amazing', output: 'negative'},
  {input: 'not good at all', output: 'negative'},
  
];

const lstm = new brain.recurrent.LSTM();
// const net = new brain.NeuralNetwork();

const result = lstm.train(trainingData, {
  iterations: 20,
  log: details => console.log(details),
  // keepNetworkIntact: true,
  errorThresh: 0.011
});
// const result = net.train(trainingData, {
//   iterations: 200,
//   log: details => console.log(details),
//   errorThresh: 0.011
// });

// const run1 = lstm.run('it was pretty good');
// const run = net.run('it was good');

// console.log('run 1: Jane' + run1);
// console.log('run 2: Doug' + run2);
// console.log('run 3: Spot' + run3);
// console.log('run 4: It' + run4);
// console.log(run1);
const sentiment = lstm.toJSON();
const net = new brain.recurrent.LSTM();
net.fromJSON(sentiment);
console.log(sentiment);
console.log(lstm.fromJSON(sentiment));
var d = document.getElementById('d');

d.innerHTML = brain.utilities.toSVG(lstm);