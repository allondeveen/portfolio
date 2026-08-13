export function removeHierarchicalSegment(hierarchicalSegment: string) {
  return (value: string) => {
    if (value.startsWith(hierarchicalSegment)) {
      return value.replace(hierarchicalSegment, "");
    }
    return value;
  };
}
