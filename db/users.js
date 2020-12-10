var records = [
    { id: 1, name: 'Jack', email: 'jack@example.com', password: 'secret'},
    { id: 2, name: 'Jill', email: 'jill@example.com', password: 'birthday'}
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}
exports.findByName = function(name, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.name === name) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.findByEmail = function(email, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.email === email) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
} 
const userName = '';
const userEmail = '';
const userId = '';
const userPwd = '';
document.getElementById('createBtn').addEventListener('click', makeNewAccount);

function makeNewAccount() {
  userName = document.getElementById('inputName').value;
  userEmail = document.getElementById('inputEmail').value;
  userPwd = document.getElementById('inputPwd').value;
  userId = records.length;
  newRecord = {
    id: userId, 
    name: userName, 
    email: userEmail, 
    password: userPwd      
  };
  records = records.concat(newRecord);
  const confirmDiv = document.getElementById('confirmAccount');
  confirmDiv.innerHTML = `<p>Your Account Is Created,` +  userName + `</p>` + `<a href="profile.ejs">Click Here to Go to Your Profile</a>`;
}