import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  define: {
    charset: process.env.DATABASE_CHARSET,
    timestamps: false
  },
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  logging: false
};

const sequelize = new Sequelize(
  process.env.DATABASE_DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  options
);

async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    sequelize.close();
  }
};

export { sequelize };
