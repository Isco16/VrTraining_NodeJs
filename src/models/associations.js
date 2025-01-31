const User = require('./users.model.js');
const Course = require('./courses.model.js');

User.belongsTo(Course, {
    as: 'teaching',
    foreignKey: 'created_by',
    // target_id: 'user_id',
  });

  Course.hasMany(User , {
    as: 'teacher',
    foreignKey: 'created_by',
    // sourceKey: 'user_id',
});