/* eslint-disable indent */
export default (database, DataTypes) => {
    const categories = database.define(
      'categories',
      {
        catalogue_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: false
        },
        genre_id: {
          type: DataTypes.INTEGER
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return categories;
  };
