import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor( @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<DialogComponent>) { 

    if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
    this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
    this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
  }
}


  clickDia() : void{
    this.dialogRef.close(true);
  }
  ngOnInit(): void {
  }

}
