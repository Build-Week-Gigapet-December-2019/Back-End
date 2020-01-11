const db = require('../db/dbConfig.js');
const Model = require('./model.js');

describe('model', () => {
  describe('find', () =>{

    it('should return the contents of the table', async() =>{

      const parents = await Model.find('parents')
      expect(parents).toHaveLength(4);
       

    })

  })
  
  
  
  
  
  
  
  // beforeEach(async () => {
    // this function executes and clears out the table before each test
    // await db('food_entries').truncate();
    // await db('children').truncate();
    // await db('parents').truncate();
  // });
});
