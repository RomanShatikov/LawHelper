'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Document, Favorite, Theme }) {
      this.belongsTo(Theme, { foreignKey: 'themeId' });
      this.hasMany(Favorite, { foreignKey: 'questionId' });
      this.hasMany(Document, { foreignKey: 'questionId' });
    }
  }
  Question.init(
    {
      title: DataTypes.TEXT,
      answer: DataTypes.TEXT,
      themeId: DataTypes.INTEGER,
      views: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};
