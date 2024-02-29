const { EntitySchema } = require('typeorm');

const taskSchema = new EntitySchema({
  name: 'task',
  tableName: 'tasks',

  columns: {
    id: { primary: true, type: 'text', generated: 'uuid' },

    title: { type: 'varchar' },

    body: { type: 'text' },

    createdAt: {
      type: 'timestamp',
      default: new Date().toISOString().split('T')[0],
    },
  },
});

module.exports = taskSchema;
