import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
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
    teacher_search_id: any  = '';
    teachertabledata: any  = '';
    id: any             = '';
    teacher_id: any     = '';
    showMsg: boolean    = false;

    ngOnInit(): void {
      this.getallstudentdata();
      this.getallteacherdata();
      //from validation
      this.userForm   = new FormGroup({
        fullname      : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
        email_id      : new FormControl('',[Validators.required,Validators.email]),
        teacher_id    : new FormControl('',[Validators.required]),
        mobile_number : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9 ]{10}")]),
        address       : new FormControl('',Validators.required),
      });
     }
    //all sudentdata fetch from DB
    getallstudentdata(){
      this.apiService.getallstudentdata().subscribe(res=>{this.usertabledata=res});
    }
    //all teacherdata fetch from DB
    getallteacherdata(){
      this.apiService.getallteacherdata().subscribe(res=>{this.teachertabledata=res});
    }
    // call from validation
    get validation() {
      return this.userForm.controls; 
   }
    //single user data fetching
    fetchData(data){
      this.id             = data['_id'];
      this.email_id       = data['email_id'];    
      this.teacher_id     = data['teacher_id'];
      this.mobile_number  = data['mobile_number'];
      this.fullname       = data['fullname'];
      this.address        = data['address'];
    }
    // data delettion by id
    deleteStudentData(id: any){
      this.apiService.deleteStudentData(id).subscribe(res=>{this.getallstudentdata()});
    }
    //update flash message
    updateMessage(){
      this.fm.show('!!! Data Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
    }
     // update the user data by id
     updateStudentData(data){
      let body = {
        email_id     : this.email_id,
        mobile_number: this.mobile_number,
        teacher_id   : this.teacher_id,
        fullname     : this.fullname,
        address      : this.address,
      }
      this.apiService.updateStudentData(this.id,body).subscribe(res=>{
        this.updateMessage();
        this.resetField();
        this.submitted = false;
        this.getallstudentdata();
      });
    }
    //value reset 
    resetField(){
      this.id             = '';
      this.email_id       = '';    
      this.mobile_number  = '';
      this.fullname       = '';
      this.address        = '';
      this.teacher_id     = '';
    }
    
}
