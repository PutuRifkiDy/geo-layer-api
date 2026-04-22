import { useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Button, Input, message, Select, Space } from "antd";
import { registerUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleRoleChange = value => {
    setRole(value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await registerUser({ username, email, role, password });
      console.log(response);
      if (response.status === "berhasil") {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard/users');
        }, 1000);
        success(response.message || "User berhasil dibuat");
      } else {
        setIsLoading(false);
        error(response.message || "Gagal membuat user baru");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error membuat user:", error);
      error("Terjadi kesalahan saat membuat user");
    }
  }
  return (
    <DashboardLayout>
      {contextHolder}
      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Tambah User Baru</h2>
          <p className="text-sm text-gray-500">Masukkan informasi user baru di bawah ini.</p>
        </div>
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
              id="email"
              name="email"
              type="text"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder='Masukkan email anda'
              className='w-full px-2 py-2'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              placeholder='Masukkan password'
              className='w-full px-2 py-2'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="role">Role</label>
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
          {isLoading ? 'Memproses...' : 'Sign In'}
        </Button>
      </form>
    </DashboardLayout>
  );
}

export default CreateUser;