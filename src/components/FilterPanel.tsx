import React from "react";
import { Form, Select, InputNumber, Checkbox, Button, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const MODEL_OPTIONS = [
  { label: "530", value: "530" },
  { label: "X5", value: "X5" },
  { label: "320", value: "320" },
  { label: "320 Gran Turismo", value: "320 Gran Turismo" },
  { label: "M5", value: "M5" },
];

const VOLUME_OPTIONS = [
  { label: "3.0D", value: "3.0D" },
  { label: "2.0D", value: "2.0D" },
  { label: "4.4", value: "4.4" },
];

interface FilterPanelProps {
  onApply: (values: any) => void;
  height?: number; // optional fixed height for scroll
}

export default function FilterPanel({
  onApply,
  height = 730,
}: FilterPanelProps) {
  const [form] = Form.useForm();

  const defaultValues = {
    brand: "BMW",
    model: undefined,
    volume: undefined,
    yearFrom: undefined,
    yearTo: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    mileageFrom: undefined,
    mileageTo: undefined,
    onlyNew: false,
  };

  const handleApply = () => {
    form.validateFields().then((values) => onApply(values));
  };

  const handleClear = () => {
    form.resetFields();
    onApply(defaultValues);
  };

  return (
    <div
      style={{
        width: 280,
        height: height,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={defaultValues}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 16px",
        }}
      >
        <Title level={5} style={{ marginBottom: 12 }}>
          Filter Cars
        </Title>

        <Form.Item name="brand" label="Brand" style={{ marginBottom: 8 }}>
          <Select placeholder="Select Brand" size="middle" allowClear>
            <Option value="BMW">BMW</Option>
            <Option value="Audi">Audi</Option>
            <Option value="Both">Both</Option>
          </Select>
        </Form.Item>

        <Form.Item name="model" label="Model" style={{ marginBottom: 8 }}>
          <Select placeholder="Select Model" allowClear size="middle">
            {MODEL_OPTIONS.map((m) => (
              <Option key={m.value} value={m.value}>
                {m.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="volume" label="Volume" style={{ marginBottom: 8 }}>
          <Select placeholder="Select Volume" allowClear size="middle">
            {VOLUME_OPTIONS.map((v) => (
              <Option key={v.value} value={v.value}>
                {v.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="yearFrom"
          label="Year From"
          style={{ marginBottom: 8 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Min Year"
            size="middle"
          />
        </Form.Item>
        <Form.Item name="yearTo" label="Year To" style={{ marginBottom: 8 }}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Max Year"
            size="middle"
          />
        </Form.Item>

        <Form.Item
          name="priceFrom"
          label="Price From"
          style={{ marginBottom: 8 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Min Price"
            size="middle"
          />
        </Form.Item>
        <Form.Item name="priceTo" label="Price To" style={{ marginBottom: 8 }}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Max Price"
            size="middle"
          />
        </Form.Item>

        <Form.Item
          name="mileageFrom"
          label="Mileage From"
          style={{ marginBottom: 8 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Min Mileage"
            size="middle"
          />
        </Form.Item>
        <Form.Item
          name="mileageTo"
          label="Mileage To"
          style={{ marginBottom: 8 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Max Mileage"
            size="middle"
          />
        </Form.Item>

        <Form.Item
          name="onlyNew"
          valuePropName="checked"
          style={{ marginBottom: 8 }}
        >
          <Checkbox>Only New</Checkbox>
        </Form.Item>
      </Form>

      {/* Fixed Buttons at Bottom */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #f0f0f0",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={handleApply}
          style={{ flex: 1, marginRight: 8 }}
        >
          Apply
        </Button>
        <Button onClick={handleClear} style={{ flex: 1 }}>
          Clear
        </Button>
      </div>
    </div>
  );
}
