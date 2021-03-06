var mongoose = require('mongoose');

var MessagesSchema = mongoose.Schema({
  username: String,
  origMessage: String,
  chatroom: String,
  createdAt: String,
  arMessage: String, //Arabic
  'zh-CNMessage': String, //Simplified Chinese
  enMessage: String, //English
  frMessage: String, //French
  deMessage: String, //German
  jaMessage: String, //Japanese
  koMessage: String, //Korean
  ruMessage: String, //Russian
  esMessage: String //Spanish
});

var Message = mongoose.model('Message', MessagesSchema);

var saveTranslations = (doc) => {
  var newMessage = new Message(doc);
  newMessage.save(function(err) {
    if (err) { console.log(err); }
  });
}

var getMessages = (chatroom, toLang) => {
  var chatroom = chatroom || 'Lobby';
  var toLang = toLang + 'Message' || 'zh-CNMessage';
  return Message.find({chatroom: chatroom}, `username ${toLang} createdAt`).exec();
}

var ChatroomsSchema = mongoose.Schema({
  chatroom: String,
  password: String
});

var Chatroom = mongoose.model('Chatroom', ChatroomsSchema);

var createRoom = (room, cb) => {
  var newRoom = new Chatroom(room);
  newRoom.save(err => {
    if (err) cb(err);
    else cb(null);
  });
}

var getRoomByName = (roomname, cb) => {
  Chatroom.findOne({ chatroom: roomname }, (err, room) => {
    if (err) cb(err, null);
    else cb(null, room);
  })
}

exports.saveTranslations = saveTranslations;
exports.getMessages = getMessages;
exports.Chatroom = Chatroom;
exports.createRoom = createRoom;
exports.getRoomByName = getRoomByName;