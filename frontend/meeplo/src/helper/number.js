const number = {};

number.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default number;
