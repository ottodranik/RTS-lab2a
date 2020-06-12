/* 
 * NOTES! Perceptron takes an input, aggregates it (weighted sum) 
 * and returns 1 only if the aggregated sum is more 
 * than some threshold else returns 0.
 * A single perceptron can only be used to implement linearly 
 * separable functions. It takes both real and boolean inputs 
 * and associates a set of weights to them, along with a bias 
 * (the threshold thing I mentioned above)
 * https://towardsdatascience.com/perceptron-learning-algorithm-d5db0deab975
 * 
 * MAIN FORMULS!
 * y = x1 * W1 + x2 * W2
 * Δ = threshold – y
 * W1(i+1) = W1(i) + W2 * x11
 * W2(i+1) = W1(i) + W2 * x12
 */
export class Perceptron {
  constructor({ threshold, weights, dots, conditions }) {
    this.threshold = threshold; // threshold
    this.weights = weights;
    this.dots = dots;
    this.conditions = conditions;
  }

  // W1(i+1) = W1(i) + W2 * x11
  // W2(i+1) = W1(i) + W2 * x12
  updateWeights(y, dot, weights, learningSpeed) {
    const delta = this.countDelta(y);
    return weights.map((weight, index) => weight + delta * learningSpeed * dot[index]);
  }

  checkCondition(y, dot, weights, index) {
    const condition = this.conditions[index];
    if (!y) {
      y = this.countY(dot, weights);
    }
    return condition ? y > this.threshold : y < this.threshold;
  }

  // y = x1 * W1 + x2 * W2
  countY(dot, weights) {
    return dot.reduce((res, current, index) => res + current * weights[index], 0);
  }

  // Δ = threshold – y
  countDelta = y => this.threshold - y;

  generateMessage = (message, weights) => ({ message, weights });

  calculateCurrentTime(start) {
    const finish = new Date();
    let diff = finish - start; // in miliseconds
    diff /= 1000; // strip the ms
    return Math.round(diff); // get seconds
  }

  calculate(
    learningSpeed,
    deadline, // in seconds
    iterationsCount
  ) {
    let currentWeights = [...this.weights];

    const start = new Date();

    // Main part
    for (let i = 0; i < iterationsCount; i++) {
      for (let j = 0; j < this.dots.length; j++) {
        const dot = this.dots[j];
        const y = this.countY(this.dots[j], currentWeights); // count Y: y = x1 * W1 + x2 * W2
        if (this.checkCondition(y, dot, currentWeights, j)) {
          const isStop = this.dots.every((dot, index) => this.checkCondition(dot, index, currentWeights));
          if (isStop) {
            return this.generateMessage("Success!", currentWeights);
          }
        }
        currentWeights = this.updateWeights(y, dot, currentWeights, learningSpeed); // set new weights
      }
      if (this.calculateCurrentTime(start) > deadline) {
        return this.generateMessage("Error: Дедлайн!", currentWeights);
      }
    }
    return this.generateMessage("Success!", currentWeights);
  }
}
