const db = require("../models");
const { users } = db;
const { hash, compare } = require("bcrypt");
const randomer = require("../utils/randomer");
const mailer = require("../utils/mailer");

exports.handleRegister = async (req, res) => {
  const { firstname, lastname, email, role, password } = req.body;

  try {
    if (!firstname) throw new Error("Input fields must be filled");

    const response = await users.findOne({ where: { email } });

    if (response) {
      throw new Error("User Exists");
    }

    const hashedPasword = await hash(password, 10);
    const refreshtoken = randomer();
    const user = await users.create({
      firstname,
      lastname,
      email,
      role,
      password: hashedPasword,
      refreshtoken,
    });

    const mailResponse = mailer(firstname, lastname, email, refreshtoken);

    if (!mailResponse) {
      res.status(500).send({
        message: "Something went wrong while sending the verifcation mail",
      });
      return;
    }

    if (user) {
      res.status(201).send({
        message: "User Created",
        response: mailResponse,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || "User not created" });
  }
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid Email / Password");
    }

    const isPassword = await compare(password, user.password);

    if (!isPassword) {
      throw new Error("Invalid Email / Password");
    }

    if (!user.status) {
      throw new Error("Email Verification needed before login");
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
