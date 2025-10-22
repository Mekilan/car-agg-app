import { Layout, Avatar, Dropdown, Menu, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logout, getCurrentUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="signout" onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001529",
        padding: "0 24px",
      }}
    >
      <Title level={3} style={{ color: "#fff", margin: 0 }}>
        Car Dashboard
      </Title>

      <Dropdown overlay={menu} placement="bottomRight" trigger={["hover"]}>
        <Avatar
          style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  );
}
