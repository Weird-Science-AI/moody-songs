'use strict';
const net = new brain.NeuralNetwork();
let trainedNet ;
let longest ;
train(getTrainingData());

console.log(predictEmotion('today was a good day, didnt have to use my ak'));

function train(data){
  net.train(processTrainingData(data), {
    log: true,
    learningRate: 0.05,
    iterations: 20000
  });
  trainedNet = net.toFunction();
}

function encode(str){
  return str.split('').map(x => (x.charCodeAt(0) / 400));
}

function processTrainingData(data){
  const processedValues = data.map(d => {
    console.log(d);
    return {
      input: encode(d.input),
      output: d.output
    }
  });
  console.log(processedValues);
  return processedValues;
}
function getTrainingData(){
  const trainingData = [
    {input: 'today was a great day', output: {positive: 1}},
    {input: 'today was pretty great', output: {positive: 1}},
    {input: 'today was a great day', output: {positive: 1}},
    {input: 'i had a nice day today', output: {positive: 1}},
    {input: 'today was fantastic', output: {positive: 1}},
    {input: 'today was great', output: {positive: 1}},
    {input: 'today i was so happy', output: {positive: 1}},
    {input: 'today i got a raise', output: {positive: 1}},
    {input: 'today i got everything done early', output: {positive: 1}},
    {input: 'today i went on a date', output: {positive: 1}},
    {input: 'my day was fantastic', output: {positive: 1}},
    {input: 'my day was the best day', output: {positive: 1}},
    {input: 'today i helped an old lady cross the road', output: {positive: 1}},
    {input: 'my day was pretty good', output: {positive: 1}},
    {input: 'my day was pretty decent', output: {positive: 1}},
    {input: 'my day was pretty positive', output: {positive: 1}},
    {input: 'my day was positive', output: {positive: 1}},
    {input: 'my day was great', output: {positive: 1}},
    {input: 'my day was incredible', output: {positive: 1}},
    {input: 'it was great', output: {positive: 1}},
    {input: 'it was fantastic', output: {positive: 1}},
    {input: 'it as amazing', output: {positive: 1}},
    {input: 'it was decent', output: {positive: 1}},
    {input: 'it was the greatest', output: {positive: 1}},
    // {input: 'it was not too bad', output: {positive: 1}},
    {input: 'good', output: {positive: 1}},
    {input: 'decent', output: {positive: 1}},
    // {input: 'not bad', output: {positive: 1}},
    // {input: 'not too bad', output: {positive: 1}},
    {input: 'pretty good', output: {positive: 1}},
    {input: 'great', output: {positive: 1}},
    {input: 'amazing', output: {positive: 1}},
    {input: 'quite fantastic', output: {positive: 1}},
    {input: 'fantastic', output: {positive: 1}},
    {input: 'superb', output: {positive: 1}},
    {input: 'it was good', output: {positive: 1}},
    {input: 'today was a good day, didnt have to use my ak', output: {positive: 1}},
    {input: 'good day', output: {positive: 1}},
    
    {input: 'absolutely', output: {positive: 1}},
    {input: 'beautiful', output: {positive: 1}},
    {input: 'cheery', output: {positive: 1}},
    {input: 'delightful', output: {positive: 1}},
    {input: 'excellent', output: {positive: 1}},
    {input: 'fabulous', output: {positive: 1}},
    {input: 'gorgeous', output: {positive: 1}},
    {input: 'heavenly', output: {positive: 1}},
    {input: 'ideal', output: {positive: 1}},
    {input: 'jovial', output: {positive: 1}},
    {input: 'kind', output: {positive: 1}},
    {input: 'lovely', output: {positive: 1}},
    {input: 'marvelous', output: {positive: 1}},
    {input: 'nice', output: {positive: 1}},
    {input: 'optimistic', output: {positive: 1}},
    {input: 'perfect', output: {positive: 1}},
    {input: 'quality', output: {positive: 1}},
    {input: 'remarkable', output: {positive: 1}},
    {input: 'superb', output: {positive: 1}},
    {input: 'terrific', output: {positive: 1}},
    {input: 'unreal', output: {positive: 1}},
    {input: 'vibrant', output: {positive: 1}},
    {input: 'wondrous', output: {positive: 1}},
    {input: 'yes', output: {positive: 1}},
    {input: 'zeal', output: {positive: 1}},
    // {input: '', output: {positive: 1}},

    


    {input: 'today sucked', output: {negative: 1}},
    {input: 'today was pretty lame', output: {negative: 1}},
    {input: 'i needed a boost today', output: {negative: 1}},
    {input: 'my day was bad', output: {negative: 1}},
    {input: 'it as a bad day', output: {negative: 1}},
    {input: 'it was a really bad day', output: {negative: 1}},
    {input: 'it was a terribly bad day', output: {negative: 1}},
    {input: 'it was a horrible day', output: {negative: 1}},
    {input: 'my day was a long one', output: {negative: 1}},
    {input: 'my day was boring', output: {negative: 1}},
    {input: 'my day was lame', output: {negative: 1}},
    {input: 'my day was underwhelming', output: {negative: 1}},
    {input: 'my day was less than ideal', output: {negative: 1}},
    {input: 'my day sucked', output: {negative: 1}},
    {input: 'today was super boring', output: {negative: 1}},
    {input: 'today was a shitty day', output: {negative: 1}},
    {input: 'i had a shitty day today', output: {negative: 1}},
    {input: 'i stepped in dog poop', output: {negative: 1}},
    {input: 'my wife left me', output: {negative: 1}},
    {input: 'i lost all my money', output: {negative: 1}},
    {input: 'i was depressed today', output: {negative: 1}},
    {input: 'i felt depressed today', output: {negative: 1}},
    {input: 'depressing', output: {negative: 1}},
    {input: 'i was very sad today', output: {negative: 1}},
    {input: 'i was very tired today', output: {negative: 1}},
    {input: 'today went on forever', output: {negative: 1}},
    {input: 'today drug on', output: {negative: 1}},
    {input: 'today was a drag', output: {negative: 1}},
    {input: 'my day sucked', output: {negative: 1}},
    {input: 'today was so boring', output: {negative: 1}},
    {input: 'today was boring', output: {negative: 1}},
    {input: 'bad', output: {negative: 1}},
    {input: 'terrible', output: {negative: 1}},
    {input: 'horrendous', output: {negative: 1}},
    {input: 'really bad', output: {negative: 1}},
    {input: 'not good', output: {negative: 1}},
    {input: 'pretty bad', output: {negative: 1}},
    {input: 'not great', output: {negative: 1}},
    {input: 'not amazing', output: {negative: 1}},
    {input: 'not good at all', output: {negative: 1}},
    {input: 'bad day', output: {negative: 1}},
    
    {input: 'awful', output: {negative: 1}},
    {input: 'boring', output: {negative: 1}},
    {input: 'cry', output: {negative: 1}},
    {input: 'dreadful', output: {negative: 1}},
    {input: 'evil', output: {negative: 1}},
    {input: 'foul', output: {negative: 1}},
    {input: 'ghastly', output: {negative: 1}},
    {input: 'horrible', output: {negative: 1}},
    {input: 'imperfect', output: {negative: 1}},
    {input: 'junky', output: {negative: 1}},
    {input: 'lousy', output: {negative: 1}},
    {input: 'misshapen', output: {negative: 1}},
    {input: 'negative', output: {negative: 1}},
    {input: 'offensive', output: {negative: 1}},
    {input: 'poor', output: {negative: 1}},
    {input: 'questionable', output: {negative: 1}},
    {input: 'revolting', output: {negative: 1}},
    {input: 'stressful', output: {negative: 1}},
    {input: 'terrible', output: {negative: 1}},
    {input: 'unpleasant', output: {negative: 1}},
    {input: 'vile', output: {negative: 1}},
    {input: 'worthless', output: {negative: 1}},
    {input: 'yucky', output: {negative: 1}},
    // {input: '', output: {negative: 1}},
  ];
  longest = trainingData.reduce((a, b) =>
    a.input.length > b.input.length ? a : b).input.length;
  for (let i = 0; i < trainingData.length; i++) {
    trainingData[i].input = adjustSize(trainingData[i].input);
  }
  return trainingData;
}

function adjustSize(string) {
  while (string.length < longest) {
    string += ' ';
  }
  return string; 
}
function predictEmotion(string){
  return trainedNet(encode(adjustSize(string)));
}
var d = document.getElementById('d');
d.innerHTML = brain.utilities.toSVG(net);