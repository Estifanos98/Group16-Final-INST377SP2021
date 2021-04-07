export default (database, DataTypes) => {
    const tv_movie = database.define(
      'tv_movie',
      {
        catalogue_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        category_id: {
          type: DataTypes.INTEGER
        },
        title: {
          type: DataTypes.STRING
        },
        pricing: {
          type: DataTypes.DECIMAL
        },
        year: {
          type: DataTypes.INTEGER
        },
        duration: {
            type: DataTypes.INTEGER
        },
        episodes: {
            type: DataTypes.INTEGER
        },
        seasons: {
            type: DataTypes.INTEGER
        },
        avg_star_rating: {
            type: DataTypes.DECIMAL
        },
        media_type: {
            type: DataTypes.STRING
        },
        rating_id: {
            type: DataTypes.INTEGER
        },
        studio_id: {
            type: DataTypes.INTEGER
        }
      }
    );
    return tv_movie;
  };
  