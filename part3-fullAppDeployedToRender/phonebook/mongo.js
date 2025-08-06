const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Provide the password to query all people in the database. Or...')
    console.log('Provide password, name and phone number of the person you wish to add to the database')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.gb1xi.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
        name: String,
        phone: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3]) {//some data has been provided as the name

    if (process.argv[4]) { //some data has been provided as the phone number
        //we have the two pieces of info to create a new contact
        const person = new Person({
            name: process.argv[3],
            phone: process.argv[4]
        })

        person.save().then(result => {
            console.log(`Person added: ${result}`)
            mongoose.connection.close()
        })
    } else {
        //no data provided for the phone nunber
        console.log('it seems you only provided a name and no phone number. Please provide both!')
        process.exit(1)
    }} else {
        //no data provided for the name nor the phone number, meaning that a list of all contacts should be provided
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
    }