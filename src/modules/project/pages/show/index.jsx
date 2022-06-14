import CustomePageHeader from "@components/CustomePageHeader";
import { useAppSelector } from "@hooks/reduxHook";
import useAccount from "@modules/charity/hooks/useAccount";
import useAddCharity from "@modules/project/hooks/mutate/useAddCharity";
import useGetProject from "@modules/project/hooks/query/useGetProject";
import dataProject from "@modules/project/mock";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Table,
} from "antd";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";

const ShowProject = () => {
  const { id } = useParams();
  console.log(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const addressWallet = useAppSelector((s) => s?.auth?.address);
  const { data: projects } = useGetProject();
  const projectShow = useMemo(() => {
    return projects?.find((e) => e._id === id);
  }, [id, projects]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const proj = dataProject?.find((e) => e.id == id);
  console.log(proj);

  const [trans, setTrans] = useState([]);
  const { charityDeposit, getTxByWallet } = useAccount();
  const refOk = useRef(false);
  useEffect(() => {
    const getTxs = async () => {
      if (refOk.current) {
        return;
      }
      const rs = await getTxByWallet(projectShow?.ownerAddress);
      setTrans(rs);
      refOk.current = true;
    };
    console.log("chay get txs");
    if (!refOk.current) {
      getTxs();
    }
  }, [id, getTxByWallet, projectShow]);
  console.log({ trans });

  const [form] = Form.useForm();
  // const ethValue = Form.useWatch("eth", form);
  const { mutate: donate } = useAddCharity(id);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const ethF = ethers.utils.parseEther("" + values.eth);
    // alert(ethF);
    // return;
    const receipt = await charityDeposit(
      ethF,
      values.message,
      projectShow?.ownerAddress
    );
    const dataForm = {
      name: values?.name || "Anonymous",
      currency: "ETH",
      amount: values.eth,
      message: values.message,
      date: new Date(),
      txHash: receipt?.transactionHash,
      fromAddress: addressWallet,
    };
    donate(dataForm, {
      onSuccess: () => {
        message.success("Thành công");
      },
    });
    console.log("headd", receipt);
  };
  // ethers.utils.formatEther(balance);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const columns = [
    {
      title: "Địa chỉ nhận",
      dataIndex: "to",
      key: "to",
    },

    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      render: (txt) => <span>{ethers.utils.formatEther(txt)}</span>,
    },
    {
      title: "Transaction Hash",
      dataIndex: "hash",
      key: "hash",
      render: (txt) => <span>{txt}</span>,
    },
  ];
  const columns2 = [
    {
      title: "Tên người donate",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ ví",
      dataIndex: "fromAddress",
      key: "fromAddress",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (txt, record) => (
        <span>
          {txt} {record?.currency}
        </span>
      ),
    },
    {
      title: "Message để lại",
      dataIndex: "message",
      key: "message",
      render: (txt) => <a href={txt}>{txt}</a>,
    },

    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render: (txt) => <a href={txt}>{txt}</a>,
    },
    {
      title: "Transaction Hash",
      dataIndex: "txHash",
      key: "txHash",
      render: (txt) => <a href={txt}>{txt?.substring(0, 10)} ...</a>,
    },
  ];

  return (
    <div>
      <Modal
        title="Quyên góp"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          //   wrapperCol={{
          //     span: 16,
          //   }}
          //   initialValues={{
          //     remember: true,
          //   }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={"Tên của bạn"} name="name">
            {/* <Input /> */}
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={"Số lượng ETH"}
            name="eth"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số ETH muốn quyên góp",
              },
            ]}
          >
            {/* <Input /> */}
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Lời nhắn để lại"
            name="message"
            rules={[
              {
                required: true,
                message: "Vui lòng để lại lời nhắn",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Quyên góp
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CustomePageHeader
        title={`Dự án`}
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
            title: projectShow?.name,
          },
        ]}
        extra={
          <>
            <Button type="primary" onClick={showModal}>
              Quyên góp
            </Button>
          </>
        }
      />
      <img alt="" className="w-full h-[300px]" src={projectShow?.logo} />
      <h1>Miêu tả về dự án này</h1>
      <p className="text-black">{projectShow?.desc}</p>
      <h1 className="text-2xl">Danh sách tổ chức nhận được donate</h1>
      <Table
        scroll={{
          y: 240,
        }}
        dataSource={trans}
        columns={columns}
      />
      <h1 className="text-2xl">Danh sách tổ chức donate</h1>
      <Table dataSource={projectShow?.donor} columns={columns2} />
    </div>
  );
};

export default ShowProject;
