
export const up = (pgm) => {
  pgm.createTable('refresh_tokens', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    token: {
      type: 'TEXT',
      notNull: true,
      unique: true
    },
    expires_at: {
      type: 'timestamp with time zone',
      notNull: true
    },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  pgm.createIndex('refresh_tokens', 'token');
  pgm.createIndex('refresh_tokens', 'user_id');
};


export const down = (pgm) => { 
  pgm.dropTable('refresh_tokens');
};
