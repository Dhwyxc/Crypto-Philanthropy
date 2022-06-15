import CustomePageHeader from "@components/CustomePageHeader";
import { useAppSelector } from "@hooks/reduxHook";
import CardProject from "@modules/project/components/CardProject";
import useGetProject from "@modules/project/hooks/query/useGetProject";
import dataProject from "@modules/project/mock";
import { Image, Layout, Table } from "antd";
import React from "react";
import { useParams } from "react-router";

const MeProject = () => {
  const { id } = useParams();
  console.log("a", id);
  const myAddrress = useAppSelector((s) => s?.auth?.address);
  // alert(myAddrress);
  const { data: projectss } = useGetProject();
  const project = projectss?.filter((e) => e.ownerAddress === myAddrress);

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
            link: "/project",
          },
          {
            title: "Dự án của tôi",
            link: "/project/me",
          },
        ]}
      />
      <div className="grid grid-cols-3 gap-10 mb-10">
        {project?.map((e, i) => {
          return <CardProject key={i} {...e} />;
        })}
      </div>
    </div>
  );
};

export default MeProject;
