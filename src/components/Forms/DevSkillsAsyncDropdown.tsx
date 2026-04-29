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

const DevSkillsAsyncDropdown = ({
  value,
  handleSelect,
  invalid,
}: {
  value: string[];
  handleSelect: (skills: string[]) => void;
  invalid?: boolean;
}) => {
  const anchor = useComboboxAnchor();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<skillType[]>([]);
  const debouncedQuery = useDebounce(query);

  const fetchSkills = async (q: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/topics?q=${q}&per_page=10`,
        {
          headers: { Accept: "application/vnd.github.mercy-preview+json" },
        }
      );
      const item = await res.json();
      setResults(item?.items ?? []);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    fetchSkills(debouncedQuery);
  }, [debouncedQuery]);

  // many skills have no display_name so we will fallback to just name and replace all - to space
  const extractskillName = (skill: skillType) => {
    return skill.display_name
      ? skill.display_name
      : skill.name.replaceAll("-", " ");
  };
  return (
    <Combobox
      multiple
      autoHighlight
      items={results}
      value={value}
      onValueChange={handleSelect}
      onInputValueChange={setQuery}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value} className="capitalize">
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder="Search Skill..."
                aria-invalid={invalid}
              />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
        {results.length === 0 && !isLoading ? (
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
  );
};

export default DevSkillsAsyncDropdown;
