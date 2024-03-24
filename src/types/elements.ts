import { Layout as LayoutProps } from 'react-grid-layout';

export interface HeadingConfig {
  headingText: string;
  subheadingText: string;
}

export interface EmailConfig {
  fieldLabel: string;
  required: boolean;
  sublabel: string;
}

export type ElementConfig = HeadingConfig | EmailConfig;

export enum ElementType {
  HEADING = 'Heading',
  EMAIL = 'Email',
  FULLNAME = 'Fullname',
  ADDRESS = 'Address',
  PHONE = 'Phone',
  DATEPICKER = 'Datepicker',
  APPOINTMENT = 'Appointment',
  SHORT_TEXT = 'Short Text',
  LONG_TEXT = 'Long Text',
  DROPDOWN = 'Dropdown',
  SINGLE_CHOICE = 'Single Choice',
  MULTIPLE_CHOICE = 'Multiple Choice',
  NUMBER = 'Number',
  IMAGE = 'Image',
  FILE_UPLOAD = 'File Upload',
  TIME = 'Time',
  SUBMIT = 'Submit',
  INPUT_TABLE = 'Input Table',
  STAR_RATING = 'Star Rating',
  DIVIDER = 'Divider',
  PAGE_BREAK = 'Page Break',
}

export type GridSize = Pick<LayoutProps, 'x' | 'y' | 'w' | 'h'>;

export interface BaseElement<T extends ElementType, U extends ElementConfig> {
  id: string;
  type: T;
  gridSize: GridSize;
  config: U;
}

export type HeadingElement = BaseElement<ElementType.HEADING, HeadingConfig>;

export type EmailElement = BaseElement<ElementType.EMAIL, EmailConfig>;

export type ElementItem = HeadingElement | EmailElement;
