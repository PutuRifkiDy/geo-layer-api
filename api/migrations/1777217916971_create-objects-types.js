export const up = (pgm) => {
  pgm.createTable('master_object_types', {
    id: 'id',
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true
    },
    icon_marker: {
      type: 'VARCHAR(255)'
    },
    description: {
      type: 'TEXT'
    },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  });
};

export const down = (pgm) => {
  pgm.dropTable('object_types');
};
