import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import ChipField from "@/components/ui/auth/ChipFiled";
import InfoPopup from "@/components/ui/infoPopup/InfoPopup";
import React, { useCallback, useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";

type SkillsInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  infoContent?: React.ReactNode;
  labelStyle?: string;
  formErrors?: any;
};

const SkillsInput: React.FC<SkillsInputProps> = React.memo(
  ({ control, name, label, placeholder, infoContent, labelStyle = "font-medium" }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const {
      field: { value: skills, onChange: setSkills },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: [],
    });

    // Memoize the add skill function
    const addSkill = useCallback(
      (skillToAdd: string) => {
        const trimmedSkill = skillToAdd.trim();
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
          setSkills([...skills, trimmedSkill]);
          setInputValue("");
        }
      },
      [skills, setSkills],
    );

    // Memoize the remove skill function
    const removeSkill = useCallback(
      (skillToRemove: string) => {
        setSkills(skills.filter((skill: string) => skill !== skillToRemove));
      },
      [skills, setSkills],
    );

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addSkill(inputValue);
        }
      },
      [inputValue, addSkill],
    );

    // Handle input change
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, []);

    // Handle add button click (for mobile)
    const handleAddClick = useCallback(() => {
      addSkill(inputValue);
    }, [inputValue, addSkill]);

    // Memoize chips to prevent unnecessary re-renders
    const chipElements = useMemo(
      () =>
        skills.map((skill: string, index: number) => (
          <ChipField
            key={`${skill}-${index}`} // More stable key
            label={skill}
            removable
            onRemove={() => removeSkill(skill)}
          />
        )),
      [skills, removeSkill],
    );

    return (
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AuthLabel labelStyle={labelStyle} label={label} />
            {infoContent && <InfoPopup content={infoContent} />}
          </div>

          {/* Input with Add Button for Mobile */}
          <div className="flex gap-2">
            <div className="flex-1">
              <AuthInput
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                errorMsg={skills.length > 0 ? undefined : error}
                onKeyDown={handleKeyDown}
              />
            </div>
            {/* Add Button - visible on mobile, hidden on desktop when input is focused */}
            <AuthButton
              type="button"
              label="Add"
              onClick={handleAddClick}
              disabled={!inputValue.trim()}
              customStyle="md:hidden px-4 py-2 w-[25%] text-sm whitespace-nowrap"
            />
          </div>

          {/* Desktop hint */}
          <small className="text-gray-500 text-xs hidden md:block">Press Enter to add skills</small>
        </div>

        {/* Skills Chips */}
        {skills.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{chipElements}</div>}
      </div>
    );
  },
);

export default SkillsInput;
