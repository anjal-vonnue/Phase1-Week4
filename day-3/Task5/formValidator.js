export const rules = {
  name: { required: true, minLength: 3, maxLength: 12 },
  email: {
    required: true,
    email: true,
  },
  phone: { required: true, minLength: 10, maxLength: 12, pattern: "[0-9]+" },
  dob: { required: true },
  time_of_dob: { required: false },
  luck: { required: false },
  website: { required: false },
  picture: { required: true },
  username: {
    required: true,
    pattern: "^[A-Za-z0-9_]{3,20}$",
  },
  password: {
    required: true,
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  },
  confirm_pass: {
    required: true,
    match: "password",
  },
  month: { required: false },
  week: { required: false },
  job_title: {
    required: true,
    minLength: 3,
    maxLength: 50,
    custom: function (value) {
      if (value === "FrontendEngineer") {
        return "you are a frontend engineer";
      } else {
        return "you are not a frontend engineer";
      }
    },
  },
  join: { required: true },
};

export class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
  }

  checkRules(value, rules) {
    // console.log(rules);
    const keys = Object.keys(rules);
    // console.log(keys);
    for (const key of keys) {
      console.log(key);

      switch (key) {
        case "required":
          if (!value) {
            return "error: This value is Required";
          }
          break;
        case "email":
          if (!value) return "This value is Required";
          let pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
          const regexEmail = new RegExp(pattern);
          if (!value.match(regexEmail)) {
            return "error: email doest match";
          }
          break;
        case "maxLength":
          if (value.length > rules[key])
            return `error: The Value must be ${rules[key]} characters`;
          break;
        case "minLength":
          if (value.length < rules[key])
            return `error: The Value must be greater than ${rules[key]} characters`;
          break;
        case "pattern":
          const regex = new RegExp(rules[key]);
          console.log(regex);

          const match = value.match(regex);
          console.log(value);

          if (!match) {
            return "error: Enter a Valid input";
          }
          break;

        case "match":
          const eleMatchValue = document.querySelector(
            `[name=${rules[key]}]`,
          ).value;
          console.log("elementValuse: ", eleMatchValue);
          console.log(value);

          if (value !== eleMatchValue) {
            return "error: password doesn't match";
          } else {
            return null;
          }
          break;
        case "custom":
          const title = rules.custom(value);
          return title;

          break;
      }
    }
    return null;
  }

  validate(field) {
    const rules = this.rules[field.name];
    const result = this.checkRules(field.value, rules);
    const span = field.closest("p").querySelector("span");
    if (result !== null) {
      span.classList.remove("is_valid");
      span.classList.add("is_invalid");
      span.textContent = result;
      console.log(span);
    } else {
      span.classList.remove("is_invalid");
      span.classList.add("is_valid");
      span.textContent = "correct";
    }
  }

  validateAll(input) {
    // for (const input of inputs) {
    this.validate(input);
    // }
  }
}

// const form = document.getElementById("registration_form");
// const inputs = document.querySelectorAll("input");

// const formValidator = new FormValidator(form, rules);

// for (const input of inputs) {
//   input.addEventListener("blur", () => {
//     formValidator.validate(input);
//   });
// }

// form.addEventListener("submit", () => {
//   event.preventDefault();
//   formValidator.validateAll(inputs);
// });
