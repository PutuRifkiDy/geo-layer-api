import { Button, Input, Select, Switch, message } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Leaflet from "leaflet";
import { createPointObject } from "../../../api/point-object";
import { getObjectTypes } from "../../../api/object-type";
const { TextArea } = Input;

import { renderToString } from 'react-dom/server';

function CreatePointObject() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleIsActiveChange = (checked) => {
    setIsActive(checked);
  };
  const handleTypeIdChange = (value) => {
    setTypeId(value);
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

  const fetchObjectTypes = async () => {
    try {
      const response = await getObjectTypes();
      if (response.status === "berhasil") {
        setObjectTypes(response.data.objectTypes);
      } else {
        setObjectTypes([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const map = Leaflet.map(containerMap.current).setView([-8.409518, 115.188919], 10);
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

      //  Simpan marker baru ke dalam useRef
      markerRef.current = newMarker;
    });

    fetchObjectTypes();

    return () => {
      map.remove();
    }
  }, []);
  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (!latitude || !longitude) {
      error("Silakan klik pada peta terlebih dahulu untuk menentukan lokasi (Latitude & Longitude).");
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
      const response = await createPointObject(data);

      if (response?.status === "berhasil") {
        setIsLoading(false);
        success(response.message || "Point Object berhasil dibuat");
        setTimeout(() => {
          navigate('/dashboard/point-objects');
        }, 1000);
      } else {
        setIsLoading(false);
        error(response?.message || "Gagal membuat point object baru");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error membuat point object:", error);
    }
  }

  return (
    <DashboardLayout>
      {contextHolder}
      <form className="mt-4 space-y-6" onSubmit={onHandleSubmit}>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Tambah Point Object</h2>
            <p className="text-sm text-gray-500">Klik pada peta untuk menentukan koordinat otomatis.</p>
          </div>
          <Link to="/dashboard/point-objects">
            <Button type="default" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              Kembali ke Daftar Point
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Kolom Kiri: Peta */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pilih Lokasi di Peta <span className="text-red-500">*</span></label>

            <div ref={containerMap} className="h-[450px] w-full rounded-xl border-2 border-gray-200"></div>
          </div>

          {/* Kolom Kanan: Input Form */}
          <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type_id">Type Object <span className="text-red-500">*</span></label>
              <Select
                id="type_id"
                name="type_id"
                required
                value={typeId}
                onChange={handleTypeIdChange}
                placeholder='Pilih type object'
                className='w-full px-2 py-2'
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
                Simpan Point Object
              </Button>
            </div>
          </div>

        </div>
      </form>
    </DashboardLayout>
  );
}

export default CreatePointObject;