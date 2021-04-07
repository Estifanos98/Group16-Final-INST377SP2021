export default (database, DataTypes) => {
    const approved_audience = database.define(
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
        }
      );
      return approved_audience;
};