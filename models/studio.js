/* eslint-disable indent */
export default (database, DataTypes) => {
    const studio = database.define(
      'studio',
      {
        studio_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        studio_name: {
          type: DataTypes.STRING
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return studio;
  };
