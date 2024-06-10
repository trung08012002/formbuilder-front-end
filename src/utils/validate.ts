import i18next from 'i18next';

import {
  requiredFieldValueSchema,
  requiredQuestionSchema,
  requiredStringSchema,
  requiredUrl,
} from './schemas/validation';

export const validateLabel = async (value: string) =>
  await requiredStringSchema
    .validate(value)
    .then(() => {})
    .catch((err) => i18next.t(err.errors[0]));

export const validateFieldValue = async (value: string) =>
  await requiredFieldValueSchema
    .validate(value)
    .then(() => {})
    .catch((err) => i18next.t(err.errors[0]));

export const validateQuestion = async (value: string) =>
  await requiredQuestionSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);

export const validateUrl = async (value: string) =>
  await requiredUrl
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors.map((error: string) => i18next.t(error)));
