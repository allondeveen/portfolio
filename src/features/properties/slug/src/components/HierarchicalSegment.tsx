"use client";

export type HierarchicalSegmentProps = {
  hierarchicalSegment: string;
};

export function HierarchicalSegment({ hierarchicalSegment }: HierarchicalSegmentProps) {
  return <span className="slug__hierarchical-segment">{hierarchicalSegment}</span>;
}
