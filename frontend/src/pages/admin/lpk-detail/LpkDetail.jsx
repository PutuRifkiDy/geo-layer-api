import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { deleteLpkDetail, getLpkDetails } from "../../../api/lpk-detail";
import { useParams, Link } from "react-router-dom";

function LpkDetail() {
  const [lpkDetails, setLpkDetails] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { pointObjectId } = useParams();

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg
    });
  }

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  }

  const fetchLpkDetails = async () => {
    try {
      const response = await getLpkDetails(pointObjectId);
      if (response.status === "berhasil") {
        setLpkDetails(response.data.lpkDetails);
      } else {
        setLpkDetails([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteLpkDetail = async (id) => {
    setLoading(true);
    try {
      const response = await deleteLpkDetail(id);
      if (response.status === "berhasil") {
        await fetchLpkDetails();
        success(response.message || "LPK detail berhasil dihapus");
      } else {
        error("Gagal menghapus LPK detail");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredData = lpkDetails?.filter((item) => {
    const cocokNilekVin = item.nilek_vin?.toLowerCase().includes(search.toLowerCase());
    const cocokNoIzinDisnaker = item.no_izin_disnaker?.toLowerCase().includes(search.toLowerCase());
    const cocokAkreditasi = item.akreditasi?.toLowerCase().includes(search.toLowerCase());
    const cocokNamaPimpinan = item.nama_pimpinan?.toLowerCase().includes(search.toLowerCase());
    const cocokTahunBerdiri = item.tahun_berdiri?.toString().toLowerCase().includes(search.toLowerCase());
    const cocokKapasitasSiswa = item.kapasitas_siswa?.toString().toLowerCase().includes(search.toLowerCase());
    const cocokTargetNegara = item.target_negara?.toLowerCase().includes(search.toLowerCase());

    return cocokNilekVin || cocokNoIzinDisnaker || cocokAkreditasi || cocokNamaPimpinan || cocokTahunBerdiri || cocokKapasitasSiswa || cocokTargetNegara;
  });

  useEffect(() => {
    fetchLpkDetails();
  }, []);

  const columns = [
    {
      title: 'NILEK / VIN',
      dataIndex: 'nilek_vin',
      key: 'nilek_vin',
      render: (text) => text || '-'
    },
    {
      title: 'No. Izin Disnaker',
      dataIndex: 'no_izin_disnaker',
      key: 'no_izin_disnaker',
      render: (text) => text || '-'
    },
    {
      title: 'Akreditasi',
      dataIndex: 'akreditasi',
      key: 'akreditasi',
      render: (text) => text || '-'
    },
    {
      title: 'Nama Pimpinan',
      dataIndex: 'nama_pimpinan',
      key: 'nama_pimpinan',
      render: (text) => text || '-'
    },
    {
      title: 'Tahun Berdiri',
      dataIndex: 'tahun_berdiri',
      key: 'tahun_berdiri',
      render: (text) => text || '-'
    },
    {
      title: 'Kapasitas',
      dataIndex: 'kapasitas_siswa',
      key: 'kapasitas_siswa',
      render: (text) => text ? `${text} Siswa` : '-'
    },
    {
      title: 'Fasilitas Asrama',
      dataIndex: 'fasilitas_asrama',
      key: 'fasilitas_asrama',
      render: (val) => <span>{val ? 'Tersedia' : 'Tidak Ada'}</span>
    },
    {
      title: 'Sending Organization',
      dataIndex: 'is_sending_organization',
      key: 'is_sending_organization',
      render: (val) => <span>{val ? 'Ya' : 'Bukan'}</span>
    },
    {
      title: 'Target Negara',
      dataIndex: 'target_negara',
      key: 'target_negara',
      render: (text) => text || '-'
    },
    {
      title: 'Telepon',
      dataIndex: 'telepon',
      key: 'telepon',
      render: (text) => text || '-'
    },
    {
      title: 'Aksi',
      key: 'aksi',
      fixed: 'right',
      render: (text, record) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/lpk-details/update/${record.id}`}>
            <Button type="primary" className="bg-indigo-600">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Apakah anda yakin ingin menghapus LPK detail ini?"
            onConfirm={() => handleDeleteLpkDetail(record.id)}
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
      <div className="flex justify-between items-center mb-5">
        <Input
          placeholder="Cari NILEK, Akreditasi, Pimpinan..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={onSearchChange}
          style={{ width: 320 }}
          allowClear
        />


        <div className="flex gap-2">
          <Link to="/dashboard/point-objects">
            <Button type="default" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              Kembali ke Point Objects
            </Button>
          </Link>
          <Link to={`/dashboard/lpk-details/create/${pointObjectId}`}>
            <Button type="primary" className="bg-indigo-600">
              Tambah LPK Detail
            </Button>
          </Link>
        </div>
      </div>

      <Table
        className="mt-5"
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </DashboardLayout>
  );
}

export default LpkDetail;