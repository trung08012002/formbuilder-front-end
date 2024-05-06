import {
  requiredFieldValueSchema,
  requiredQuestionSchema,
  requiredStringSchema,
} from './schemas/validation';

export const validateLabel = async (value: string) =>
  await requiredStringSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);

export const validateFieldValue = async (value: string) =>
  await requiredFieldValueSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);

export const validateQuestion = async (value: string) =>
  await requiredQuestionSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);
