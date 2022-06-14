import CustomePageHeader from "@components/CustomePageHeader";
import dataProject from "@modules/project/mock";
import { Image, Table } from "antd";
import React from "react";
import { useParams } from "react-router";

const MeProject = () => {
  const { id } = useParams();
  console.log(id);
  const proj = dataProject?.find((e) => e.id == id);
  const columns2 = [
    {
      title: "Tên tự án",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ ví",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (txt) => <span>{txt} ETH</span>,
    },
    {
      title: "Message để lại",
      dataIndex: "message",
      key: "message",
      render: (txt) => <a href={txt}>{txt}</a>,
    },
  ];
  const dataSource2 = [
    {
      key: "1",
      name: "To chuc 1",
      amount: 1000,
      address: "0xe0E3053EBed807FAf0187A711ff8395BEB495366",
      trans: "Detail",
      message: "Ung ho neeeeeeeeeeeee",
    },
    {
      key: "2",
      name: "To chuc 2",
      amount: 2000,
      address: "0xKDMIIEd807FAf0187AMK1ff8395BEB495876",
      trans: "Detail",
      message: "Ung ho neeeeeeeeeeeee",
    },
  ];

  return (
    <div>
      <CustomePageHeader
        title={`Dự án của tôi`}
        breadcrumb={[
          {
            title: "Trang chủ",
            link: "/",
          },
          {
            title: "Dự án",
            link: "/webs",
          },
          {
            title: "Dự án của tôi",
          },
        ]}
      />
      <Table dataSource={dataSource2} columns={columns2} />
    </div>
  );
};

export default MeProject;
