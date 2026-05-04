import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Button, Input, Switch, message as messageAntd } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getLpkDetailById, updateLpkDetail } from "../../../api/lpk-detail"; // Sesuaikan path ini

function UpdateLpkDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageApi, contextHolder] = messageAntd.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const [nilekVin, setNilekVin] = useState("");
  const [noIzinDisnaker, setNoIzinDisnaker] = useState("");
  const [akreditasi, setAkreditasi] = useState("");
  const [namaPimpinan, setNamaPimpinan] = useState("");
  const [tahunBerdiri, setTahunBerdiri] = useState("");
  const [kapasitasSiswa, setKapasitasSiswa] = useState("");
  const [fasilitasAsrama, setFasilitasAsrama] = useState(false);
  const [isSendingOrganization, setIsSendingOrganization] = useState(false);
  const [targetNegara, setTargetNegara] = useState("");
  const [jamOperasional, setJamOperasional] = useState("");
  const [telepon, setTelepon] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [websiteSosmed, setWebsiteSosmed] = useState("");

  const handleNilekVinChange = (event) => { setNilekVin(event.target.value); };
  const handleNoIzinDisnakerChange = (event) => { setNoIzinDisnaker(event.target.value); };
  const handleAkreditasiChange = (event) => { setAkreditasi(event.target.value); };
  const handleNamaPimpinanChange = (event) => { setNamaPimpinan(event.target.value); };
  const handleTahunBerdiriChange = (event) => { setTahunBerdiri(event.target.value); };
  const handleKapasitasSiswaChange = (event) => { setKapasitasSiswa(event.target.value); };
  const handleTargetNegaraChange = (event) => { setTargetNegara(event.target.value); };
  const handleJamOperasionalChange = (event) => { setJamOperasional(event.target.value); };
  const handleTeleponChange = (event) => { setTelepon(event.target.value); };
  const handleWhatsappChange = (event) => { setWhatsapp(event.target.value); };
  const handleEmailChange = (event) => { setEmail(event.target.value); };
  const handleWebsiteSosmedChange = (event) => { setWebsiteSosmed(event.target.value); };

  const handleFasilitasAsramaChange = (checked) => { setFasilitasAsrama(checked); };
  const handleIsSendingOrganizationChange = (checked) => { setIsSendingOrganization(checked); };

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

  const fetchLpkDetail = async () => {
    try {
      const response = await getLpkDetailById(id);
      if (response?.status === "berhasil") {
        const data = response.data.lpkDetail;

        setNilekVin(data.nilek_vin || "");
        setNoIzinDisnaker(data.no_izin_disnaker || "");
        setAkreditasi(data.akreditasi || "");
        setNamaPimpinan(data.nama_pimpinan || "");
        setTahunBerdiri(data.tahun_berdiri ? data.tahun_berdiri.toString() : "");
        setKapasitasSiswa(data.kapasitas_siswa ? data.kapasitas_siswa.toString() : "");
        setFasilitasAsrama(data.fasilitas_asrama || false);
        setIsSendingOrganization(data.is_sending_organization || false);
        setTargetNegara(data.target_negara || "");
        setJamOperasional(data.jam_operasional || "");
        setTelepon(data.telepon || "");
        setWhatsapp(data.whatsapp || "");
        setEmail(data.email || "");
        setWebsiteSosmed(data.website_sosmed || "");
      } else {
        error("Gagal mengambil data LPK Detail");
      }
    } catch (err) {
      console.log(err);
      error("Terjadi kesalahan saat mengambil data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchLpkDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        nilek_vin: nilekVin,
        no_izin_disnaker: noIzinDisnaker,
        akreditasi: akreditasi,
        nama_pimpinan: namaPimpinan,
        tahun_berdiri: tahunBerdiri ? parseInt(tahunBerdiri) : null,
        kapasitas_siswa: kapasitasSiswa ? parseInt(kapasitasSiswa) : null,
        fasilitas_asrama: fasilitasAsrama,
        is_sending_organization: isSendingOrganization,
        target_negara: targetNegara,
        jam_operasional: jamOperasional,
        telepon: telepon,
        whatsapp: whatsapp,
        email: email,
        website_sosmed: websiteSosmed
      };

      const response = await updateLpkDetail(id, data);

      if (response?.status === "berhasil") {
        success(response.message || "LPK Detail berhasil diupdate");
        console.log(response.data.updatedLPKDetail.point_object_id);
        setTimeout(() => {
          navigate(`/dashboard/lpk-details/${response.data.updatedLPKDetail.point_object_id}`);
        }, 1000);
      } else {
        error(response?.message || "Gagal mengupdate LPK detail");
      }
    } catch (err) {
      console.log(err);
      error("Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      {contextHolder}
      <form className="mt-4 space-y-6" onSubmit={onHandleSubmit}>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Update LPK Detail</h2>
            <p className="text-sm text-gray-500">Perbarui informasi detail LPK di bawah ini.</p>
          </div>
          <Button type="default" className="bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

            <div className="space-y-5">
              <h3 className="font-semibold text-lg text-indigo-600 border-b pb-2">Informasi Umum</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nilek_vin">NILEK / VIN</label>
                <Input id="nilek_vin" value={nilekVin} onChange={handleNilekVinChange} className="py-2" placeholder="Masukkan NILEK/VIN" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="no_izin_disnaker">No. Izin Disnaker</label>
                <Input id="no_izin_disnaker" value={noIzinDisnaker} onChange={handleNoIzinDisnakerChange} className="py-2" placeholder="Contoh: KEP.123/DISNAKER/2023" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="akreditasi">Akreditasi</label>
                  <Input id="akreditasi" value={akreditasi} onChange={handleAkreditasiChange} className="py-2" placeholder="Contoh: A / Belum" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tahun_berdiri">Tahun Berdiri</label>
                  <Input id="tahun_berdiri" type="number" value={tahunBerdiri} onChange={handleTahunBerdiriChange} className="py-2" placeholder="Contoh: 2015" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nama_pimpinan">Nama Pimpinan</label>
                <Input id="nama_pimpinan" value={namaPimpinan} onChange={handleNamaPimpinanChange} className="py-2" placeholder="Masukkan nama pimpinan" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="kapasitas_siswa">Kapasitas Siswa</label>
                  <Input id="kapasitas_siswa" type="number" value={kapasitasSiswa} onChange={handleKapasitasSiswaChange} className="py-2" placeholder="Jumlah siswa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="target_negara">Target Negara</label>
                  <Input id="target_negara" value={targetNegara} onChange={handleTargetNegaraChange} className="py-2" placeholder="Contoh: Jepang, Korea" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jam_operasional">Jam Operasional</label>
                <Input id="jam_operasional" value={jamOperasional} onChange={handleJamOperasionalChange} className="py-2" placeholder="Contoh: Senin - Jumat (08:00 - 17:00)" />
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold text-lg text-indigo-600 border-b pb-2">Kontak & Fasilitas</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telepon">Telepon</label>
                  <Input id="telepon" value={telepon} onChange={handleTeleponChange} className="py-2" placeholder="No. Telepon" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="whatsapp">WhatsApp</label>
                  <Input id="whatsapp" value={whatsapp} onChange={handleWhatsappChange} className="py-2" placeholder="No. WhatsApp" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                <Input id="email" type="email" value={email} onChange={handleEmailChange} className="py-2" placeholder="Alamat email LPK" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="website_sosmed">Website / Sosmed</label>
                <Input id="website_sosmed" value={websiteSosmed} onChange={handleWebsiteSosmedChange} className="py-2" placeholder="URL Website atau link sosial media" />
              </div>

              <div className="pt-2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Switch checked={fasilitasAsrama} onChange={handleFasilitasAsramaChange} />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => setFasilitasAsrama(!fasilitasAsrama)}>
                    Tersedia Fasilitas Asrama
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch checked={isSendingOrganization} onChange={handleIsSendingOrganizationChange} />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => setIsSendingOrganization(!isSendingOrganization)}>
                    Merupakan Sending Organization (SO)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-gray-100 flex justify-end">
            <Button
              htmlType="submit"
              type="primary"
              className="py-5 px-8 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700"
              loading={isLoading}
            >
              Update LPK Detail
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default UpdateLpkDetail;