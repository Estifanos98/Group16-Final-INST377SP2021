export default (database, DataTypes) => {
    const rental_info = database.define(
      'rental_info',
      {
        confirmation_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        invoice_id: {
          type: DataTypes.INTEGER
        },
        catalogue_id: {
          type: DataTypes.INTEGER
        },
        purchase_type: {
          type: DataTypes.STRING
        },
        purchase_date: {
          type: DataTypes.timestamps
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return rental_info;
  };
  