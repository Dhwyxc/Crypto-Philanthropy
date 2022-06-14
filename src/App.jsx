import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./App.css";
import Footer from "@components/Footer";
// import Header from "@components/Header";
import { Layout, Menu, Breadcrumb, Result, Button, Tabs, Table } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
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

  const darkMode = useAppSelector((state) => state.dark.isDark);
  return (
    <div className={`${darkMode ? "dark" : ""} h-full`}>
      <div className="dark:bg-[#121212] bg-primary text-gray-50 transition-colors h-full">
        <LazyMotion features={loadFeatures} strict>
          <div style={{ position: "absolute" }} id="back-to-top-anchor" />
          <div className="flex flex-col flex-auto h-full min-h-0">
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Dashboard
                  </Menu.Item>
                  {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Dự án
                  </Menu.Item> */}
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Dự án">
                    <Menu.Item key="4">
                      <Link to={`/project`}>Tất cả dự án</Link>
                    </Menu.Item>
                    <Menu.Item key="5">Dự án của tôi</Menu.Item>
                    <Menu.Item key="6">
                      <Link to={`/project/create`}>Tạo dự án</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Code">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9" icon={<FileOutlined />}>
                    Xem thống kê tất cả
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className="header">
                  <div className="logo" />
                  <Menu
                    // items={
                    //   <Menu.Item key="1" icon={<PieChartOutlined />}>
                    //     Option 1
                    //   </Menu.Item>
                    // }
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                  />
                </Header>
                <Content style={{ margin: "0 16px" }} className="p-3">
                  {false && (
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
                            title="Yay! Thành công, đi đến bảng điều khiển ngay!"
                            subTitle={`[Your Address]${account}, [Your Balance]${balance}`}
                            extra={[
                              <Button type="primary" key="console">
                                Đi đến bảng điều khiển
                              </Button>,
                              <Button key="buy">Quay lại</Button>,
                            ]}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <GetRoutes />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  ©2022 Created by NNN
                </Footer>
              </Layout>
            </Layout>

            {/* <Footer /> */}
          </div>
          <ToastContainer />
          <ScrollToTop />
          <ReactQueryDevtools initialIsOpen />
        </LazyMotion>
      </div>
    </div>
  );
}

export default App;
