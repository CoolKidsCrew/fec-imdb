// const dbcontroller = require("../database/controller.js");

// module.exports = {
//   get: (req, res) => {
//     // console.log("In GET...");
//     dbcontroller.retrieveAll((error, data) => {
//       if (error) {
//         res.status(404).send(error);
//       } else {
//         // console.log('in server controller get')
//         res.send(JSON.stringify(data));
//       }
//     });
//   }
// };

//*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*//
//SDC controller w/ Mongo Native//
//*~*~*~*~*~*~*~*~*~*~*~*~*~*~*//

//import the MongoDB Native Connection
const {loadDB} = require('../database/index.js') 

//*~*~*~*~*~*~*~*~*~*~*~*~*//



module.exports = {
  get: (req, res) => {
    // console.log('req params:',req.params.index)
    loadDB().collection("movies")
      .find({"Category": `cat#${req.params.index}`})
      .limit(10)
      .toArray()
      .then(data => {
        // console.log(data) 
        res.status(200);
        res.json(data);
      })
      .catch(err => {
        res.status(404).send(error);
      })
  }
};
