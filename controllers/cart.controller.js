var db = require('../db');

module.exports.addToCart = function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  //Khoi tao so lan them productId do vao gio hang.
  var count = db
    .get('sessions')  //tro den database 'sessions'
    .find({ id: sessionId })  //so sanh sessionId duoc truyen vao voi id cua doi tuong ton tai trong sessions.
    .get('cart.' + productId, 0)  //Luu productId vao cart va khoi tao so lan add la 0.
    .value(); //Lay gia tri so la so lan them san pham do vao gio hang.


  //cong don so lan add product Id do len.
  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/products');
};