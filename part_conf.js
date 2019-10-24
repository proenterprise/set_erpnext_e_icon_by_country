

	/*
		1. requires corresponding country flags in {bench}/apps/erpnext/erpnext/public/images/
				a. images can be found at: https://drive.google.com/open?id=1lGe8riMPijrOvzERh-7Hq4TBGaUq2ytC  OR flaticon.com
				b. unzip and place within .../images/ without their folder

		2. place in this code {bench}/apps/erpnext/erpnext/public/js/conf.js overriding \
								$('.navbar-home').html('<img class="erpnext-icon" src="'+
											frappe.urllib.get_base_url()+'/assets/erpnext/images/erp-icon.svg" />');
	*/

	frappe.model.get_value('Global Defaults', {'name': 'Global Defaults'}, 'country',
  	function(d) {
			var country_raw = d["country"];
			var country = country_raw.toLowerCase();

			//list of countries
			var countries = ["zambia", "zimbabwe", "south africa", "namibia", "botswana",
					"lesotho",  "mozambique",  "democratic republic of congo", "the democratic republic of congo",
					"congo, the democratic republic of the", "congo", "iceland", ];

			//If the set country is among the countries in our custom flags list, use custom flag. Otherwise use default
			if( countries.includes(country) ){
				$('.navbar-home').html('<img class="erpnext-icon" src="'+
											frappe.urllib.get_base_url()+'/assets/erpnext/images/'+ country +'.svg" />');
			}
			else {
				$('.navbar-home').html('<img class="erpnext-icon" src="'+
						frappe.urllib.get_base_url()+'/assets/erpnext/images/erp-icon.svg" />');
			}
  }); //end of frappe.model.get_value
