import "fake-indexeddb/auto";
import Controller from './controller';

import DiaryEntry from './model';

test('test indexd db',async ()=>{

    let controller = Controller.getController();
    let testRecord = {
        date : new Date(2022,5,22),
   
        hightlight : '',
        title: 'phone',
        comment : 'comment',
    }
    let testData = DiaryEntry.fromObject(testRecord);
    
    
    await controller.create(testData);
    await controller.create(DiaryEntry.fromObject(testRecord));
    let res = await controller.create(DiaryEntry.fromObject(testRecord));
    console.log(res);

    let records = await controller.readAll();
    console.log(records);
    


});