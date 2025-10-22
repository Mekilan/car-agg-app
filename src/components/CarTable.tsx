import React, { useMemo, useState } from "react";
import {
  Table,
  Avatar,
  Dropdown,
  Tooltip,
  Typography,
  Space,
  Tag,
  theme,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import CommentModal from "./CommentModal";
import type { Car } from "../types";

const { Text, Link } = Typography;

export default function CarTable({
  data = [],
  onStatusChange,
  onCommentSave,
}: any) {
  const [commentRow, setCommentRow] = useState<Car | null>(null);
  const [commentVisible, setCommentVisible] = useState(false);

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        render: (_: any, __: any, index: number) => <Text>{index + 1}</Text>,
        width: 50,
        align: "center",
        sorter: (a: Car, b: Car) => a.carId - b.carId,
      },
      {
        title: "Image",
        dataIndex: "pictureUrl",
        key: "pic",
        render: (url: string) => (
          <Avatar
            shape="square"
            size={56}
            src={url}
            style={{
              borderRadius: 8,
              objectFit: "cover",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
        ),
        width: 80,
        align: "center",
        fixed: "left",
      },
      {
        title: "Brand",
        dataIndex: "company",
        key: "company",
        sorter: (a: Car, b: Car) => a.company.localeCompare(b.company),
        render: (text: string) => (
          <Text strong style={{ color: "#0047ab" }}>
            {text}
          </Text>
        ),
        width: 100,
        align: "center",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
        sorter: (a: Car, b: Car) => a.model.localeCompare(b.model),
        render: (text: string) => (
          <Tag color="blue" style={{ fontSize: 13, padding: "2px 6px" }}>
            {text}
          </Tag>
        ),
        width: 100,
        align: "center",
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
        align: "center",
        width: 80,
        sorter: (a: Car, b: Car) => a.year - b.year,
      },
      {
        title: "Volume",
        dataIndex: "volume",
        key: "volume",
        align: "center",
        width: 90,
      },
      {
        title: "Mileage (km)",
        dataIndex: "mileage",
        key: "mileage",
        sorter: (a: Car, b: Car) => (a.mileage || 0) - (b.mileage || 0),
        render: (m: number | null) => (
          <Text>{m != null ? m.toLocaleString("en-US") : "—"}</Text>
        ),
        align: "center",
        width: 110,
      },
      {
        title: "Price (€)",
        dataIndex: "price",
        key: "price",
        sorter: (a: Car, b: Car) => (a.price || 0) - (b.price || 0),
        render: (p: number | null) => (
          <Text strong style={{ color: "#16a34a", fontSize: 14 }}>
            €
            {p != null
              ? p.toLocaleString("en-US", { minimumFractionDigits: 2 })
              : "—"}
          </Text>
        ),
        align: "center",
        width: 130,
      },
      {
        title: "Title / Link",
        dataIndex: "detailsUrl",
        key: "details",
        width: 180,
        render: (url: string, record: Car) => (
          <Space
            direction="vertical"
            size={0}
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Text
              style={{
                color: "#333",
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              ellipsis={{ tooltip: record.title }}
            >
              {record.title}
            </Text>
            {url && (
              <Link
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                View details
              </Link>
            )}
          </Space>
        ),
      },
      {
        title: "Status",
        dataIndex: "isNew",
        key: "status",
        align: "center",
        width: 80,
        filters: [
          { text: "New", value: true },
          { text: "Read", value: false },
        ],
        onFilter: (value: any, record: Car) => record.isNew === value,
        render: (isNew: boolean) =>
          isNew ? (
            <Tag color="green" style={{ fontWeight: 600, fontSize: 12 }}>
              New
            </Tag>
          ) : (
            <Tag color="default" style={{ fontSize: 12 }}>
              Read
            </Tag>
          ),
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        fixed: "right",
        width: 90,
        render: (_: any, record: Car) => {
          const items = [
            record.isNew
              ? { key: "markRead", label: "Mark as Read" }
              : { key: "markNew", label: "Mark as New" },
            { key: "comment", label: "Add Comment" },
          ];

          return (
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === "comment") {
                    setCommentRow(record);
                    setCommentVisible(true);
                  } else if (key === "markRead") {
                    onStatusChange(record.carId, false);
                  } else if (key === "markNew") {
                    onStatusChange(record.carId, true);
                  }
                },
              }}
              trigger={["click"]}
            >
              <Tooltip title="More actions">
                <MoreOutlined
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    color: "#1677ff",
                  }}
                />
              </Tooltip>
            </Dropdown>
          );
        },
      },
    ],
    [onStatusChange]
  );

  return (
    <>
      <Table
        rowKey={(r: Car) => r.carId}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10, size: "small" }}
        bordered={false}
        scroll={{ y: 550 }}
        style={{
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
        size="small" // reduces padding automatically
        rowClassName={(record: Car) =>
          record.isNew ? "row-new highlight-row" : ""
        }
        tableLayout="fixed"
      />

      <CommentModal
        visible={commentVisible}
        initial={commentRow?.comment}
        onCancel={() => setCommentVisible(false)}
        onSave={(val: string) => {
          if (commentRow) onCommentSave(commentRow.carId, val);
          setCommentVisible(false);
        }}
      />
    </>
  );
}
