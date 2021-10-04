import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(private apiService:ApiService,private fb: FormBuilder,private fm: FlashMessagesService) {}

    // value initialization
    data: any           = '';
    email_id: any       = '';
    mobile_number: any  = '';
    address: any        = '';
    fullname: any       = '';
    usertabledata: any  = '';
    id: any             = '';
    showMsg: boolean    = false;

    ngOnInit(): void {
      this.getallteacherdata();
      //from validation
      this.userForm   = new FormGroup({
        fullname      : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
        email_id      : new FormControl('',[Validators.required,Validators.email]),
        mobile_number : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9 ]{10}")]),
        address       : new FormControl('',Validators.required),
      });
    }
    //all value fetch from DB
    getallteacherdata(){
      this.apiService.getallteacherdata().subscribe(res=>{this.usertabledata=res});
    }
    //value reset 
    resetField(){
      this.id             = '';
      this.email_id       = '';    
      this.mobile_number  = '';
      this.fullname       = '';
      this.address        = '';
    }
    // call from validation
    get validation() {
       return this.userForm.controls; 
    }
    // insert data into Db
    insertTeacherData(){
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }else{
          let email_id      = this.email_id;
          let mobile_number = this.mobile_number;
          let fullname      = this.fullname;
          let address       = this.address;
          let body = {
            email_id      : email_id,
            mobile_number : mobile_number,
            fullname      : fullname,
            address       : address,
          }
          this.apiService.insertTeacherData(body).subscribe(res=>{
            this.successMessage();
            this.getallteacherdata();
            this.resetField();
            this.submitted = false;
          });
        }
    }
    //success flash message
    successMessage(){
        this.fm.show('!!! Data Save Successfully', { cssClass: 'alert-success', timeout: 5000 });
    }
    //update flash message
    updateMessage(){
      this.fm.show('!!! Data Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
    }
    //single user data fetching
    fetchData(data){
      this.id             = data['_id'];
      this.email_id       = data['email_id'];    
      this.mobile_number  = data['mobile_number'];
      this.fullname       = data['fullname'];
      this.address        = data['address'];
    }
    // data delettion by id
    deleteTeacherData(id: any){
      if(confirm('Do You Want To Delete The Record ?')){
          this.apiService.deleteTeacherData(id).subscribe(res=>{this.deleteStudetDataByTeacherId(id);this.getallteacherdata()});
      }
    }
    //deleteStudentDataByTeacherId
    deleteStudetDataByTeacherId(id){
      this.apiService.deleteStudetDataByTeacherId(id).subscribe();
    }
    // update the user data by id
    updateTeacherData(data){
      let body = {
        email_id     : this.email_id,
        mobile_number: this.mobile_number,
        fullname     : this.fullname,
        address      : this.address,
      }
      this.apiService.updateTeacherData(this.id,body).subscribe(res=>{
        this.updateMessage();
        this.getallteacherdata();
        this.resetField();
        this.submitted = false;
      });
    }
}


