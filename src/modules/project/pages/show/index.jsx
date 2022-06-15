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
  Progress,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { height } from "tailwindcss/defaulttheme";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
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
    // console.log("chay get txs");
    if (!refOk.current) {
      getTxs();
    }
  }, [id, getTxByWallet, projectShow]);
  // console.log({ trans });

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const dataChart = useMemo(() => {
    const totalDonor = projectShow?.donor?.reduce((total, current) => {
      total += current?.amount;
      return total;
    }, 0);
    const totalOut = trans?.reduce((total, current) => {
      total += current?.value;
      return total;
    }, 0);
    return [totalOut, totalDonor];
  }, [trans, projectShow]);
  const dataProgress = useMemo(() => {
    const totalDonor = projectShow?.donor?.reduce((total, current) => {
      total += current?.amount;
      return total;
    }, 0);

    const percent = Math.round((totalDonor / projectShow?.target) * 100);
    return percent;
  }, [projectShow]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Địa chỉ nhận",
      dataIndex: "to",
      key: "to",
    },

    {
      title: "Số lượng",
      dataIndex: "value",
      key: "value",
      render: (txt) => <span>{ethers.utils.formatEther(txt)}</span>,
      sorter: (a, b) => a.value - b.value,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (txt, record) => (
        <span>{moment(txt).format("DD/MM/YYYY H:m:s")}</span>
      ),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      sortDirections: ["descend", "ascend"],
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Địa chỉ ví",
      dataIndex: "fromAddress",
      key: "fromAddress",
      ...getColumnSearchProps("fromAddress"),
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
      // ...getColumnSearchProps("value"),
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Lời nhắn",
      dataIndex: "message",
      key: "message",
      render: (txt) => <span>{txt}</span>,
    },

    {
      title: "Thời gian",
      // width: 200,
      dataIndex: "date",
      key: "date",
      // render: (txt) => <span>{txt}</span>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["descend", "ascend"],
      render: (txt, record) => (
        <span>{moment(txt).format("DD/MM/YYYY H:m:s")}</span>
      ),
    },
    {
      title: "Transaction Hash",
      // width: 520,
      dataIndex: "txHash",
      key: "txHash",
      render: (txt) => <a href={txt}> {txt}</a>,
    },
  ];
  const data = {
    labels: ["Đã chuyển đi(ETH)", "Còn lại(ETH)"],
    datasets: [
      {
        label: "charity",
        data: dataChart,
        backgroundColor: ["rgba(46, 204, 113, 1)", "rgba(247, 202, 24, 0.8)"],
        borderColor: ["rgba(30, 130, 76,  1)", "rgba(189, 155, 25, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Layout>
      <Modal
        title="Quyên góp"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={"Tên của bạn"} name="name">
            {/* <Input /> */}
            <Input />
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
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Lời nhắn để lại" name="message">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
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
            link: "/project",
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
      <div className="flex justify-between items-center">
        <div className="w-full">
          <img
            alt=""
            className="w-full h-[500px] rounded-xl"
            src={projectShow?.logo}
          />
          <h1 className="text-2xl mt-5">
            Tiến độ hoàn thành dự án từ thiện: {" "}
            {`${dataChart[1]}/${projectShow?.target}`}{"(ETH)"}
          </h1>
          <Progress trailColor="#ccc" percent={dataProgress} />
        </div>
        <div className="w-[35%]">
          <Doughnut data={data} />
        </div>
      </div>

      <h1 className="text-black text-2xl mt-5">Miêu tả về dự án này</h1>
      <p className="text-black text-lg">{projectShow?.desc}</p>

      <h1 className="text-2xl mt-5">Danh sách số tiền đã chuyển đi</h1>
      <Table
        dataSource={trans}
        columns={columns}
      />
      <h1 className="text-2xl mt-5">Danh sách quyên góp</h1>
      <Table
        dataSource={projectShow?.donor}
        columns={columns2}
      />
    </Layout>
  );
};

export default ShowProject;
