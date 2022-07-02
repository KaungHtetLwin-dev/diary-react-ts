import "fake-indexeddb/auto";
import Controller from './controller';

import diaryEntry from './model';

test('test indexd db',async ()=>{

    let controller = Controller.getController();
    let testRecord = {
        date : new Date(2022,5,22).toISOString(),
        project : 'Hangout',
        projectCategory : 'Firends',
        hightlight : '',
        title: 'phone'
    }
    let testData = diaryEntry.fromObject(testRecord);
    
    
    await controller.create(testData);
    await controller.create(diaryEntry.fromObject(testRecord));
    let res = await controller.create(diaryEntry.fromObject(testRecord));
    //console.table(res);
    //console.log(await controller.read(res.id));
   


    //expect(result?.toObject()).toEqual(testData);

    let records = await controller.readAll();
    //let values = records.rows.map(record => record.value);
    console.log(records);
 


});