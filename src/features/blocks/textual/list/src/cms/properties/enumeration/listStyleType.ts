import type { Field } from "payload";

export const listStyleType: Field = {
  type: "select",
  name: "listStyleType",
  label: "List style type",
  defaultValue: "default",
  required: true,
  options: [
    { label: "Default", value: "default" },
    { label: "Disc", value: "disc" },
    { label: "Circle", value: "circle" },
    { label: "Square", value: "square" },
    { label: "Decimal with leading zero (01, 02, 03)", value: "decimal-leading-zero" },
    { label: "Lowercase letters (a, b, c)", value: "lower-alpha" },
    { label: "Uppercase letters (A, B, C)", value: "upper-alpha" },
    { label: "Hebrew letters", value: "hebrew" },
    { label: "Lowercase Roman numerals (i, ii, iii)", value: "lower-roman" },
    { label: "Uppercase Roman numerals (I, II, III)", value: "upper-roman" },
    { label: "None", value: "none" },
    { label: "Custom image", value: "image" },
  ],
  filterOptions({ siblingData, options }) {
    const unorderedTypes = ["disc", "circle", "square", "image"];
    let returnOptions = options;
    if (siblingData?.type === "unordered") {
      returnOptions = returnOptions.filter((value) =>
        typeof value === "string"
          ? unorderedTypes.includes(value) || ["default", "none"].includes(value)
          : unorderedTypes.includes(value.value) || ["default", "none"].includes(value.value),
      );
    } else if (siblingData?.type === "ordered") {
      returnOptions = returnOptions.filter((value) =>
        typeof value === "string"
          ? !unorderedTypes.includes(value)
          : !unorderedTypes.includes(value.value),
      );
    }
    return returnOptions;
  },
};
