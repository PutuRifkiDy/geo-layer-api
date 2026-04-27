export const up = (pgm) => {
  pgm.createTable('lpk_details', {
    id: 'id',
    point_object_id: {
      type: 'integer',
      references: '"point_objects"',
      onDelete: 'CASCADE',
      notNull: true,
      unique: true
    },
    nilek_vin: {
      type: 'VARCHAR(50)'
    },
    no_izin_disnaker: {
      type: 'VARCHAR(100)'
    },
    akreditasi: {
      type: 'VARCHAR(50)'
    },
    nama_pimpinan: {
      type: 'VARCHAR(150)'
    },
    tahun_berdiri: {
      type: 'integer'
    },
    kapasitas_siswa: {
      type: 'integer'
    },
    fasilitas_asrama: {
      type: 'BOOLEAN', default: false
    },
    is_sending_organization: {
      type: 'BOOLEAN',
      default: false
    },
    target_negara: {
      type: 'VARCHAR(100)'
    },
    jam_operasional: {
      type: 'VARCHAR(150)'
    },
    telepon: {
      type: 'VARCHAR(20)'
    },
    whatsapp: {
      type: 'VARCHAR(20)'
    },
    email: {
      type: 'VARCHAR(100)'
    },
    website_sosmed: {
      type: 'VARCHAR(150)'
    }
  });
};

export const down = (pgm) => { };
