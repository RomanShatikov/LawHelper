const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user'});
    }
  }
  Request.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Request',
    },
  );
  return Request;
};
