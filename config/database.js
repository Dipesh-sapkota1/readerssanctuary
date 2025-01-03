import { Sequelize} from 'sequelize';
import {} from 'dotenv/config';




// Create a new instance of Sequelize for PostgreSQL using environment variables
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,  
});





export default sequelize;
