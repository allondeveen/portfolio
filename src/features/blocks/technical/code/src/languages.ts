export const languages = [
  "javascript",
  "typescript",
  "tsx",
  "csharp",
  "php",
  "json",
  "html",
  "css",
  "scss",
  "markdown",
  "yaml",
  "bash",
];

export const languagesOptions = languages.map((language) => {
  let label;
  switch (language) {
    case "javascript":
      label = "JavaScript";
      break;
    case "typescript":
      label = "TypeScript";
      break;
    case "tsx":
      label = "TSX";
      break;
    case "csharp":
      label = "C#";
      break;
    case "php":
      label = "PHP";
      break;
    case "json":
      label = "JSON";
      break;
    case "html":
      label = "HTML";
      break;
    case "css":
      label = "CSS";
      break;
    case "scss":
      label = "SCSS";
      break;
    case "yaml":
      label = "YAML";
      break;
    case "bash":
      label = "Bash";
      break;
    default:
      label = language.charAt(0).toUpperCase() + language.slice(1);
  }
  return {
    label,
    value: language,
  };
});
