export const up = (pgm) => {
  pgm.createTable('point_objects', {
    id: 'id',
    name: { 
      type: 'VARCHAR(255)', 
      notNull: true 
    },
    type: { 
      type: 'VARCHAR(100)', 
      notNull: true 
    },
    address: { 
      type: 'TEXT' 
    },
    latitude: { 
      type: 'DECIMAL(10, 8)', 
      notNull: true 
    },
    longitude: { 
      type: 'DECIMAL(11, 8)', 
      notNull: true 
    },
    icon: { 
      type: 'VARCHAR(255)' 
    },
    owner: { 
      type: 'VARCHAR(255)' 
    },
    description: { 
      type: 'TEXT' 
    },
    is_active: { 
      type: 'BOOLEAN', notNull: true, default: true 
    },
    created_by: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  pgm.createIndex('point_objects', 'type');
};

export const down = (pgm) => { 
  pgm.dropTable('point_objects');
};
