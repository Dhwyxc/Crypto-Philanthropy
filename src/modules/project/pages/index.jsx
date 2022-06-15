import CustomePageHeader from "@components/CustomePageHeader";
import Layout from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import CardProject from "../components/CardProject";
import useGetProject from "../hooks/query/useGetProject";

const ProjectHome = () => {
  const { data: project } = useGetProject();
  return (
    <Layout>
      <CustomePageHeader
        title={`Tất cả dự án`}
        breadcrumb={[
          {
            title: "Trang chủ",
            link: "/",
          },
          {
            title: "Dự án",
            link: "/project",
          },
        ]}
      />
      <div className="grid grid-cols-3 gap-10 mb-10">
        {project?.map((e, i) => {
          return (
            <CardProject key={i} {...e} />
          );
        })}
      </div>
    </Layout>
  );
};

export default ProjectHome;
