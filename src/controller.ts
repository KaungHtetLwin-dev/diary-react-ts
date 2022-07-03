import { Connection, DATA_TYPE } from 'jsstore';
import workerInjector from "jsstore/dist/worker_injector";
import DiaryEntry from "./model";
export default class Controller{

    private static _instance? : Controller;
    
   

    private static _dbName ='Diary';
    private static _tblRecord = {
        name: 'Record',
        columns: {
            
            id:{ primaryKey: true, autoIncrement: true , enableSearch: true },
            date : { dataType : DATA_TYPE.DateTime},
            title :  {dataType : DATA_TYPE.String},
            comment :  {dataType : DATA_TYPE.String},
            
        }
    };
    private static _database = {
        name: 'Diary',
        tables: [
            {
                name: 'Record',
                columns: {
                    
                    id:{ primaryKey: true, autoIncrement: true , enableSearch: true },
                    date : { dataType : DATA_TYPE.DateTime},
                    title :  {dataType : DATA_TYPE.String},
                    comment :  {dataType : DATA_TYPE.String},
                    
                }
            },
        ]
    }

    private static _connection : Connection ;

    

    

    private  constructor(){       

       
      
        Controller._connection = new Connection();
        Controller._connection.addPlugin(workerInjector);
        Controller._connection.initDb(Controller._database);


       
    }

    public static getController(){
        if(!Controller._instance)
            Controller._instance = new Controller();       
        return Controller._instance;
        
        
    }

    public async create(entry:DiaryEntry){

        let value :Record<string,any>= entry.toObject();
        value.id = undefined;

        return await Controller._connection.insert({
            into: 'Record',
            values: [value]
        });
       

    }

    public async read(id:number){
       
       
        var results =  await Controller._connection.select({
            from: 'Record',
            where :{
                id : id
            }
                    
          
        });
        
        return DiaryEntry.fromObject(results[0]);

    }

    public async readAll(){     


        var results =  await Controller._connection.select({
            from: 'Record',
            order : {
                by : 'id',
                type :'desc'
            },
                    
          
        });
       
        return results.map(result => DiaryEntry.fromObject(result));
       


    }

    public async update(entry:DiaryEntry){
        let value :any = entry.toObject();
        if(value.id){
        let id = value.id;        
        // value = {
        //     date : value.date,
        //     title : value.title,
        //     comment : value.comment,
        // }

        await Controller._connection.update({ 
            in: "Record",
            set: value,
            where: {
                id : id,
             
          },
      });
      
    }
      
   
    }

    public async delete(entry:DiaryEntry){
        let value = entry.toObject();
        if(value.id){
       

        var noOfRowsUpdated = await Controller._connection.remove({ 
            from: "Record",
           
            where: {
                id : value.id,
             
          },
      });
    }
      
    }

    public async deleteAll(){
        Controller._connection.clear('Record');
   

    }

}