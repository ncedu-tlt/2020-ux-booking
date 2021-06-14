import { ButtonIconTypesEnum } from '../enums/button-icon-types.enum';

export type Item = {
  [key: string]: string;
};

export type TableConfig = {
  items: Item[];
  columns: string[];
  headers: {
    [key: string]: string;
  };
  buttons: ButtonIconTypesEnum[];
};

export type TableButtonClick = {
  buttonType: ButtonIconTypesEnum;
  item: Item;
};
