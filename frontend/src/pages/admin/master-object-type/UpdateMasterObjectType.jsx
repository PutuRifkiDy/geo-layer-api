import { Button, Input, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getObjectTypeById, updateObjectType } from "../../../api/object-type";
import { useEffect, useState } from "react";
import Dragger from "antd/es/upload/Dragger";

export default function UpdateMasterObjectType() {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const navigate = useNavigate();

  const [objectType, setObjectType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconMarker, setIconMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const uploadIconMarker = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      setIconMarker(file);
      return false;
    },
    onRemove: () => {
      setIconMarker(objectType?.icon_marker || null);
    }
  };

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

  const fetchObjectTypeData = async () => {
    try {
      const response = await getObjectTypeById(id);
      if (response.status === "berhasil") {
        setObjectType(response.data.objectType);
        setName(response.data.objectType.name);
        setDescription(response.data.objectType.description);
        setIconMarker(response.data.objectType.icon_marker);
      }
    } catch (error) {
      console.error("Error ambil data object type:", error);
    }
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

      const response = await updateObjectType(id, formData);

      if (response.status === "berhasil") {
        setIsLoading(false);

        setTimeout(() => {
          navigate('/dashboard/master-object-types');
        }, 1000);

        success(response.message || "Object Type berhasil diperbarui");
      } else {
        setIsLoading(false);
        error(response.message || "Gagal memperbarui object type");
      }
    } catch (error) {
      console.log("Error update object type:", error);
      error("Terjadi kesalahan saat memperbarui object type");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchObjectTypeData();
  }, [id]);

  return (
    <DashboardLayout>
      {contextHolder}
      {objectType && (
        <form className="mt-8 space-y-5" onSubmit={onHandleSubmit}>
          <div className="flex justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Update Object Type</h2>
              <p className="text-sm text-gray-500">Masukkan informasi object type yang ingin diperbarui.</p>
            </div>

            <Link to="/dashboard/master-object-types">
              <Button type="default">Kembali</Button>
            </Link>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name <span className="text-red-500">*</span></label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                className='px-2 py-2'
                placeholder='Masukkan name'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description <span className="text-red-500">*</span></label>
              <Input
                id="description"
                name="description"
                type="text"
                required
                value={description}
                onChange={handleDescriptionChange}
                className='px-2 py-2'
                placeholder='Masukkan description'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="icon_marker">Icon Marker <span className="text-red-500">*</span></label>

              {typeof iconMarker === 'string' && iconMarker !== "" && (
                <div className="mb-3 text-sm text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
                  <strong>File saat ini:</strong> {iconMarker} <br />
                  <span className="text-gray-500 text-xs">Biarkan kosong jika tidak ingin mengubah gambar. Upload file baru untuk menimpa.</span>
                </div>
              )}

              <Dragger {...uploadIconMarker}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Klik atau seret file ke area ini untuk mengunggah gambar baru</p>
                <p className="ant-upload-hint">
                  Hanya mendukung unggahan file tunggal (format gambar). Digunakan sebagai penanda ikon pada peta.
                </p>
              </Dragger>
            </div>
          </div>

          {/* Tombol Submit Dummy (Silakan diatur loading state-nya nanti saat submit) */}
          <Button
            htmlType='submit'
            type="primary"
            className='w-full px-2 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-600'>
            {isLoading ? 'Memproses...' : 'Simpan Perubahan'}
          </Button>
        </form>
      )}
    </DashboardLayout>
  );
}