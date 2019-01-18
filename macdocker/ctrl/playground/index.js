// class method creation of datasets
//
const myinput = require('./my.json')
const mydata = {}
const myarr = 'Objects'
mydata[myarr] = []
const Classdata = require('./class/method')
const getdata = keys => new Classdata(keys)
var xlsx = require('node-xlsx')

async function procdata (indat) {
    for (var i = 0, len = indat.length; i < len; i++) {
        var newdata = xlsx.build([{name: "mySheetName", data: indat[i]}]); // Returns a buffer
    }
    return newdata
}

async function newproc (indat) {
    for (var i = 0, len = indat.length; i < len; i++) {
        mydata[myarr].push(getdata(indat[i]))
        }
    return mydata
}

procdata(myinput)
//.then(JSON.stringify)
.then(console.log)
.catch(console.error)
