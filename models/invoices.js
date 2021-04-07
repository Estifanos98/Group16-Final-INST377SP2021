export default (database, DataTypes) => {
    const invoices = database.define(
      'invoices',
      {
        invoice_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        customer_id: {
          type: DataTypes.INTEGER
        },
        credit_total: {
          type: DataTypes.DECIMAL
        },
        invoice_date: {
          type: DataTypes.timestamps
        },
        invoice_total: {
          type: DataTypes.DECIMAL
        }
      }
    );
    return invoices;
  };
  