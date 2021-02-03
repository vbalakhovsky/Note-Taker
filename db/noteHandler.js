const util = require("util");
const fs = require("fs");

const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//creating a method to access notes by id
class Notes {
    constructor() {
        this.sampleId = 0;
    }
    read() {
        return readFileAsyn("db/db.json", "utf8");

    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        console.log("get notes")
        return this.read().then(notes => {
            console.log(notes)
            let myNotes;
            try {
                myNotes = [].concat(JSON.parse(notes));
            }
            catch (err) {
                myNotes = [];
            }
            return myNotes;
        })

    }
    addNotes(note) {
        console.log("add notes");
        const { title, text } = note;
        const newNote = { title, text, id: ++this.sampleId }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)

    }
    
    removeNote(id) {
        console.log("remove notes");
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(updatedNotes => this.write(updatedNotes))
    }
}

module.exports = new Notes();