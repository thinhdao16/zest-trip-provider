import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { useSelector } from "react-redux";
import { Form, Input } from "antd";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { editProfile } from "../../store/redux/silce/authSilce";
import {
  createProviderAvt,
  createProviderBanner,
} from "../../store/redux/silce/providerSlice";

type SizeType = Parameters<typeof Form>[0]["size"];
const { TextArea } = Input;
function AccountSettings() {
  const dispatch: AppDispatch = useDispatch();
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const [personalInfoEdit, setPersonalInfoEdit] = useState(personalInfo);
  const [fileListAvt, setFileListAvt] = useState([]);

  const [fileListBanner, setFileListBanner] = useState([]);

  const [openEditAvt, setOpenEditAvt] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  console.log(fileListAvt);
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFileListAvt(selectedFile);
  };
  const handleFileChangeBanner = (event: any) => {
    const selectedFile = event.target.files[0];
    setFileListBanner(selectedFile);
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setPersonalInfoEdit({
      ...personalInfoEdit,
      [fieldName]: value,
    });
  };

  const handleEditProfile = () => {
    dispatch(editProfile(personalInfoEdit));
    if (fileListAvt?.length !== 0) {
      dispatch(createProviderAvt(fileListAvt));
    }
    if (fileListBanner?.length !== 0) {
      dispatch(createProviderBanner(fileListBanner));
    }
  };

  const handleOpenEdit = (field: string) => {
    if (field === "avt") {
      setOpenEditAvt(true);
    }
    if (field === "banner") {
      setOpenEditBanner(true);
    }
  };

  const handleCloseEdit = (field: string) => {
    if (field === "avt") {
      setOpenEditAvt(false);
      setFileListAvt([]);
    }
    if (field === "banner") {
      setOpenEditBanner(false);
      setFileListBanner([]);
    }
  };

  useEffect(() => {
    setPersonalInfoEdit(personalInfo);
  }, [personalInfo]);
  return (
    <React.Fragment>
      {/* <BannerContainer> */}
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg ">
        <div className="container mx-auto px-28 py-8 flex flex-col justify-center w-4/5">
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
                <Input
                  readOnly
                  value={personalInfoEdit?.company_name}
                  onChange={(e) =>
                    handleInputChange("company_name", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Description">
                <TextArea
                  value={personalInfoEdit?.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  value={personalInfoEdit?.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input readOnly value={personalInfoEdit?.email} />
              </Form.Item>
              <Form.Item label="Service type">
                <Input
                  value={personalInfoEdit?.service_type}
                  onChange={(e) =>
                    handleInputChange("service_type", e.target.value)
                  }
                />
              </Form.Item>{" "}
              <Form.Item label="Address country">
                <Input
                  value={personalInfoEdit?.address_country}
                  onChange={(e) =>
                    handleInputChange("address_country", e.target.value)
                  }
                />
              </Form.Item>{" "}
              <Form.Item label="Address province">
                <Input
                  value={personalInfoEdit?.address_province}
                  onChange={(e) =>
                    handleInputChange("address_province", e.target.value)
                  }
                />
              </Form.Item>{" "}
              <Form.Item label="Address ward">
                <Input
                  value={personalInfoEdit?.address_ward}
                  onChange={(e) =>
                    handleInputChange("address_ward", e.target.value)
                  }
                />
              </Form.Item>{" "}
              <Form.Item label="Address name">
                <Input
                  value={personalInfoEdit?.address_name}
                  onChange={(e) =>
                    handleInputChange("address_name", e.target.value)
                  }
                />
              </Form.Item>{" "}
              <Form.Item label="Tax code">
                <Input
                  type="number"
                  value={personalInfoEdit?.tax_code}
                  onChange={(e) =>
                    handleInputChange("tax_code", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Business license">
                <div className="bg-white rounded-md p-1">
                  <a
                    className="text-blue-500 bg-white w-full"
                    href={personalInfoEdit?.business_license}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(personalInfoEdit?.business_license, "_blank");
                    }}
                  >
                    See File
                  </a>
                </div>
              </Form.Item>
              {!openEditAvt ? (
                <Form.Item label="Avatar">
                  <div className="relative w-fit">
                    <img
                      src={personalInfoEdit?.avatar_image_url}
                      className="w-32 h-32 rounded-md object-cover "
                      alt=""
                    />
                    <button
                      className=" absolute top-1 right-2 text-blue-600 bg-white px-0.5 rounded-sm"
                      onClick={() => handleOpenEdit("avt")}
                    >
                      Edit
                    </button>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item label="Upload">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={handleFileChange}
                    />
                    <button
                      className="text-red-600"
                      onClick={() => handleCloseEdit("avt")}
                    >
                      {" "}
                      Close
                    </button>
                  </div>
                </Form.Item>
              )}
              {!openEditBanner ? (
                <Form.Item label="Banner">
                  <div className="relative w-fit">
                    <img
                      src={personalInfoEdit?.banner_image_url}
                      className="w-full h-32 rounded-md object-cover"
                      alt=""
                    />
                    <button
                      type="button"
                      className=" absolute top-1 right-2 text-blue-600 bg-white px-0.5 rounded-sm"
                      onClick={() => handleOpenEdit("banner")}
                    >
                      Edit
                    </button>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item label="Upload">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={handleFileChangeBanner}
                    />
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => handleCloseEdit("banner")}
                    >
                      Close
                    </button>
                  </div>
                </Form.Item>
              )}
              <button
                type="button"
                onClick={handleEditProfile}
                className="bg-navy-blue p-1 rounded-md text-white"
              >
                Save changes
              </button>
            </Form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
