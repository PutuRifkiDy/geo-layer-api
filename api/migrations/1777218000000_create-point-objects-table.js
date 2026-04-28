export const up = (pgm) => {
  pgm.createTable('point_objects', {
    id: 'id',
    type_id: {
      type: 'integer',
      references: '"master_object_types"', 
      onDelete: 'RESTRICT', 
      notNull: true
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    address: {
      type: 'TEXT',
      notNull: true
    },
    latitude: {
      type: 'DECIMAL(10, 8)',
      notNull: true
    },
    longitude: {
      type: 'DECIMAL(11, 8)',
      notNull: true
    },
    is_active: {
      type: 'BOOLEAN',
      notNull: true,
      default: true
    },
    created_by: {
      type: 'integer',
      references: '"users"',
      onDelete: 'SET NULL'
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
  pgm.createIndex('point_objects', 'type_id');
};
export const down = (pgm) => { pgm.dropTable('point_objects'); };