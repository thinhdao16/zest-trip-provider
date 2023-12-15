import React, { useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { useSelector } from "react-redux";
import { Form, Input } from "antd";

type SizeType = Parameters<typeof Form>[0]["size"];
const { TextArea } = Input;
function AccountSettings() {
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  console.log(personalInfo);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <React.Fragment>
      {/* <BannerContainer> */}
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg ">
        <div className="container mx-auto px-28 py-8 flex flex-col justify-center w-f">
          <div className="mb-6 flex items-center justify-center ">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Update Profile</h1>
              <span className="text-gray-500">
                When provider have booking new, they open here
              </span>
            </div>
          </div>
          <div className="text-center">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 700 }}
            >
              <Form.Item label="Company name">
                <Input />
              </Form.Item>
              <Form.Item label="Description">
                <TextArea />
              </Form.Item>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Service type">
                <Input />
              </Form.Item>{" "}
              <Form.Item label="Address country">
                <Input />
              </Form.Item>{" "}
              <Form.Item label="Address province">
                <Input />
              </Form.Item>{" "}
              <Form.Item label="Address ward">
                <Input />
              </Form.Item>{" "}
              <Form.Item label="Address name">
                <Input />
              </Form.Item>{" "}
              <Form.Item label="Tax code">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
