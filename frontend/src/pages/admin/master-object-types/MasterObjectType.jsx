import { useState } from "react";
import { Button, Input, Table, Popconfirm, message, Modal } from "antd";
import { SearchOutlined, QuestionCircleOutlined, EyeOutlined } from '@ant-design/icons';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { deleteObjectType, getObjectTypes } from "../../../api/object-types";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = "http://localhost:4000/images";

function MasterObjectType() {
  const [masterObjectTypes, setMasterObjectTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onSearchChange = (event) => {
    setSearch(event.target.value);
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

  const showModal = (imageFileName) => {
    setPreviewImage(`${BASE_IMAGE_URL}/${imageFileName}`);
    setIsModalOpen(true);
  }

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setPreviewImage("");
  };

  const filteredData = masterObjectTypes.filter((item) => {
    const cocokName = item.name.toLowerCase().includes(search.toLowerCase());
    const cocokDescription = item.description.toLowerCase().includes(search.toLowerCase());
    const cocokIconMarker = item.icon_marker.toLowerCase().includes(search.toLowerCase());

    return cocokName || cocokDescription || cocokIconMarker;
  });

  const fetchMasterObjectTypes = async () => {
    try {
      const response = await getObjectTypes();
      if (response.status === "berhasil") {
        console.log(response);
        setMasterObjectTypes(response.data.objectTypes);
      } else {
        setMasterObjectTypes([]);
      }
    } catch (error) {
      console.log("Error ambil object type:", error);
    }
  }

  const handleDeleteObjectType = async (id) => {
    setLoading(true);
    try {
      const response = await deleteObjectType(id);
      console.log(response);
      if (response.status === "berhasil") {
        await fetchMasterObjectTypes();
        success(response.message || "Object Type berhasil dihapus");
      } else {
        error(response.message || "Gagal menghapus object type");
        console.log(response);
      }
    } catch (error) {
      console.error("Error hapus object type:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMasterObjectTypes();
  }, []);

  const columns = [
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    {
      title: 'Icon Marker',
      dataIndex: 'icon_marker',
      key: 'icon_marker',
      render: (text) => (
        <Button
          type="default"
          icon={<EyeOutlined />}
          onClick={() => showModal(text)}
        >
          Lihat Gambar
        </Button>
      )
    }, { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Aksi', key: 'aksi', render: (text, record) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/master-object-types/update/${record.id}`}>
            <Button type="primary">
              Update
            </Button>
          </Link>
          <Popconfirm
            title={`Apakah Anda yakin ingin menghapus ${record.name}?`}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteObjectType(record.id)}
            okText="Hapus"
            cancelText="Batal"
          >
            <Button
              danger
            >
              {loading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];
  return (
    <DashboardLayout>
      {contextHolder}
      <div className="flex justify-between">
        <Input
          placeholder="Cari berdasarkan nama atau description"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={onSearchChange}
          style={{ width: 300 }}
          allowClear
        />

        <Button type="primary" className="bg-indigo-600">
          <Link to="/dashboard/master-object-types/create">Tambah Object Type</Link>
        </Button>
      </div>
      <Table
        className="mt-5"
        rowKey={"id"}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Preview Icon Marker"
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={null}
        centered
      >
        <div className="flex justify-center items-center p-4">
          <img
            alt="Icon Marker Preview"
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            src={previewImage}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Gambar+Tidak+Ditemukan";
            }}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default MasterObjectType;