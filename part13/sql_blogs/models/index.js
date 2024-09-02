const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readingList');
const Session = require('./session')

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(ReadingList, { foreignKey: 'userId' });
ReadingList.belongsTo(User, { foreignKey: 'userId' });

Blog.belongsToMany(ReadingList, { through: 'blog_reading_lists', foreignKey: 'blog_id' });
ReadingList.belongsToMany(Blog, { through: 'blog_reading_lists', foreignKey: 'reading_list_id' });

User.hasOne(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
  Session
};



