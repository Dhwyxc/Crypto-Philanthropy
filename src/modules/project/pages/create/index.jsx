import React from "react";
import { Button, Checkbox, Form, Input, Upload } from "antd";
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
  const uploadButton = (
    <div>
      {false ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
            link: "/webs",
          },
          {
            title: "Tạo dự án",
          },
        ]}
      />
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 12,
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
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <SingleImageUpload label="Logo" name="logo" isPreview="false" />
        <Form.Item
          label="Miêu tả"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProject;
