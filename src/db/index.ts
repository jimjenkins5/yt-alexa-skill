import sql, { ConnectionPool, IResult } from 'mssql';

let _connection: ConnectionPool = null;

export function getConnection(): Promise<ConnectionPool> {
   if (_connection) {
      return Promise.resolve(_connection);
   }

   _connection = new sql.ConnectionPool({
      server: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
   });

   return _connection.connect();
}

export async function CongregationCount(): Promise<number> {
   const db = await getConnection(),
         countResp: IResult<{ count: number }> = await db.request().query('SELECT count(*) as count FROM Congregation');

   return countResp.recordset[0].count;
}
