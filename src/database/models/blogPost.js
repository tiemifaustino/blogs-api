module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    tableName: 'BlogPosts',
    timestamps: false
  });

  BlogPost.associate = (models) =>{
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });
  }

  return BlogPost;
}