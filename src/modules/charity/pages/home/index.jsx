import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Breadcrumb, Result, Button, Tabs, Table } from "antd";
import useAccount from "../../hooks/useAccount";
import { ethers } from "ethers";
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const HomePage = () => {
  const { account, balance, getAllCharity, charities } = useAccount();
  useEffect(() => {
    setInterval(() => {
    }, 3000);
  }, [getAllCharity]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
            <Tabs defaultActiveKey="1" onChange={() => {}}>
              <TabPane tab="Kết nối" key="1">
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
                    title="Kết nối ví thành công!"
                    subTitle={`[Your Address]${account}, [Your Balance]${balance}`}
                  />
                )}
              </TabPane>
            </Tabs>
    </Layout>
  );
};

export default HomePage;
