import { Button, Input, Table, Popconfirm, message, Space } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../api/users";
import { Link } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
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

  const filteredData = users.filter((item) => {
    const cocokUsername = item.username.toLowerCase().includes(search.toLowerCase());
    const cocokEmail = item.email.toLowerCase().includes(search.toLowerCase());
    const cocokRole = item.role.toLowerCase().includes(search.toLowerCase());

    return cocokUsername || cocokEmail || cocokRole;
  });

  const fetchUsersData = async () => {
    try {
      const response = await getUsers();
      if (response.status === "berhasil") {
        console.log(response);
        setUsers(response.data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error ambil data user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await deleteUser(userId);
      console.log(response);
      if (response.status === "berhasil") {
        await fetchUsersData();
        success(response.message || "User berhasil dihapus");
      } else {
        error(response.message || "Gagal menghapus user");
        console.log(response);
      }
    } catch (error) {
      console.error("Error hapus user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Aksi', key: 'aksi', render: (text, record) => (
        <div className="flex gap-2">
          <Popconfirm
            title={`Apakah Anda yakin ingin menghapus ${record.username}?`}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Hapus"
            cancelText="Batal"
          >
            <Button
              danger
            >
              {loading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </Popconfirm>
          <Link to={`/dashboard/users/${record.id}`}>
            <Button type="primary">
              Edit
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      {contextHolder}
      <div className="flex justify-between">
        <Input
          placeholder="Cari berdasarkan username, email, atau role"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={onSearchChange}
          style={{ width: 300 }}
          allowClear
        />

        <Button type="primary">
          <Link to="/dashboard/users/create">Tambah User</Link>
        </Button>
      </div>
      <Table
        className="mt-5"
        rowKey={"id"}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </DashboardLayout>
  );
}

export default User;