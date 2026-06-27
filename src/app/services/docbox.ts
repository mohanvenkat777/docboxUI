import { Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class docbox {
  constructor(
    private _snackBar: MatSnackBar,
  ){}
  pageloader: boolean = false;
  
  loader(status){
    this.pageloader = status;
  };
  getBase64(event) : any {
      return new Promise(resolve => {
        var file = event;
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function(event) {
          resolve(event.target.result);
        };
        // Convert data to base64 
        reader.readAsDataURL(file);
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }
  getDateTime(){
    var date = new Date();
    var month = (date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if(month.length == 1){
      month = "0" + month
    }
    if(day.toString().length == 1){
			day = "0" + day
    } 
    var time;
		var hour = date.getHours();
		var minutes = (date.getMinutes()).toString();
		
		if(minutes.toString().length == 1){
			minutes = "0" + minutes
		};
		if(hour.toString().length > 1){
			if(hour == 12)
			{
				time = hour+":" +minutes+ "PM"
			}else{
				time = hour - 12 +":" +minutes + "PM"
			}			
			
		}else{
			time = hour+":" +minutes+ "AM"
		}
    var NowDate = day + "-" + month + "-" + date.getFullYear() + " " + time;
    
    return NowDate;
  }
}
