import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import FormErrorMessage from "./FormErrorMessage";

const SelectController = ({
  id,
  label,
  name,
  placeholder,
  value,
  onchange,
  onBlur,
  error,
  invalid,
  options,
  fieldClassNames,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onchange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
  invalid: boolean;
  options: string[];
  fieldClassNames?: string;
}) => {
  return (
    <Field data-invalid={invalid} className={fieldClassNames}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>

      <Select value={value} onValueChange={onchange} name={name}>
        <SelectTrigger aria-invalid={invalid}>
          <SelectValue id={id} placeholder={placeholder} onBlur={onBlur} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}{" "}
          </SelectGroup>
        </SelectContent>
      </Select>
      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default SelectController;
