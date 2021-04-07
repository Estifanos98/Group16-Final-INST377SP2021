export default (database, DataTypes) => {
    const genre = database.define(
      'genre',
      {
        genre_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        genre_name: {
          type: DataTypes.STRING
        }
      }
    );
    return genre;
  };
  