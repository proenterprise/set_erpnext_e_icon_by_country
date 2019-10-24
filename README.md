# set_erpnext_e_icon_by_country
Sets ERPNext E icon flag to the set country

# Introduction

We want ERPNext to automatically change from its “E” icon to the default country flag so that there’s less chance for mistaking the entity you’re working in.

ERPNext program code is shared across all sites within each bench environment, so we can not simply specify the image for each site.

The best way to implement the solution is to programmatically set the image url using the default country in ERPNext > Setup > Global Defaults > country.

# Steps
## 1. Upload Flag Images
Upload to directory: {bench}/apps/erpnext/erpnext/public/images/		
Link to country flag images: 
https://drive.google.com/open?id=1SyGhk20Qq_n5uJjD_Qfti1I4ha6MoSf0

Note: unzip and place within .../images/ without their folder


## 2. Replace E-Icon Code
            File location: {bench-folder}/apps/erpnext/erpnext/public/js/conf.js
	
Code to remove:

     $('.navbar-home').html('<img class="erpnext-icon" src="'+
                        frappe.urllib.get_base_url()+'/assets/erpnext/images/erpnext-icon.svg" />');

Note: Sometimes this code is absent. It’s usually next to frappe.help_feedback_link...

Replace with the following code:

    frappe.model.get_value('Global Defaults', {'name': 'Global Defaults'}, 'country',
    function(d) {
			var country_raw = d["country"];
			var country = country_raw.toLowerCase();

			//list of countries
			var countries = ["zambia", "zimbabwe", "south africa", "namibia", "botswana",
					"lesotho",  "mozambique",  "democratic republic of congo", "the democratic republic of congo",
					"congo, the democratic republic of the", "congo", "iceland", “swaziland” ];

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

## 3. Run Build Command
   cd ~/erpnext && bench build
## 4. Confirm Effect
After code is rebuilt. Press SHIFT + F5 in your browser.



# Adding New Countries

Download the appropriate svg from flaticon.com and upload to the /images folder as shown in Step 1

Add the country name to the countries array in Step 2
As it appears in ERPNext but in lower case


# Known issues
- Bench update will require --reset flag, i.e bench update --reset
- Above resets ERPNext to its latest default code and necessitates replacement of the code each time ERPNext is updated
- A permanent fix would involve placing the code in a custom app but this outside the scope of this task

# Possible improvements
- Add all countries


# References and Credits
Images downloaded from https://www.flaticon.com
