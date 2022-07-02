

import  PouchDB from 'pouchdb';
import diaryEntry from "./model";




export default class Controller{

    private static _instance? : Controller;
    private static _db : PouchDB.Database; 

    private constructor(){

        Controller._db = new PouchDB("DairyDB");
       
    }

    public static getController(){
        if(!Controller._instance)
            Controller._instance = new Controller();       
        return Controller._instance;
        
        
    }

    public async create(entry:diaryEntry){
       
        // console.log('inside create controller');
        // console.log(entry.toObject());
        return await Controller._db.post(entry.toObject());

    }

    public async read(id:string){
       
        let result = await Controller._db.get(id);
          
        if(result) return diaryEntry.fromObject(result);
        return;

    }

    public async readAll(){
        
        
        let results : any =  await Controller._db.allDocs({include_docs: true,});
        // results = await results.rows.map((row: { id: any; }) => row.id);
        // results = await results.map((result: string) => Controller._db.get(result));
        //results = results.map((result: any) => diaryEntry.fromObject(result));
        return results.rows.map((row: Record<string,any>) => diaryEntry.fromObject(row.doc));
       //return results;


    }

    public async update(entry:diaryEntry){
   
    }

    public delete(entry:diaryEntry){

    }

}