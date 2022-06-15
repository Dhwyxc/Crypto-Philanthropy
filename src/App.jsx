import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./App.css";
import Footer from "@components/Footer";
// import Header from "@components/Header";
import { Layout, Menu, Breadcrumb, Result, Button, Tabs, Table } from "antd";
import {
  DesktopOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ScrollToTop } from "@components/ScrollToTop";
import GetRoutes from "@routes/GetRoutes";
import { LazyMotion } from "framer-motion";
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import { useAppSelector } from "@hooks/reduxHook";
import useAccount from "@modules/charity/hooks/useAccount";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Content, Sider, Header } = Layout;
const loadFeatures = () =>
  import("./config/framer-motion").then((res) => res.default);
function App() {
  const { account, balance } = useAccount();
  return (
    <LazyMotion features={loadFeatures} strict>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <Link to={``}>Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MoneyCollectOutlined />}>
              <Link to={`/project`}>Tất cả dự án</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to={`/project/me`}>Dự án của tôi</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<EditOutlined />}>
              <Link to={`/project/create`}>Tạo dự án từ thiện</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" 
        style={{ marginLeft: 200 }}
        >
          <Content
            style={{ minHeight: "100vh", padding: "30px" }}
            // className="p-3"
          >
            {/* {false && (
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <div>
                  {!account ? (
                    <Result
                      status="warning"
                      title="Hiện tại bạn chưa kết nối với chúng tôi, hệ thống sẽ tự động kết nối, vui lòng bấm vào nút bên dưới để tiếp tục!."
                      extra={
                        <Button type="primary" key="console">
                          Kết nối ngay!
                        </Button>
                      }
                    />
                  ) : (
                    <Result
                      status="success"
                      title="Kết nối thành công!"
                      subTitle={`[Your Address]${account}, [Your Balance]${balance}`}
                    />
                  )}
                </div>
              </div>
            )} */}
            <GetRoutes />
          </Content>
        </Layout>
      </Layout>
      <ReactQueryDevtools initialIsOpen />
    </LazyMotion>
  );
}

export default App;
