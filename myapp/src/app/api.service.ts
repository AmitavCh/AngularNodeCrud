import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  //Api Call for Teacher
  getallteacherdata(){
    return this.httpClient.get('http://localhost:2000/angularcrudexample/getallteacherlist');
  }
  insertTeacherData(data){
    return this.httpClient.post('http://localhost:2000/angularcrudexample/createnewteacher',data);
  } 
  deleteTeacherData(id: any){
    return this.httpClient.delete('http://localhost:2000/angularcrudexample/deleteteacherbyid/'+id);
  }
  updateTeacherData(id,data){
    return this.httpClient.put('http://localhost:2000/angularcrudexample/updateteacherbyid/'+id,data);
  }
  deleteStudetDataByTeacherId(id: any){
    return this.httpClient.delete('http://localhost:2000/angularcrudexample/deletestudentdatabyteacherid/'+id);
  }

  //Api Call for Student
  getallstudentdata(){
    return this.httpClient.get('http://localhost:2000/angularcrudexample/getallstudentlist');
  }
  insertStudentData(data){
    return this.httpClient.post('http://localhost:2000/angularcrudexample/createnewstudent',data);
  } 
  deleteStudentData(id: any){
    return this.httpClient.delete('http://localhost:2000/angularcrudexample/deletestudentbyid/'+id);
  }
  updateStudentData(id,data){
    return this.httpClient.put('http://localhost:2000/angularcrudexample/updatestudentbyid/'+id,data);
  }
}
