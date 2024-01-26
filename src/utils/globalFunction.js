globalThis.wait = (time = randomTime()) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

globalThis.randomTime = (min = 300, max = 1000) => {
  const rand = Math.random() * (max - min);
  return parseInt(rand + min);
};
