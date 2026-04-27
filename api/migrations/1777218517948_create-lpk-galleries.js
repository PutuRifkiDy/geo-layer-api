export const up = (pgm) => {
  pgm.createTable('lpk_galleries', {
    id: 'id',
    point_object_id: {
      type: 'integer',
      references: '"point_objects"',
      onDelete: 'CASCADE',
      notNull: true
    },
    image_url: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    caption: {
      type: 'VARCHAR(150)'
    },
    is_primary: {
      type: 'BOOLEAN',
      default: false
    },
    created_at: {
      type: 'timestamp with time zone',
      default: pgm.func('current_timestamp')
    }
  });
};

export const down = (pgm) => { };
