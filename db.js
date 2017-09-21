const { Client } = require('pg')

module.exports = function(DATABASE_URL){

  if(!DATABASE_URL){
    throw new Error('You need to set DATABASE_URL!')
  }

  const db = {
    client: undefined,
  
    get: function(){
      if(!db.client || !db.client._connected){
        db.client = new Client({
          connectionString: DATABASE_URL,
        })
        db.client.connect()
      }
      return db.client
    },

    // describe: function(table, callback){
    //   const query = `SELECT column_name, data_type FROM INFORMATION_SCHEMA.COLUMNS where table_name = $1;`
    //   values = [table]
    //   db.get().query(query, values, callback)
    // },

    selectFromDB : function(table, filters, callback){
      let query = `SELECT * FROM ${table}`
      let values = []

      const filterKeys = Object.keys(filters)
      if(filterKeys.length > 0){
        let params = ''

        for(key of filterKeys){

          if(key != filterKeys[0]){
            params += ' and '
          }
          params += `${key}='${filters[key]}'`
          
        }
        
        query += ` WHERE (${params})`
      }
      
      db.get().query(query, values, callback)
    },

    insertIntoDB : function(table, values, callback){
      if(values.length > 0){
        let params = ''  
        
        for(i = 1; i <= values.length; i++){
          if(i != 1){
            params += ', '
          }
          params += `$${i}`
        }
        
        const query = `INSERT INTO ${table} VALUES(${params})`
        db.get().query(query, values, callback)
      }
    }
  }

  return db
}