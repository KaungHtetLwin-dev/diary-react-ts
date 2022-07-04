import "fake-indexeddb/auto";
import Controller from './controller';

import DiaryRecord from './model';

test('test indexd db',async ()=>{

    let controller = Controller.getController();
    let testRecord = {
        date : new Date(2022,5,22),
   
        hightlight : '',
        title: 'phone',
        comment : 'comment',
    }
    let testData = DiaryRecord.fromObject(testRecord);
    
    
    await controller.create(testData);
    await controller.create(DiaryRecord.fromObject(testRecord));
    let res = await controller.create(DiaryRecord.fromObject(testRecord));
    console.log(res);

    let records = await controller.readAll();
    console.log(records);
    


});