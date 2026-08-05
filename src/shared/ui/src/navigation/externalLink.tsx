export type ExternalLinkProps = React.ComponentPropsWithoutRef<"a">;

export function ExternalLink(props: ExternalLinkProps) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
