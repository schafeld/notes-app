/* App Controllers */

function NoteCtrl($route) {
var self = this;

$route.when('/notes',
{template: 'partials/note-list.html', controller: NoteListCtrl});
$route.when('/notes/add',
{template: 'partials/note-edit.html', controller: NoteEditCtrl});
$route.when('/notes/edit/:noteId',
{template: 'partials/note-edit.html', controller: NoteEditCtrl});
$route.when('/notes/:noteId',
{template: 'partials/note-detail.html', controller: NoteDetailCtrl});
$route.otherwise({redirectTo: '/notes'});

$route.onChange(function(){
self.params = $route.current.params;
});

$route.parent(this);
}

function NoteListCtrl(Note_) {
    var self = this;
    self.orderProp = 'title';
    self.notes = Note_.query();

    self.delete = function(id) {
        console.log("delete "+id);
        Note_.delete(id);
        self.notes = Note_.query();
        //refreshes the view
        self.$root.$eval();
    };
    
    self.edit = function(id) {
        window.location = "./index.html#/notes/edit/"+id;
    };
}

function NoteDetailCtrl(Note_) {
var self = this;
self.note = Note_.get(self.params.noteId);

if(typeof self.note === "undefined") window.location = "./index.html";
}

function NoteEditCtrl(Note_) {
    console.log('EDIT CTRL');
    var self = this;
        
    if(self.params.hasOwnProperty("noteId")) self.note = Note_.get(self.params.noteId);
    else self.note = { title:"", body:""};

    self.cancel = function() {
        window.location = "./index.html";
    };

    self.save = function() {
        Note_.store(self.note);
        window.location = "./index.html";
    };

}
