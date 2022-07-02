import diaryEntry from "./model";


test('test diaryEntry',()=>{

    let test = new diaryEntry();
    test.date = new Date(2022,5,12);
    test.title = 'Phone';
    test.project = 'Hangout';
    test.projectCategory = 'Firends',
    console.log('date:'+test.date);
    
    console.log(test.toObject());

});