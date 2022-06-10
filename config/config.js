const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  /** 服务运行端口 */
  PORT: process.env.PORT,
  /** MYSQL运行端口 */
  MYSQL_PORT: process.env.MYSQL_PORT,
  /** MYSQL的ip地址 */
  MYSQL_HOST: process.env.MYSQL_HOST,
  /** 连接的库名 */
  MYSQL_USER: process.env.MYSQL_USER,
  /** MYSQL的密码 */
  MYSQL_PWD: process.env.MYSQL_PWD,
  /** JWT */
  JWT_SECRET: process.env.JWT_SECRET,
};
