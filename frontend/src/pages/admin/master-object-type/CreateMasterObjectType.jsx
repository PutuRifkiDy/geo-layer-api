import { Button, Input, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { createObjectType } from "../../../api/object-type";
import TextArea from "antd/es/input/TextArea";

function CreateMasterObjectType() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconMarker, setIconMarker] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const uploadIconMarker = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      setIconMarker(file);
      console.log(file);

      return false; // Mencegah upload otomatis dan simpan url dummy
    },

    onRemove: () => {
      setIconMarker("");
    }
  }

  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message
    });
  }

  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  }

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (iconMarker) {
        formData.append("icon_marker", iconMarker);
      }

      const response = await createObjectType(formData);

      if (response.status === "berhasil") {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard/master-object-types');
        }, 1000);
        success(response.message || "Object type berhasil dibuat");
      } else {
        setIsLoading(false);
        error(response.message || "Gagal membuat object type baru");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error membuat object type:", error);
      error("Terjadi kesalahan saat membuat object type");
    }
  }

  return (
    <DashboardLayout>
      {contextHolder}
      <form className="mt-8 space-y-5" onSubmit={onHandleSubmit}>
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Tambah Object Type Baru</h2>
            <p className="text-sm text-gray-500">Masukkan informasi object type baru di bawah ini.</p>
          </div>
          <Link to="/dashboard/master-object-types">
            <Button type="default">
              Kembali ke Daftar Object Type
            </Button>
          </Link>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nama <span className="text-red-500">*</span></label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              className='px-2 py-2'
              placeholder='Masukkan nama object type'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Deskripsi <span className="text-red-500">*</span></label>
            <TextArea
              id="description"
              name="description"
              type="text"
              required
              value={description}
              onChange={handleDescriptionChange}
              placeholder='Masukkan deskripsi object type'
              className='w-full px-2 py-2'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Marker <span className="text-red-500">*</span></label>
            <Dragger {...uploadIconMarker}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Klik atau seret file ke area ini untuk mengunggah</p>
              <p className="ant-upload-hint">
                Hanya mendukung unggahan file tunggal (format gambar). Digunakan sebagai penanda ikon pada peta.
              </p>
            </Dragger>
          </div>
        </div>

        <Button
          htmlType='submit'
          type="primary"
          className='w-full px-2 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-600'>
          {isLoading ? 'Memproses...' : 'Submit'}
        </Button>
      </form>
    </DashboardLayout>
  );
}

export default CreateMasterObjectType;