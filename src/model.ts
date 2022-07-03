
export default class diaryEntry{

    private _id? : number ;
    private _date : Date = new Date(1970,1,1);
    private _week : number = -1;
    public project : String = '';
    public projectCategory : String = '';
    public hightlight : String  = '';
    public title : String = '';
    private _time : number = 0;
    private _will : number = 0;

    private _health : number = 0;
    private _money : number = 0;
    private _score : number = 0;
    public comment : String = '';

    

    public get id (): number|undefined{ return this._id;}

    public set id (id:number|undefined){ this._id = id;}

    public get date () : Date  { return this._date ;}

    public set date (date : Date ){
       
    
            
            this._date = date;
            //this._week = Math.floor(date.getDay()/7)+1;
        
    }

    public get week () : number {return this._week;} 

    public get time() {return this._time;}
    public get will() {return this._will;}
    public get health() {return this._health;}
    public get money() {return this._money;}
    public get score() {return this._score}

    public set time(time:number){
        this._time = time;
        this.updateScore();

    }

    public set will(will:number){
        this._will = will;
        this.updateScore();
    }

    public set health(health:number){
        this._health = health;
        this.updateScore();
    }

    public set money(money:number){
        this._money = money;
        this.updateScore();
    }

    private  updateScore(){
        this._score = (this._time + this._will + this._health + this._money )/4
    }

    public toObject(){
        
        return {
            id : this._id,
            date : this._date,
            week : this._week,
            project : this.project,
            projectCategory: this.projectCategory,
            highlight : this.hightlight,
            title : this.title,
            time : this._time,
            will : this._will,
            health : this._health,
            money : this.money,
            score : this.score,
            comment : this.comment,

        }
    }

    public static fromObject(obj:any){
    
        let entry = new diaryEntry();
       
        
        if(obj.id) entry.id = obj.id;       
        if(obj.date) entry.date = obj.date;
        if(obj.project) entry.project = obj.project;
        if(obj.projectCategory) entry.projectCategory = obj.projectCategory;
        if(obj.highlight) entry.hightlight = obj.highlight;
        if(obj.title) entry.title = obj.title;
        if(obj.time) entry.time = obj.time;
        if(obj.will) entry.will = obj.will;
        if(obj.health) entry.health = obj.health;
        if(obj.money) entry.money = obj.money;
        if(obj.comment) entry.comment = obj.comment;
      
        return entry;


    }

    public toCSVRow(){

        
        let dateString = this.date.getDate()+'.'+this.date.getMonth()+"."+this.date.getFullYear();
        let csvString = '"'+dateString+'","'+this.title+'","'+this.comment+'"\n';
        return csvString;

    }

  


}