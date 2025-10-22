import { useState, useEffect } from "react";
import {
  Layout,
  Spin,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Typography,
  Input,
  Select,
  InputNumber,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CarTable from "../components/CarTable";
import FilterPanel from "../components/FilterPanel";
import AppHeader from "../components/AppHeader";
import { useCarData } from "../hooks/useCarData";
import type { Car } from "../types";

const { Sider, Content } = Layout;
const { Text } = Typography;
const LOCAL_STORAGE_KEY = "cars_data";
const REFRESH_INTERVAL_MINUTES = 5; // 5 minutes
const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MINUTES * 60;

export default function Dashboard() {
  const { cars, loading, filter, setFilter, setCars, addCar } = useCarData({
    brand: "BMW",
  });

  const [collapsed, setCollapsed] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [nextRefreshSeconds, setNextRefreshSeconds] = useState(
    REFRESH_INTERVAL_SECONDS
  );

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(1, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Auto-refresh cars from localStorage
  useEffect(() => {
    const refreshData = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed: Car[] = JSON.parse(saved);
          setCars(parsed);
          setLastRefresh(new Date());
          setNextRefreshSeconds(REFRESH_INTERVAL_SECONDS);
        } catch (err) {
          console.error("Failed to parse cars from localStorage:", err);
        }
      }
    };

    refreshData(); // initial fetch

    // Countdown timer
    const countdown = setInterval(() => {
      setNextRefreshSeconds((prev) => {
        if (prev <= 1) {
          refreshData();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [setCars]);

  const handleFilterApply = (values: any) => setFilter(values);

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const newCar: Car = {
        company: values.brand,
        carId: Date.now().toString(),
        model: values.model,
        volume: values.volume,
        year: values.year,
        price: values.price,
        mileage: values.mileage,
        isNew: values.onlyNew || false,
        pictureUrl: values.pictureUrl || "",
        title: values.title || `${values.brand} ${values.model}`,
        detailsUrl: values.detailsUrl || "",
        comment: "",
      };
      addCar(newCar);
      setCreateModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Layout>
        {/* Left collapsible filter panel */}
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={300}
          style={{ background: "#fff", padding: "12px", overflowY: "auto" }}
        >
          <FilterPanel onApply={handleFilterApply} />
        </Sider>

        <Layout style={{ padding: "16px" }}>
          <Content>
            {/* Top row: create button + refresh info */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 16 }}
            >
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateModalVisible(true)}
                >
                  Create Car
                </Button>
              </Col>
              <Col style={{ textAlign: "right" }}>
                {lastRefresh && (
                  <Text type="secondary" style={{ marginRight: 16 }}>
                    Last refreshed: {lastRefresh.toLocaleTimeString()}
                  </Text>
                )}
                <Text type="success">
                  Next refresh in: {formatTime(nextRefreshSeconds)}
                </Text>
              </Col>
            </Row>

            {/* Car Table */}
            <div style={{ borderRadius: 8, background: "#fff", padding: 8 }}>
              {loading ? (
                <Spin size="large" tip="Loading cars..." />
              ) : (
                <CarTable
                  data={cars}
                  onStatusChange={(id: string, isNew: boolean) =>
                    setCars((prev) =>
                      prev.map((c) => (c.carId === id ? { ...c, isNew } : c))
                    )
                  }
                  onCommentSave={(id: string, comment: string) =>
                    setCars((prev) =>
                      prev.map((c) => (c.carId === id ? { ...c, comment } : c))
                    )
                  }
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Create Car Modal */}
      <Modal
        title="Create New Car"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        onOk={handleCreate}
        okText="Create"
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Car ID"
                name="carId"
                rules={[
                  { required: true, message: "Please enter Car ID" },
                  {
                    pattern: /^[a-zA-Z0-9_-]+$/,
                    message: "Only letters, numbers, _ or - allowed",
                  },
                ]}
              >
                <Input
                  placeholder="Enter unique Car ID"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Brand">
                  <Select.Option value="BMW">BMW</Select.Option>
                  <Select.Option value="Audi">Audi</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Model"
                name="model"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Model">
                  <Option value="330i">330i</Option>
                  <Option value="X5">X5</Option>
                  <Option value="A4">A4</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Volume" name="volume">
                <Select placeholder="Select Volume">
                  <Option value="2.0T">2.0T</Option>
                  <Option value="3.0T">3.0T</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Year"
                name="year"
                rules={[
                  { required: true, message: "Enter year" },
                  { pattern: /^\d{4}$/, message: "Enter 4-digit year" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Year"
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mileage"
                name="mileage"
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Mileage" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="onlyNew" valuePropName="checked" label=" ">
                <Checkbox>New Car</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Picture URL" name="pictureUrl">
                <Input
                  placeholder="https://example.com/image.jpg"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Details URL" name="detailsUrl">
                <Input
                  placeholder="https://example.com/details"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Layout>
  );
}
