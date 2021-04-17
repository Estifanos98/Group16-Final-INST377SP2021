/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
export default (sequelize, DataTypes) => {
  const approved_audience = sequelize.define(
    'approved_audience',
    {
      rating_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      rating_description: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return approved_audience;
};