export const up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: {
      type: 'VARCHAR(255)',
      notNull: true,
      unique: true
    },
    email: {
      type: 'VARCHAR(255)',
      notNull: true,
      unique: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    },
    role: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: 'user'
    },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    update_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  pgm.addConstraint('users', 'users_role_check', 'CHECK (role IN (\'user\', \'admin\'))');
  pgm.createIndex('users', 'email');
  pgm.createIndex('users', 'username');

  pgm.sql(`
    INSERT INTO users(username, email, password, role)
    VALUES
    ('Admin GIS', 'admin@gis.com', '$2b$10$kujFrozzV8b48pYBjMOZUem...', 'admin')
  `);
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
