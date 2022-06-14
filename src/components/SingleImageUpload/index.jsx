import { Form, message, Upload, Image } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { API_IMGBB_KEY } from "@config/axios";
const SingleImageUpload = (
  { label, name, isPreview = true, readOnly, ...rest },
  ref
) => {
  const [loading, setLoading] = useState(false);
  const [urlImage, setImageUrl] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      changeImage: (url) => {
        setImageUrl(url);
      },
    }),
    []
  );
  const getLink = (event) => {
    return event?.fileList[0]?.response?.data?.url;
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt32M = file.size / 1024 / 1024 < 32;
    if (!isLt32M) {
      message.error("Image must smaller than 32MB!");
    }
    return isJpgOrPng && isLt32M;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setImageUrl("");
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info?.file?.response?.data?.url);

      setLoading(false);
    }
  };
  return (
    <Form.Item
      getValueProps={(v) => setImageUrl(v)}
      {...rest}
      getValueFromEvent={getLink}
      {...{ name, label }}
    >
      <Upload
        disabled={readOnly}
        method="POST"
        maxCount={1}
        value="image"
        accept="image/*"
        action={`https://api.imgbb.com/1/upload?key=${API_IMGBB_KEY}`}
        // action={`http://localhost:6001/api/upload`}
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {urlImage ? (
          isPreview ? (
            <Image src={urlImage} />
          ) : (
            <img
              src={urlImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="s"
            />
          )
        ) : (
          // <img src={urlImage} alt="avatar" style={{ width: "100%" }} />
          uploadButton
        )}
      </Upload>
    </Form.Item>
  );
};

export default forwardRef(SingleImageUpload);
