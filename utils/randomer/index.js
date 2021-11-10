const randomer = () => {
  const string =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let random = "";

  for (let i = 0; i < 50; i++) {
    const rand = Math.floor(Math.random() * string.length);
    random += string[rand];
  }

  return random;
};

module.exports = randomer;
