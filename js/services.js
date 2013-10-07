/* http://docs.angularjs.org/#!angular.service */

angular.service('Note', function(){
    return {
        query:function() { 
            var notes = [];
            for(var key in localStorage) {
                if(key.indexOf("note_") == 0) {
                    notes.push(JSON.parse(localStorage[key]));
                }
            }
            console.dir(notes);
            return notes; 
        },
        delete:function(i) {
            localStorage.removeItem("note_"+i);
        },
        get:function(i) { 
            if(localStorage["note_"+i]) return JSON.parse(localStorage["note_"+i]);
            console.log("no note for "+i);
        },
        store:function(note) {
            if(!note.hasOwnProperty('id')) {
                //yep, hack, get all notes and find highest id
                var notes = this.query();
                var highest = 0;
                for(var i=0; i<notes.length; i++) {
                    if(notes[i].id > highest) highest=notes[i].id;
                }
                note.id = ++highest;
            }
            note.updated = new Date();
            localStorage["note_"+note.id] = JSON.stringify(note);
        }
    }
    
});