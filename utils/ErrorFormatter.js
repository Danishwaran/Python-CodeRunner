//return only important error message

module.exports.changeFormat = function(err) {
  if(err.traceback) {
    return err.traceback;
  }
  else {
    let index = err.stack.indexOf(" at ");
    return err.stack.slice(0,index);
  }
}