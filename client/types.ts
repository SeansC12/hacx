// Types from the previous artifact
type ShortTextInput = { type: "short_text" };
type LongTextInput = { type: "long_text" };
type FileUploadInput = { type: "file_upload" };
type DateTimeInput = {
  type: "date_time";
  options: { includeDate: boolean; includeTime: boolean };
};
type DropdownSelectorInput = {
  type: "dropdown";
  options: string[];
  allowOther: boolean;
};
type GridSelectorInput = { type: "grid"; options: string[] };
type AddressInput = { type: "address" };
type SingpassInput = { type: "singpass_button" };

type FormInputType =
  | ShortTextInput
  | LongTextInput
  | FileUploadInput
  | DateTimeInput
  | DropdownSelectorInput
  | GridSelectorInput
  | AddressInput
  | SingpassInput;

type FormInput = {
  id: string;
  name: string;
  description?: string;
  input: FormInputType;
};

type ImageItem = { itemType: "image"; src: string; alt?: string };
type TextItem = {
  itemType: "text";
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";
  content: string;
};
type FormInputItem = { itemType: "input"; formInput: FormInput };
type CombinedItem = { itemType: "combined"; items: FormItem[] };

type FormItem = ImageItem | TextItem | FormInputItem | CombinedItem;
type FormSection = { name: string; description?: string; items: FormItem[] };
type ReportForm = {
  name: string;
  description: string;
  sections: FormSection[];
};
