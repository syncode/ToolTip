
var tooltip = {
	// user editable parameters
	distance: 3,
	delay_in: 600,
	$: $(),

	//
	timeout: null,
	win_height: 0,
	win_width: 0,
	$target: $(),
	$target_height: 0,
	$target_width: 0,
	$target_offset_left: 0,
	$target_offset_top: 0,

	init: function() {
		tooltip.createTipEllement();
		tooltip.resize();
		$("[tooltip]").live("mouseenter", tooltip.show);
		$("[tooltip]").live("mouseleave", tooltip.close);
	},

	resize: function(){
		tooltip.win_width = $(document).width();
		tooltip.win_height = $(document).height();
		console.log("resized");
	},

	createTipEllement: function(){
		tooltip.$ = $('<div/>', {
			id: 'tooltip_ellement'
		});
		tooltip.$.appendTo('body');
	},

	show: function(e){
		tooltip.timeout = setTimeout(tooltip.display, tooltip.delay_in);
		tooltip.$target = $(e.currentTarget);
		t_offset = tooltip.$target.offset();

		// set target dimensions
		tooltip.$target_height = e.currentTarget.offsetHeight;
		tooltip.$target_width = e.currentTarget.offsetWidth;
		tooltip.$target_offset_left = t_offset.left;
		tooltip.$target_offset_top = t_offset.top;
 	},

 	display: function(){
		tooltip.$.html( tooltip.$target.attr("tooltip") );
		tooltip.position();
		tooltip.$.show();
 	},

	close: function(){
		clearTimeout( tooltip.timeout );
		tooltip.$.hide();
	},

	position: function(){
		tooltip.$.removeClass();
		console.log(tooltip.$target);
		if( tooltip.$target.hasClass("menubar-nav-item") ){
			tooltip.position_under();
		}else{
			tooltip.position_asaid();
		}
	},

	position_asaid: function(){
		// setting left
		var pos = tooltip.calculate_h_right_pos();
		if( pos > tooltip.win_width - tooltip.$target_width ){
			pos = tooltip.calculate_h_left_pos();
			tooltip.$.addClass("east");
		}else{
			tooltip.$.addClass("west");
		}
		tooltip.$.css({ left: pos + "px"});

		// setting top
		pos = tooltip.calculate_v_center_pos();
		if( pos < tooltip.$target_height/2 + tooltip.distance ){
			pos = tooltip.calculate_v_bottom_pos();
			if(pos > tooltip.win_height - tooltip.$.width() ){
				tooltip.$.addClass("bottom");
				pos = tooltip.calculate_v_top_pos();
			}else{
				tooltip.$.addClass("top");
			}
		}else{
				tooltip.$.addClass("middle");
		}
		tooltip.$.css({ top: pos + "px"});
	},

	position_under: function(){
		tooltip.$.css({ left: tooltip.calculate_h_center_pos() + "px"});
		tooltip.$.css({ top: tooltip.calculate_v_bottom_pos() + "px"});
		tooltip.$.addClass("north center");
	},

	calculate_h_right_pos: function(){
		return tooltip.$target_offset_left + tooltip.$target_width + tooltip.distance;
	},

	calculate_h_left_pos: function(){
		return tooltip.$target_offset_left - tooltip.$.outerWidth() - tooltip.distance;
	},

	calculate_h_center_pos: function(){
		return (tooltip.$target_offset_left*2 + tooltip.$target_width)/2 - tooltip.$.outerWidth()/2;
	},
		
	calculate_v_bottom_pos: function(){
		return tooltip.$target_offset_top + tooltip.$target_height + tooltip.distance;
	},

	calculate_v_top_pos: function(){
		return tooltip.$target_offset_top - tooltip.$target_height - tooltip.distance;
	},

	calculate_v_center_pos: function(){
		return (tooltip.$target_offset_top*2 + tooltip.$target_height)/2 - tooltip.$.outerHeight()/2;
	},

}

$(tooltip.init);

$(window).resize(function() {
    tooltip.resize();
});
