import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { getUserById, updateUserById } from "../../../api/users";
import { useEffect, useState } from "react";
import { Button, Input, Select, message, Space } from "antd";

function UpdateUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const id = useParams().id;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = value => {
    setRole(value);
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

  const fetchUserData = async () => {
    try {
      const response = await getUserById(id);
      if (response.status === "berhasil") {
        setUser(response.data.user);
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
        setRole(response.data.user.role);
      } else {
        console.log(response);
        setUser(null);
      }
    } catch (error) {
      console.error("Error ambil data user:", error);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUserById(id, { username, email, role });
      if (response.status === "berhasil") {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard/users');
        }, 1000);
        success(response.message || "User berhasil diperbarui");
      } else {
        setIsLoading(false);
        error(response.message || "Gagal memperbarui user");
        console.log(response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error memperbarui user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [id]);

  return (
    <DashboardLayout>
      {contextHolder}
      {user && (
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={handleUsernameChange}
                className='px-2 py-2'
                placeholder='Masukkan username'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <Input
                id="role"
                name="role"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder='Masukkan email anda'
                className='w-full px-2 py-2'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Role</label>
              <Select
                id="role"
                name="role"
                required
                value={role}
                onChange={handleRoleChange}
                placeholder='Pilih role'
                className='w-full px-2 py-2'
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </div>

          </div>

          <Button
            htmlType='submit'
            type="primary"
            className='w-full px-2 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-600'>
            {isLoading ? 'Memproses...' : 'Update User'}
          </Button>
        </form>
      )}

    </DashboardLayout>
  );
}

export default UpdateUser;