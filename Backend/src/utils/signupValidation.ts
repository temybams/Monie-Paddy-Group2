import Joi from 'joi';

export const signupValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().trim().lowercase().email().required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
  bvn: Joi.string().pattern(/^[0-9]{11}$/).required(),
  password: Joi.string().required().min(6),
});

export const options = {
    abortEarly: false,
    errors:{
        wrap:{
            label: ''
        }
    }
}