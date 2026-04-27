export const up = (pgm) => {
  pgm.createTable('lpk_programs', {
    id: 'id',
    point_object_id: {
      type: 'integer',
      references: '"point_objects"',
      onDelete: 'CASCADE',
      notNull: true
    },
    nama_program: {
      type: 'VARCHAR(150)',
      notNull: true
    },
    durasi_bulan: {
      type: 'integer'
    },
    target_bahasa: {
      type: 'VARCHAR(50)'
    },
    estimasi_biaya: {
      type: 'VARCHAR(100)'
    },
    deskripsi_program: {
      type: 'TEXT'
    }
  });
};

export const down = (pgm) => { };
