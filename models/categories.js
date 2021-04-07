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
      }
    );
    return categories;
  };
  