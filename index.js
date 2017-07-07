//(npm install --botbuilder and restify before)
let restify = require("restify");
let builder = require ("botbuilder");

const connector = new builder.ChatConnector();
// Create Bot
var bot = new builder.UniversalBot(connector);

const server = restify.createServer();

server. post('/api/messages', connector.listen());
server.listen(process.env.port || process.env.PORT || 3978, '::', () =>{
    console.log('Server Up');
});

//Dialog Handling

bot.dialog('/', [

    function(session){
    //start Dialog
    session.beginDialog('/askName');
    },

    function(session, results){
     session.send('Hello %s!', results.response);
    }
]);

bot.dialog('/askName', [

    function(session){
        builder.Prompts.text(session, 'Hi! What is your name');
    },

    function (session, results){
        //End Dialog
        session.endDialogWithResult(results);
    }

]);
