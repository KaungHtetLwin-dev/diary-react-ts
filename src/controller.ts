import { Connection, DATA_TYPE } from 'jsstore';
import workerInjector from "jsstore/dist/worker_injector";
import DiaryRecord from "./model";
export default class Controller{

    private static _instance? : Controller;
    private static _connection : Connection ;
   
    // database schema
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
                    time : {dataType : DATA_TYPE.Number},
                    highlight : { dataType : DATA_TYPE.String}
                    
                }
            },
        ]
    }

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

    public async create(record:DiaryRecord){       
        record.id = undefined;
        
        return await Controller._connection.insert({
            into: 'Record',
            values: [ record.toObject() ]
        });
       

    }

    public async read(id:number){  
        var results : Record<string,any>[] =  await Controller._connection.select({
            from: 'Record',
            where :{
                id : id
            }
        });
        
        return DiaryRecord.fromObject(results[0]);

    }

    public async readAll(){   
        var results: Record<string,any>[] =  await Controller._connection.select({
            from: 'Record',
            order : {
                by : 'id',
                type :'desc'
            },                     
        });       
        return results.map(result => DiaryRecord.fromObject(result));       
    }

    public async update(entry:DiaryRecord){
        let value :any = entry.toObject();
        if(value.id){             
            return await Controller._connection.update({ 
                in: "Record",
                set: value,
                where: {
                    id : value.id             
            },
         });      
        }      
    }

    public async delete(record:DiaryRecord){       
        if(record.id){
            return await Controller._connection.remove({ 
                from: "Record",           
                where: {
                    id : record.id,             
                },
            });
        }      
    }

    public async deleteAll(){
        return await Controller._connection.clear('Record');
    }

}