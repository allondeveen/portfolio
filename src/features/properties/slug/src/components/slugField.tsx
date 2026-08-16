"use client";

import { getLeafSlug } from "@allondeveen-portfolio/leaf-slug";
import { FieldDescription, FieldLabel, useField } from "@payloadcms/ui";
import { type TextFieldClientProps } from "payload";
import { type ChangeEvent } from "react";

import "./slugField.css";
import { HierarchicalSegment } from "./HierarchicalSegment";

export type SlugFieldClientProps = TextFieldClientProps & {
  hierarchicalSegment: string;
};

export function SlugField({ path, hierarchicalSegment, field }: SlugFieldClientProps) {
  const { value, setValue } = useField<string>({ path });
  const valueWithoutHierarchicalSegment = getLeafSlug(value);
  const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="field-type text" style={{ flex: "1 1 auto" }}>
      <FieldLabel as="label" label="Slug" htmlFor="field-slug" />
      <FieldDescription path={path} description={field.admin?.description} />
      <div className="field-type__wrap">
        <HierarchicalSegment hierarchicalSegment={hierarchicalSegment} />
        <input
          id="field-slug"
          name="slug"
          type="text"
          value={valueWithoutHierarchicalSegment}
          onChange={onChange}
          data-lpignore="true"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
