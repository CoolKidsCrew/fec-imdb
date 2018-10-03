var faker = require('faker');
const fs = require('fs');
const performance = require('performance-now');
var csv = require('csv');

// var stream = fs.createWriteStream('./data.csv');
var stream = fs.createWriteStream('./data.tsv');


function generateData() {
  let start = performance(); //start time
  let counter = 0;

  write();

  function write() {
    let flag = true;
    
    //do-while loop
    do {
      // if(counter === 0) {
      //   stream.write('id,Title,Year,Poster\n'); //make the header line for CSV //no need for PG and TSV;
      // }
      counter++;
      if (counter % 100000 === 0) console.log(counter); 
      if(counter === 10000000) {
        //last write

        //CSV//
        // stream.write(counter + ',' + faker.random.word() + ',' + Math.floor(Math.random()*(2020 - 1920)+1920) + ',' + `https://picsum.photos/182/268/?image=${Math.floor(Math.random()*1000)}` + '\n', 'utf-8' ,()=> {
        
        //TSV//        
        stream.write(counter + '\t' + faker.random.word() + '\t' + Math.floor(Math.random()*(2020 - 1920)+1920) + '\t' + `https://picsum.photos/182/268/?image=${Math.floor(Math.random()*1000)}` + '\n', 'utf-8' ,()=> {
        stream.end();
        });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.

        //CSV//
        // flag = stream.write(counter + ',' + faker.random.word() + ',' + Math.floor(Math.random()*(2020 - 1920)+1920) + ',' + `https://picsum.photos/182/268/?image=${Math.floor(Math.random()*1000)}` + '\n', 'utf-8');
        
        //TSV//
        flag = stream.write(counter + '\t' + faker.random.word() + '\t' + Math.floor(Math.random()*(2020 - 1920)+1920) + '\t' + `https://picsum.photos/182/268/?image=${Math.floor(Math.random()*1000)}` + '\n', 'utf-8');
      }
    } while (counter < 10000000 && flag);
    if (counter < 10000000) {
      // had to stop early!
      // write some more once it drains
      stream.once('drain', write)
    }
  }
  stream.on('finish', () => {
    let end = performance(); //end time
    console.log(`${(end - start)/1000} seconds`);
  })
}
//draining
  //handle async for RAM crowding. 
  //especially for T2 micro
generateData();


// mongoimport --host localhost:27017 -d fmdb -c Movies --type csv --file dir\data.csv --headerline --mode insert
// \copy Movies from 'dir\data.tsv' DELIMITER E'\t'