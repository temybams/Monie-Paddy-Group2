import Joi from "joi";

export const signupValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().trim().lowercase().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  bvn: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  password: Joi.string().required().min(6),
});

export const loginValidation = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required().min(6),
});

//airtime validation
export const airtimeValidation = Joi.object({
  amount: Joi.number().required().min(1),
  phoneNumber: Joi.string().required(),
  network: Joi.string().required(),
  transactionPin: Joi.string().required(),
});

export const validBankTransfer = Joi.object({
  amount: Joi.number().required().min(50000).max(10000000),
  pin: Joi.string().required(),
  accountName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  bankName: Joi.string().required(),
  note: Joi.string().allow(''),
});
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
