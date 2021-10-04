import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(private apiService:ApiService,private fb: FormBuilder,private fm: FlashMessagesService,private router: Router) {}

    // value initialization
    data: any           = '';
    email_id: any       = '';
    mobile_number: any  = '';
    address: any        = '';
    fullname: any       = '';
    teacher_id:any      = '';
    usertabledata: any  = '';
    teachertabledata: any  = '';
    id: any             = '';
    showMsg: boolean    = false;

    ngOnInit(): void {
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
    //all teacherdata fetch from DB
    getallteacherdata(){
      this.apiService.getallteacherdata().subscribe(res=>{this.teachertabledata=res});
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
    // call from validation
    get validation() {
       return this.userForm.controls; 
    }
    // insert data into Db
    insertStudentData(){
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }else{
          let email_id      = this.email_id;
          let mobile_number = this.mobile_number;
          let teacher_id    = this.teacher_id;
          let fullname      = this.fullname;
          let address       = this.address;
          let body = {
            email_id      : email_id,
            mobile_number : mobile_number,
            teacher_id    : teacher_id,
            fullname      : fullname,
            address       : address,
          }
          this.apiService.insertStudentData(body).subscribe(res=>{
            this.successMessage();
            this.resetField();
            this.submitted = false;
          });
        }
    }
    //success flash message
    successMessage(){
        this.fm.show('!!! Data Save Successfully', { cssClass: 'alert-success', timeout: 5000 });
        setTimeout(() => {
          this.router.navigate(['/student']);
      }, 2000);
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
    
}
