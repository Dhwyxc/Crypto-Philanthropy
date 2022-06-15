import React from "react";
import { Button, Checkbox, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CustomePageHeader from "@components/CustomePageHeader";
import useCreateProject from "@modules/project/hooks/mutate/useCreateProject";
import { useAppSelector } from "@hooks/reduxHook";
import SingleImageUpload from "@components/SingleImageUpload";
import { useNavigate } from "react-router";
const CreateProject = () => {
  const { mutate: create } = useCreateProject();
  const addressWallet = useAppSelector((s) => s?.auth?.address);
  const nav = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    create(
      { ...values, ownerAddress: addressWallet },
      {
        onSuccess: () => {
          nav("/project");
        },
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const uploadButton = (
  //   <div>
  //     {false ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );
  return (
    <>
      <CustomePageHeader
        title={`Tạo dự án`}
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
            title: "Tạo dự án",
          },
        ]}
      />
      <Form
        name="basic"
        labelCol={{
          span:5,
        }}
        wrapperCol={{
          span: 15,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên dự án"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên dự án từ thiện!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <SingleImageUpload label="Ảnh" name="logo" isPreview="false" style={{ width:"100%"}}/>
        <Form.Item
          label="Số tiền kêu gọi"
          name="target"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số tiền dự án từ thiện kêu gọi!",
            },
          ]}
        >
          <InputNumber min={10} style={{ width:"100%" }}/>
        </Form.Item>
        <Form.Item
          label="Miêu tả"
          name="desc"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập miêu tả về dự án từ thiện!",
            },
          ]}
        >
          <Input.TextArea style={{ height:"300px" }}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProject;
