import React from "react";
import { Tag } from "antd";

export default function StatusTag({ isNew }: { isNew: boolean }) {
  return (
    <Tag color={isNew ? "green" : "default"}>{isNew ? "New" : "Read"}</Tag>
  );
}
