function Portal() {
    this.name = ''
    this.Docs = [];
    this.Fields = [];
};

function Doc() {
    this.name = ''
}

function Field() {
    this.name = '',
    this.id = '',
    this.class = '',
    this.type = '',
    this.help = ''
}

Portal.prototype.addField = function(name, id, htmlclass, type, help) {
    field = new Field();
    field.name = name;
    field.id = id;
    field.class = htmlclass;
    field.type = type;
    this.help = help;
    
    Portal.Fields.push(field);
}