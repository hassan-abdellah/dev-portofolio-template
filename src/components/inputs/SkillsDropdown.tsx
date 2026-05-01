import { useEffect, useState, Fragment } from "react";

import useDebounce from "@/hooks/useDebounce";
import type { skillType } from "@/types";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../ui/combobox";
import { Spinner } from "../ui/spinner";
import { Field, FieldLabel } from "../ui/field";
import FormErrorMessage from "./FormErrorMessage";

const SkillsDropdown = ({
  id,
  label,
  value,
  handleSelect,
  onBlur,
  invalid,
  error,
}: {
  id: string;
  label: string;
  value: string[];
  handleSelect: (skills: string[]) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  error: string | undefined;
}) => {
  const anchor = useComboboxAnchor();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<skillType[]>([]);
  const debouncedQuery = useDebounce(query);

  // fetch skills from API
  const fetchSkills = async (q: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/topics?q=${q}&per_page=10`,
        {
          headers: { Accept: "application/vnd.github.mercy-preview+json" },
        },
      );

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
      }

      const item = await res.json();
      setResults(item?.items ?? []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // trigger the API on typing
  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSkills(debouncedQuery);
  }, [debouncedQuery]);

  // many skills have no display_name so we will fallback to just name and replace all - to space
  const extractskillName = (skill: skillType) => {
    return skill.display_name
      ? skill.display_name
      : skill.name.replaceAll("-", " ");
  };
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>

      <Combobox
        multiple
        autoHighlight
        items={results}
        value={value}
        onValueChange={handleSelect}
        onInputValueChange={setQuery}
      >
        <ComboboxChips ref={anchor} className="w-full max-w-full input-field">
          <ComboboxValue>
            {(values) => (
              <Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value} className="capitalize">
                    {value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={id}
                  placeholder="Search Skill..."
                  className="w-full"
                  aria-invalid={invalid}
                  onBlur={onBlur}
                />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          {results.length === 0 && !isLoading && hasSearched ? (
            <ComboboxEmpty>No skill found.</ComboboxEmpty>
          ) : null}
          <ComboboxList>
            {isLoading ? (
              <div className="flex items-center justify-center h-20">
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              (skill) => (
                <ComboboxItem
                  key={skill.name}
                  value={extractskillName(skill)}
                  className="capitalize"
                >
                  {extractskillName(skill)}
                </ComboboxItem>
              )
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default SkillsDropdown;
