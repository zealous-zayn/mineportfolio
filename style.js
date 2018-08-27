let slideShow=() =>{
			
			let x = document.getElementById('checkClass')
			let y = document.getElementById('icon')
			let z = "fa fa-chevron-circle-left"
			if(x.style.display === "none"){
				x.style.display="flex"
				y.className="fa fa-chevron-circle-right"	
				} else {
				x.style.display="none"
				y.className="fa fa-chevron-circle-left"
			}

}

