import  PouchDB from 'pouchdb';
import diaryEntry from "./model";

export default class Controller{

    private static _instance? : Controller;
    private static _db : PouchDB.Database; 

    private constructor(){

        Controller._db = new PouchDB("DiaryDB");
       
    }

    public static getController(){
        if(!Controller._instance)
            Controller._instance = new Controller();       
        return Controller._instance;
        
        
    }

    public async create(entry:diaryEntry){
        return await Controller._db.post(entry.toObject());

    }

    public async read(id:string){
       
        let result = await Controller._db.get(id);
          
        if(result) return diaryEntry.fromObject(result);
        return;

    }

    public async readAll(){     
        let results : any =  await Controller._db.allDocs({include_docs: true,});
        return results.rows.map((row: Record<string,any>) => diaryEntry.fromObject(row.doc));
       


    }

    public async update(entry:diaryEntry){
        let  record,newRecord;
        if(entry.id){
            record = await Controller._db.get(entry.id);
            newRecord = {...entry.toObject(), _rev :record._rev};
            return await Controller._db.put(newRecord);
            
        }
   
    }

    public async delete(entry:diaryEntry){
        let  record;
        if(entry.id){
            record = await Controller._db.get(entry.id);
            return await Controller._db.remove(record);
        }
    }

    public async deleteAll(){

     let results : any =  await Controller._db.allDocs();
    for(let i = 0; i < results.rows.length; i++)
       Controller._db.remove(results.rows[i].id,results.rows[i].value.rev);       
    

    }

}