import { v4 as uuidv4 } from 'uuid';

import {
  defaultAddressConfig,
  defaultAddressHeightWidth,
  defaultDatePickerConfig,
  defaultDatePickerHeightWidth,
  defaultDropdownConfig,
  defaultDropdownHeightWidth,
  defaultEmailConfig,
  defaultFullnameConfig,
  defaultFullNameHeightWidth,
  defaultHeadingConfig,
  defaultHeadingHeightWidth,
  defaultLongTextHeightWidth,
  defaultMultipleChoiceConfig,
  defaultMultipleChoiceHeightWidth,
  defaultNumberPhoneConfig,
  defaultPhoneHeightWidth,
  defaultScaleRatingConfig,
  defaultScaleRatingHeightWidth,
  defaultShortTextHeightWidth,
  defaultSingleChoiceConfig,
  defaultSingleChoiceHeightWidth,
  defaultSubmitConfig,
  defaultSubmitHeightWidth,
  defaultTextConfig,
  defaultTimeHeightWidth,
  defaultTimeInputConfig,
} from '@/configs/defaultElementConfigs';
import { ElementConfig, ElementType } from '@/types';

export const getDefaultWidthHeight = (type: ElementType | undefined) => {
  switch (true) {
    case type === ElementType.SHORT_TEXT:
      return defaultShortTextHeightWidth;
    case type === ElementType.LONG_TEXT:
      return defaultLongTextHeightWidth;
    case type === ElementType.ADDRESS:
      return defaultAddressHeightWidth;
    case type === ElementType.DROPDOWN:
      return defaultDropdownHeightWidth;
    case type === ElementType.SINGLE_CHOICE:
      return defaultSingleChoiceHeightWidth;
    case type === ElementType.MULTIPLE_CHOICE:
      return defaultMultipleChoiceHeightWidth;
    case type === ElementType.TIME:
      return defaultTimeHeightWidth;
    case type === ElementType.SCALE_RATING:
      return defaultScaleRatingHeightWidth;
    case type === ElementType.HEADING:
      return defaultHeadingHeightWidth;
    case type === ElementType.SUBMIT:
      return defaultSubmitHeightWidth;
    default:
      return {
        h: 5,
        w: 12,
      };
  }
};

export const createElement = (
  elementType: ElementType,
  config: ElementConfig,
) => {
  const uid = uuidv4();

  switch (elementType) {
    case ElementType.HEADING:
      return {
        id: uid,
        type: ElementType.HEADING,
        gridSize: { x: 0, y: 0, w: 12, h: 6 },
        config: { ...defaultHeadingConfig, ...config },
        fields: [],
      };
    case ElementType.EMAIL:
      return {
        id: uid,
        type: ElementType.EMAIL,
        gridSize: { x: 0, y: 0, w: 12, h: 6 },
        config: { ...defaultEmailConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'email',
            text: '',
          },
        ],
      };
    case ElementType.FULLNAME:
      return {
        id: uid,
        type: ElementType.FULLNAME,
        gridSize: { x: 0, y: 0, ...defaultFullNameHeightWidth },
        config: { ...defaultFullnameConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'firstName',
            text: '',
          },
          {
            id: uuidv4(),
            name: 'lastName',
            text: '',
          },
        ],
      };
    case ElementType.SUBMIT:
      return {
        id: uid,
        type: ElementType.SUBMIT,
        gridSize: { x: 0, y: 0, ...defaultSubmitHeightWidth },
        config: { ...defaultSubmitConfig, ...config },
        fields: [],
      };
    case ElementType.SHORT_TEXT:
      return {
        id: uid,
        type: ElementType.SHORT_TEXT,
        gridSize: { x: 0, y: 0, ...defaultShortTextHeightWidth },
        config: { ...defaultTextConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'shortText',
          },
        ],
      };
    case ElementType.LONG_TEXT:
      return {
        id: uid,
        type: ElementType.LONG_TEXT,
        gridSize: { x: 0, y: 0, ...defaultLongTextHeightWidth },
        config: { ...defaultTextConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'longText',
          },
        ],
      };
    case ElementType.SCALE_RATING:
      return {
        id: uid,
        type: ElementType.SCALE_RATING,
        gridSize: { x: 0, y: 0, ...defaultScaleRatingHeightWidth },
        config: { ...defaultScaleRatingConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'scaleRating',
            text: '',
          },
        ],
      };
    case ElementType.ADDRESS:
      return {
        id: uid,
        type: ElementType.ADDRESS,
        gridSize: { x: 0, y: 0, ...defaultAddressHeightWidth },
        config: { ...defaultAddressConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'street',
          },
          {
            id: uuidv4(),
            name: 'ward',
          },
          {
            id: uuidv4(),
            name: 'district',
          },
          {
            id: uuidv4(),
            name: 'city',
          },
        ],
      };
    case ElementType.DROPDOWN:
      return {
        id: uid,
        type: ElementType.DROPDOWN,
        gridSize: { x: 0, y: 0, ...defaultDropdownHeightWidth },
        config: { ...defaultDropdownConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'dropdown',
          },
        ],
      };
    case ElementType.SINGLE_CHOICE:
      return {
        id: uid,
        type: ElementType.SINGLE_CHOICE,
        gridSize: { x: 0, y: 0, ...defaultSingleChoiceHeightWidth },
        config: { ...defaultSingleChoiceConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'singleChoice',
          },
        ],
      };
    case ElementType.MULTIPLE_CHOICE:
      return {
        id: uid,
        type: ElementType.MULTIPLE_CHOICE,
        gridSize: { x: 0, y: 0, ...defaultMultipleChoiceHeightWidth },
        config: { ...defaultMultipleChoiceConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'multipleChoice',
          },
        ],
      };
    case ElementType.PHONE:
      return {
        id: uid,
        type: ElementType.PHONE,
        gridSize: { x: 0, y: 0, ...defaultPhoneHeightWidth },
        config: { ...defaultNumberPhoneConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'phoneNumber',
          },
        ],
      };
    case ElementType.DATEPICKER:
      return {
        id: uid,
        type: ElementType.DATEPICKER,
        gridSize: { x: 0, y: 0, ...defaultDatePickerHeightWidth },
        config: { ...defaultDatePickerConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'longText',
          },
        ],
      };
    case ElementType.TIME:
      return {
        id: uid,
        type: ElementType.TIME,
        gridSize: { x: 0, y: 0, ...defaultTimeHeightWidth },
        config: { ...defaultTimeInputConfig, ...config },
        fields: [
          {
            id: uuidv4(),
            name: 'timeInput',
          },
        ],
      };
    default:
      return undefined;
  }
};
