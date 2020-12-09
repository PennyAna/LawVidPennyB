var records = [
    { id: 1, email: 'jack@example.com', name: 'Jack', password: 'secret'},
    { id: 2, email: 'jill@example.com', name: 'Jill', password: 'birthday'}
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

exports.findUserByName = function(name, cb) {
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

exports.findUserByEmail = function(email, cb) {
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

/* exports.findUserByEmail = function(email, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.email === email) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
} */
/* 
exports.simpleCreate = function(email, password, name, cb) {
  // check if exists; and return error if it does
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.email === email) {
      cb(new Error('email' + email + ' already exists'));
    }
    else {
      return partTwo(email, password, name, cb)
    }

  partTwo = function(email, password, name, cb) {
          partThree(email, password, name, cb)
      })
  }

  partThree = function(email, password, cb) {
  db.query(
          cb(null, (users.length == 1) ? users[0] : false)
      })
  }
  //need to insert new account info into record and return info to be displayed
  //once local db works, utilize sql commands to check, insert, and retrieve in same fashion */