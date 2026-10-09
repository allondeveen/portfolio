import clsx from "clsx";
import { type ReactElement } from "react";

import type { Story, StoryItems } from "./data";

import "./style.css";

export type StoryComponentProps = Story & {
  items: StoryItems<ReactElement>;
};

export function StoryComponent({
  id,
  items,
  columnDistribution,
  mobileColumnDistribution,
}: StoryComponentProps) {
  const timelineName = (itemId: string) => `--story-${id}-${itemId}`;
  return (
    <section
      className={clsx("story", "block")}
      data-content-width={
        columnDistribution === "1/1" ? "1" : columnDistribution === "1/2" ? "2" : "3"
      }
      data-mobile-content-width={
        mobileColumnDistribution === "1/1" ? "1" : mobileColumnDistribution === "1/2" ? "2" : "3"
      }
      style={{
        timelineScope: items.map((item) => timelineName(item.id)).join(", "),
      }}
    >
      <div className="story__frames" aria-hidden={true}>
        {items.map((item, index) => {
          const previous = items[index - 1];
          return (
            <div
              key={item.id}
              className="story__frames--frame"
              data-entering={index > 0}
              style={{
                animationTimeline: previous ? timelineName(previous.id) : undefined,
              }}
            >
              <div
                className="frames__frame--content"
                data-exiting={index < items.length - 1}
                style={{
                  animationTimeline: timelineName(item.id),
                }}
              >
                {item.frame}
              </div>
            </div>
          );
        })}
      </div>
      <div className="story__stories">
        {items.map((item) => {
          return (
            <section
              key={item.id}
              className="story__stories--story"
              id={timelineName(item.id)}
              style={{
                viewTimelineName: timelineName(item.id),
                viewTimelineAxis: "block",
              }}
            >
              <div className="sr-only">{item.frame}</div>
              <div className="stories__story--content">{item.content}</div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
