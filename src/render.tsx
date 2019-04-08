// tslint:disable:no-any
import Avatar from "antd/lib/avatar";
import Icon from "antd/lib/icon";
import Popover from "antd/lib/popover";
// @ts-ignore
import { t } from "onefx/lib/iso-i18n";
import React from "react";

export class CloudinaryImage {
  public url: string;

  constructor(url: string) {
    this.url = url || "";
  }

  public changeWidth(w: number): CloudinaryImage {
    return new CloudinaryImage(this.url.replace("upload", `upload/w_${w}`));
  }

  public cdnUrl(): string {
    return this.url.replace("res.cloudinary.com", "imgc.iotex.io");
  }
}

export function cloudinaryImage(url: string): CloudinaryImage {
  return new CloudinaryImage(url);
}

export const colors = {
  primary: "#00b4a0",
  secondary: "#0C8DE4",

  black: "#000000",
  black95: "#050505",
  black80: "#999999",
  black60: "#CCCCCC",
  black40: "#E5E5E5",
  black20: "#F0F0F0",
  black10: "#F7F7F7",

  text01: "#333333",
  white: "#fff",

  error: "#E54937", //	Error
  success: "#07A35A", //	Success
  warning: "#FFA000", //	Warning
  information: "#5aaafa", //	Information

  nav01: "#011627",
  nav02: "#20232a",
  nav03: "#151d27",

  PRODUCING: "#0b8de3",
  ELECTED: "#06a35a",
  NOT_ELECTED: "#ff9100",
  UNQUALIFIED: "#999999",
  deltaUp: "#00b4a0"
};

export function renderDelegateName(text: string, record: any): JSX.Element {
  return (
    <a
      href={`https://member.iotex.io/delegate/${record.id}`}
      style={{ display: "flex" }}
    >
      <Avatar
        shape="square"
        src={cloudinaryImage(record.logo)
          .changeWidth(32)
          .cdnUrl()}
      />
      <div
        style={{
          paddingLeft: "1em",
          color: colors.PRODUCING,
          fontWeight: "bold",
          lineHeight: 1.36
        }}
      >
        <div>{text}</div>
        <div
          style={{
            fontSize: "12px",
            color: "#999",
            fontWeight: "normal",
            paddingTop: "5px"
          }}
        >
          {record.registeredName}
        </div>
      </div>
    </a>
  );
}

// @ts-ignore
export function renderStatus(text: string, record: any): JSX.Element {
  const status: "UNQUALIFIED" | "ELECTED" | "NOT_ELECTED" = record.status
    ? record.status
    : "UNQUALIFIED";
  // tslint:disable:react-no-dangerous-html
  const content = (
    <p dangerouslySetInnerHTML={{ __html: t("candidates.election.explain") }} />
  );
  return (
    <Popover content={content} trigger="click">
      <div style={{ cursor: "pointer" }}>
        <Avatar
          shape="square"
          size={14}
          style={{ backgroundColor: colors[status] }}
        />
        <span style={{ padding: "0.5em" }}>
          {t(`candidates.election.${status}`)}
        </span>
      </div>
    </Popover>
  );
}

// @ts-ignore
export function renderLiveVotes(text: number, record: any): JSX.Element {
  let iconType = "minus";
  if (record.liveVotesDelta > 0) {
    iconType = "arrow-up";
  } else if (record.liveVotesDelta < 0) {
    iconType = "arrow-down";
  }

  let color = colors.black80;
  if (record.liveVotesDelta > 0) {
    color = colors.deltaUp;
  } else if (record.liveVotesDelta < 0) {
    color = colors.error;
  }

  return (
    <div>
      {
        <span style={{ padding: "0.5em" }}>
          {Math.abs(text).toLocaleString()}
        </span>
      }
      <Icon
        type={iconType}
        style={{
          color,
          fontSize: "11px"
        }}
      />
      <span
        style={{ padding: "0.5em", fontSize: "11px", color: colors.black80 }}
      >
        {Math.abs(record.liveVotesDelta).toLocaleString()}
      </span>
    </div>
  );
}

export function renderBlockHashLink(text: string, record: any): JSX.Element {
  return <a href={`/block/${record.hash}`}>{text}</a>;
}
