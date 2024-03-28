( function($) {
	$(document).on('favorites-updated-single', function(event, favorites, post_id, site_id, status){
	  if (favorites.length > 0) {
	  	 var posts = favorites[0].posts;
	  	 var objects = Object.keys(posts);
	  	 console.log('objects>>');
	  	 console.log(objects);
	  	 if (objects.length > 0) {
	  	 	var first_post_id = objects[0];
	  	 	if (first_post_id == 1 && objects.length == 1) {
		  	 	$('.widget_bookmarks_entries .favoreite-inquiry').hide();
		  	 	console.log('hide');
		  	 	console.log(first_post_id);
	  	 	}
	  	 	else{
	  	 		$('.widget_bookmarks_entries .favoreite-inquiry').show();
	  	 		console.log('show');
	  	 	}
	  	 }
	  	 else{
	  	 	$('.widget_bookmarks_entries .favoreite-inquiry').hide();
	  	 	console.log('hide 222');
	  	 }
	  	 console.log(post_id + ' ' + status);
	  	 if (status == 'active') {
			favorite_list_check_on('pro_c_' + post_id,true);
	  	 }
	  	 else{
			favorite_list_check_on('pro_c_' + post_id,false);
	  	 }
	  }
	  console.log('favorites-updated-single');
	  console.log(favorites);
	});


	$(document).on('change', 'input[name="itemchecklists"]', function(){
      console.log(this.id + ' ' + this.checked);
      favorite_list_check_on(this.id,this.checked);
	});

} ) ( jQuery );