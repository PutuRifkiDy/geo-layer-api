import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { SearchOutlined, QuestionCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { deletePointObject, getPointObjects } from "../../../api/point-object";

function PointObject() {
  const [pointObjects, setPointObject] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSearchChange = (event) => {
    setSearch(event.target.value);
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

  const fetchPointObjects = async () => {
    try {
      const response = await getPointObjects();
      console.log(response);
      if (response.status === "berhasil") {
        setPointObject(response.data.points);
      } else {
        setPointObject([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePointObject = async (id) => {
    setLoading(true);
    try {
      const response = await deletePointObject(id);
      if (response.status === "berhasil") {
        await fetchPointObjects();
        success(response.message || "Point object berhasil dihapus");
      } else {
        error("Gagal menghapus point object");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredData = pointObjects?.filter((item) => {
    const cocokName = item.name.toLowerCase().includes(search.toLowerCase());
    const cocokAddress = item.address.toLowerCase().includes(search.toLowerCase());

    return cocokName || cocokAddress;
  });

  useEffect(() => {
    fetchPointObjects();
  }, []);

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Alamat',
      dataIndex: 'address',
      render: (address) => (
        <span className="w-96">{address ? address : '-'}</span>
      )
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude'
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude'
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active) => (
        <span>{is_active ? 'Aktif' : 'Tidak Aktif'}</span>
      )
    },
    {
      title: 'Object Type',
      dataIndex: 'type_name',
      key: 'type_name',
      render: (type_name) => (
        <span>{type_name ? type_name : '-'}</span>
      )
    },
    {
      title: 'Dibuat Oleh',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (created_by) => (
        <span>{created_by ? created_by : '-'}</span>
      )
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (text, record) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/point-objects/update/${record.id}`}>
            <Button type="primary" className="bg-indigo-600">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Apakah anda yakin ingin menghapus point object ini?"
            onConfirm={() => handleDeletePointObject(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="primary" danger loading={loading}>
              Hapus
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <DashboardLayout>
      {contextHolder}
      <div className="flex justify-between">
        <Input
          placeholder="Cari berdasarkan nama dan alamat"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={onSearchChange}
          style={{ width: 300 }}
          allowClear
        />

        <Link to="/dashboard/point-objects/create">
          <Button type="primary" className="bg-indigo-600">
            Tambah Point Object
          </Button>
        </Link>
      </div>

      <Table
        className="mt-5"
        rowKey={"id"}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </DashboardLayout>
  );
}

export default PointObject;