const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question }) {
      this.belongsTo(Question, { foreignKey: 'questionId' });
    }
  }
  Document.init(
    {
      questionId: DataTypes.INTEGER,
      urlDoc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Document',
    },
  );
  return Document;
};
