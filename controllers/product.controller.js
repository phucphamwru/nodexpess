var db = require('../db')

module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1; // <=> so trang thu n
	var perPage = 4;	// x - so phan tu trong 1 page.

	var start = (page - 1) * perPage;
	var end = page * perPage;

	res.render('products/index', {
		products: db.get('products').value().slice(start, end)
	});
};