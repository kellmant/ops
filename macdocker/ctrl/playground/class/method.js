// class method constructor 
// server json data space
// dynamically generated from an array of objects
// each object holding the following values from keystore
// that.ip, that.name, that.group, that.uid, that.uri
// GET /that.group/tenants

module.exports = class ClassObj {
	constructor (that) {
            let myobj = this.id
            this[myobj] = {
                'id': that.id,
                'name': that.name,
                'description':that.description + " Group", 
                'enabled': true
            } 
            return this[myobj]
        }
    }
