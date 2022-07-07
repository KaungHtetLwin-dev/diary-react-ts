
export default class DiaryRecord{

    public id? : number ;
    public date : Date = new Date(1970,1,1);
    public title : String = '';
    public comment : String = '';
    public time : number = 0;
    public hightlight : String  = '';

    public getDateString(){
        let dateSeparator = '.';
        let dateString = this.date.getDate() + dateSeparator + 
                         (this.date.getMonth()+1) + dateSeparator + 
                         this.date.getFullYear();
        return dateString;
    }

    public toObject():Record<string,any>{
        
        return {
            id : this.id,
            date : this.date,    
            title : this.title,
            comment : this.comment,
            time : this.time,
            highlight : this.hightlight,

        }
    }

    public static fromObject(obj:Record<string,any>){
    
        let entry = new DiaryRecord();
       
        
        if(obj.id) entry.id = obj.id;       
        if(obj.date) entry.date = obj.date;       
        if(obj.title) entry.title = obj.title;
        if(obj.comment) entry.comment = obj.comment;
        if(obj.time) entry.time = obj.time;
        if(obj.highlight) entry.hightlight = obj.highlight;
      
        return entry;


    }

    public toCSVRow(){

        let comma = ',';
        let doubleQuote = '"';
        let dateSeparator = '.';

        let dateString = this.date.getDate() + dateSeparator + 
                         (this.date.getMonth()+1) + dateSeparator + 
                         this.date.getFullYear();
        
        let week = '';
        let project = '';
        let projectCategory ='';
        let will = '';
        let health = '';
        let money = '';
        let score = '';       
        // let title = this.title.replaceAll( doubleQuote, doubleQuote + doubleQuote );
        // let comment = this.comment.replaceAll( doubleQuote, doubleQuote + doubleQuote );
        // let hightlight = this.hightlight.replaceAll( doubleQuote, doubleQuote + doubleQuote );
        let title = this.title.replace(new RegExp(doubleQuote,'g'), doubleQuote+ doubleQuote);
        let comment = this.comment.replace(new RegExp(doubleQuote,'g'), doubleQuote+ doubleQuote);;
        let hightlight = this.hightlight.replace(new RegExp(doubleQuote,'g'), doubleQuote+ doubleQuote);;
        let time = this.time.toString();

      

        let csvString = doubleQuote + dateString + doubleQuote + comma +
                        doubleQuote + week + doubleQuote + comma +
                        doubleQuote + project + doubleQuote + comma +
                        doubleQuote + projectCategory + doubleQuote + comma +
                        doubleQuote + hightlight + doubleQuote + comma +
                        doubleQuote + title + doubleQuote + comma +
                        doubleQuote + time + doubleQuote + comma +
                        doubleQuote + will + doubleQuote + comma +
                        doubleQuote + health + doubleQuote + comma +
                        doubleQuote + money + doubleQuote + comma +
                        doubleQuote + score + doubleQuote + comma +
                        doubleQuote + comment + doubleQuote + comma +'\n';
        

        return csvString;

    }

  


}