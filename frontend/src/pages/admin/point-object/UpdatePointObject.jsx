import { useNavigate, useParams, Link } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, Select, Switch, message } from "antd";
import { useState, useEffect, useRef } from "react";
import Leaflet from "leaflet";
import { renderToString } from 'react-dom/server';

// Pastikan import ini sesuai dengan lokasi file API kamu
import { getObjectTypes } from "../../../api/object-type";
import { getPointObjectById, updatePointObject } from "../../../api/point-object";

const { TextArea } = Input;

function UpdatePointObject() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [objectTypes, setObjectTypes] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const containerMap = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null); // Ref baru untuk menyimpan instance map

  const handleNameChange = (event) => setName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleIsActiveChange = (checked) => setIsActive(checked);
  const handleTypeIdChange = (value) => setTypeId(value);

  const success = (msg) => {
    messageApi.open({ type: 'success', content: msg });
  }

  const error = (msg) => {
    messageApi.open({ type: 'error', content: msg });
  }

  const fetchObjectTypes = async () => {
    try {
      const response = await getObjectTypes();
      if (response?.status === "berhasil") {
        setObjectTypes(response.data.objectTypes);
      } else {
        setObjectTypes([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const fetchPointById = async () => {
    try {
      const response = await getPointObjectById(id);
      if (response?.status === "berhasil") {
        const point = response.data.point;
        setName(point.name);
        setAddress(point.address);
        setLatitude(point.latitude);
        setLongitude(point.longitude);
        setTypeId(point.type_id);
        setIsActive(point.is_active);

        // Menampilkan marker awal di peta dari data yang di-fetch
        if (mapRef.current && point.latitude && point.longitude) {
          const lat = parseFloat(point.latitude);
          const lng = parseFloat(point.longitude);

          // Pusatkan peta ke lokasi point yang sudah ada
          mapRef.current.setView([lat, lng], 15);

          const newMarker = Leaflet.marker([lat, lng]).addTo(mapRef.current);

          const iconPinMap = renderToString(
            <EnvironmentOutlined style={{ fontSize: '18px', color: '#4f46e5' }} />
          );

          newMarker.bindPopup(`
            <div class="p-1 min-w-[160px] font-sans">
              <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <div class="bg-indigo-50 p-1.5 rounded-full flex items-center justify-center">
                  ${iconPinMap}
                </div>
                <span class="font-semibold text-gray-800 text-sm">Titik Koordinat</span>
              </div>
              <div class="space-y-2">
                <div class="bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100 flex justify-between items-center shadow-sm">
                  <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lat</span>
                  <span class="font-mono text-xs text-gray-800 font-medium">${lat.toFixed(6)}</span>
                </div>
                <div class="bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100 flex justify-between items-center shadow-sm">
                  <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lng</span>
                  <span class="font-mono text-xs text-gray-800 font-medium">${lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          `).openPopup();

          markerRef.current = newMarker;
        }

      } else {
        error("Gagal mengambil data point object");
      }
    } catch (err) {
      console.log(err);
      error("Terjadi kesalahan saat mengambil data");
    }
  }

  console.log(isActive);

  useEffect(() => {
    const map = Leaflet.map(containerMap.current).setView([-8.409518, 115.188919], 10);
    mapRef.current = map; // Simpan instance map ke ref agar bisa diakses fetchPointById

    Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on("click", (event) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      setLatitude(lat);
      setLongitude(lng);

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const newMarker = Leaflet.marker([lat, lng]).addTo(map);

      const iconPinMap = renderToString(
        <EnvironmentOutlined style={{ fontSize: '18px', color: '#4f46e5' }} />
      );

      newMarker.bindPopup(`
        <div class="p-1 min-w-[160px] font-sans">
          <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
            <div class="bg-indigo-50 p-1.5 rounded-full flex items-center justify-center">
              ${iconPinMap}
            </div>
            <span class="font-semibold text-gray-800 text-sm">Titik Baru</span>
          </div>
          <div class="space-y-2">
            <div class="bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100 flex justify-between items-center shadow-sm">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lat</span>
              <span class="font-mono text-xs text-gray-800 font-medium">${lat.toFixed(6)}</span>
            </div>
            <div class="bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100 flex justify-between items-center shadow-sm">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lng</span>
              <span class="font-mono text-xs text-gray-800 font-medium">${lng.toFixed(6)}</span>
            </div>
          </div>
        </div>
      `).openPopup();

      markerRef.current = newMarker;
    });

    fetchObjectTypes();
    fetchPointById();

    return () => {
      map.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (!latitude || !longitude) {
      error("Silakan klik pada peta untuk menentukan lokasi (Latitude & Longitude).");
      return;
    }

    if (!typeId) {
      error("Silakan pilih type object.");
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        type_id: typeId,
        name: name,
        address: address,
        latitude: latitude,
        longitude: longitude,
        is_active: isActive
      };

      const response = await updatePointObject(id, data);

      if (response?.status === "berhasil") {
        setIsLoading(false);
        success(response.message || "Point Object berhasil diupdate");
        setTimeout(() => {
          navigate('/dashboard/point-objects'); 
        }, 1000);
      } else {
        setIsLoading(false);
        error(response?.message || "Gagal mengupdate point object");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error update point object:", err);
      error("Terjadi kesalahan pada sistem.");
    }
  }

  return (
    <DashboardLayout>
      {contextHolder}
      <form className="mt-4 space-y-6" onSubmit={onHandleSubmit}>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Update Point Object</h2>
            <p className="text-sm text-gray-500">Ubah data atau klik pada peta untuk memindahkan koordinat.</p>
          </div>
          <Link to="/dashboard/point-objects">
            <Button type="default">Kembali ke Daftar Point</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Kolom Kiri: Peta */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Lokasi di Peta <span className="text-red-500">*</span></label>
            <div ref={containerMap} className="h-[450px] w-full rounded-xl border-2 border-gray-200" style={{ zIndex: 0 }}></div>
          </div>

          {/* Kolom Kanan: Input Form */}
          <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type_id">Type Object <span className="text-red-500">*</span></label>
              <Select
                id="type_id"
                name="type_id"
                value={typeId}
                onChange={handleTypeIdChange}
                placeholder='Pilih type object'
                className='w-full'
              >
                {objectTypes.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nama Point <span className="text-red-500">*</span></label>
              <Input
                id="name"
                required
                value={name}
                onChange={handleNameChange}
                className='py-2'
                placeholder='Contoh: LPK Bahasa Jepang Nusantara'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Alamat <span className="text-red-500">*</span></label>
              <TextArea
                id="address"
                required
                rows={3}
                value={address}
                onChange={handleAddressChange}
                placeholder='Masukkan alamat lengkap'
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <Input
                  disabled
                  value={latitude}
                  className='py-2 bg-gray-50'
                  placeholder='Pilih dari peta'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <Input
                  disabled
                  value={longitude}
                  className='py-2 bg-gray-50'
                  placeholder='Pilih dari peta'
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch checked={isActive} onChange={handleIsActiveChange} />
              <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => setIsActive(!isActive)}>
                Status Aktif
              </label>
            </div>

            <div className="pt-4">
              <Button
                htmlType='submit'
                type="primary"
                className='w-full py-5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700'
                loading={isLoading}
              >
                Update Point Object
              </Button>
            </div>
          </div>

        </div>
      </form>
    </DashboardLayout>
  );
}

export default UpdatePointObject;