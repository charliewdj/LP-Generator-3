function check_all(){
	var products = Cookies.getJSON('CHECKED_PRODUCTS');
	console.log(typeof products);
	if ( typeof products == 'undefined') {
		products = [];
	}
	jQuery( ".seek .seekArticle input[name='itemcheck']" ).each(function( index ) {
	  	let e_id = this.id.split('_');
	  	if (e_id.length > 1) {
	  		products.push(e_id[1]);
	  	}
	});
	products = jQuery.unique(products);
	Cookies.set('CHECKED_PRODUCTS',products);
	console.log(products);
}

function check_on(id,state){
	if (id) {
		if (state == true) {
			var products = Cookies.getJSON('CHECKED_PRODUCTS');
			console.log(typeof products);
			if ( typeof products == 'undefined') {
				products = [];
			}
			let e_id = id.split('_');
		  	if (e_id.length > 1) {
		  		products.push(e_id[1]);
		  	}
			products = jQuery.unique(products);
			Cookies.set('CHECKED_PRODUCTS',products);
			console.log(products);
		}
		else{
			var products = Cookies.getJSON('CHECKED_PRODUCTS');
			console.log(typeof products);
			if ( typeof products == 'undefined') {
				products = [];
			}
			let e_id = id.split('_');
		  	if (e_id.length > 1) {
		  		products = jQuery.grep(products, function(value) {
				  return value != e_id[1];
				});
		  	}
			products = jQuery.unique(products);
			Cookies.set('CHECKED_PRODUCTS',products);
			console.log(products);
		}
	}
}

function favorite_list_check_on(id,state){
	if (id) {
		if (state == true) {
			var products = Cookies.getJSON('FAVORITES_CHECKED_PRODUCTS');
			console.log(typeof products);
			if ( typeof products == 'undefined') {
				products = [];
			}
			let e_id = id.split('_');
		  	if (e_id.length > 2) {
		  		products.push(e_id[2]);
		  	}
			products = jQuery.unique(products);
			Cookies.set('FAVORITES_CHECKED_PRODUCTS',products);
			console.log(products);
		}
		else{
			var products = Cookies.getJSON('FAVORITES_CHECKED_PRODUCTS');
			console.log(typeof products);
			if ( typeof products == 'undefined') {
				products = [];
			}
			let e_id = id.split('_');
		  	if (e_id.length > 2) {
		  		products = jQuery.grep(products, function(value) {
				  return value != e_id[2];
				});
		  	}
			products = jQuery.unique(products);
			Cookies.set('FAVORITES_CHECKED_PRODUCTS',products);
			console.log(products);
		}
	}
}

