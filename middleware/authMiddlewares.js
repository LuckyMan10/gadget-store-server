const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.loginCheck = [
  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Поле с почтой не может быть пустым.")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    .withMessage("Неверный формат почты.")
    .bail(),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Поле с паролем не может быть пустым.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors: ", errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.registrationCheck = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Поле никнейма не может быть пустым.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Минимальная длина никнейма 4 символа.")
    .bail(),
  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Поле с почтой не может быть пустым.")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    .withMessage("Неверный формат почты.")
    .bail(),

  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Поле с паролем не может быть пустым.")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      "Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 прописную, 1 число и 1 спец-символ."
    )
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors: ", errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
