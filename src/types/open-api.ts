import {
  AddressConfig,
  DatePickerConfig,
  DropdownConfig,
  ElementConfig,
  ElementType,
  EmailConfig,
  FullnameConfig,
  HeadingConfig,
  MultipleChoiceConfig,
  NumberPhoneConfig,
  ScaleRatingConfig,
  SingleChoiceConfig,
  SubmitConfig,
  TextConfig,
  TimeInputConfig,
} from './elements';

export interface ElementResponse<
  T extends ElementType,
  U extends ElementConfig,
> {
  type: T;
  config: U;
}

export type HeadingElementResponse = ElementResponse<
  ElementType.HEADING,
  HeadingConfig
>;

export type EmailElementResponse = ElementResponse<
  ElementType.EMAIL,
  EmailConfig
>;

export type FullnameElementResponse = ElementResponse<
  ElementType.FULLNAME,
  FullnameConfig
>;

export type ShortTextElementResponse = ElementResponse<
  ElementType.SHORT_TEXT,
  TextConfig
>;

export type LongTextElementResponse = ElementResponse<
  ElementType.LONG_TEXT,
  TextConfig
>;

export type SubmitElementResponse = ElementResponse<
  ElementType.SUBMIT,
  SubmitConfig
>;

export type ScaleRatingElementResponse = ElementResponse<
  ElementType.SCALE_RATING,
  ScaleRatingConfig
>;

export type AddressElementResponse = ElementResponse<
  ElementType.ADDRESS,
  AddressConfig
>;
export type NumberPhoneElementResponse = ElementResponse<
  ElementType.PHONE,
  NumberPhoneConfig
>;

export type DropdownElementResponse = ElementResponse<
  ElementType.DROPDOWN,
  DropdownConfig
>;

export type SingleChoiceElementResponse = ElementResponse<
  ElementType.SINGLE_CHOICE,
  SingleChoiceConfig
>;
export type TimeInputElementResponse = ElementResponse<
  ElementType.TIME,
  TimeInputConfig
>;

export type DatePickerElementResponse = ElementResponse<
  ElementType.DATEPICKER,
  DatePickerConfig
>;

export type MultipleChoiceElementResponse = ElementResponse<
  ElementType.MULTIPLE_CHOICE,
  MultipleChoiceConfig
>;

export type ElementItemResponse =
  | HeadingElementResponse
  | FullnameElementResponse
  | EmailElementResponse
  | ShortTextElementResponse
  | LongTextElementResponse
  | SubmitElementResponse
  | ScaleRatingElementResponse
  | AddressElementResponse
  | DropdownElementResponse
  | SingleChoiceElementResponse
  | MultipleChoiceElementResponse
  | AddressElementResponse
  | NumberPhoneElementResponse
  | DatePickerElementResponse
  | TimeInputElementResponse;
