import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  constructor(public navCtrl: NavController) {}
  
  Student: any[] = [];
  StudentList: Student = new Student();
  StudentID!: number;
  Attendance: any[]=[];
  AttendanceList: Attendance = new Attendance()
  AttendanceID!: number;

  addStudent(){
    if (this.StudentID)
    this.Student[this.StudentID] = JSON.parse(JSON.stringify(this.StudentList));
    else {
    this.Student.push(JSON.parse(JSON.stringify(this.StudentList)));
    localStorage.setItem('myData',JSON.stringify(this.StudentList));
    localStorage.setItem('AnotherData',JSON.stringify(this.StudentList));
    this.StudentList.FirstName = '';
    this.StudentList.LastName = '';
    this.StudentList.Section ='';
    this.StudentList.RFID = '';
  }
  }
  nextPage(){
    this.navCtrl.navigateForward('tab2/tab2.page');
  }



}
export class Student {
  FirstName!: string;
  LastName!: string;
  Section!: string;
  RFID!: string;
  id!: number;
}
export class Attendance{
  FirstName!: string;
  LastName!: string;
  Section!: string;
  RFID!: string;
  Date!: string;
  Time!: string;
  Subject!: string;
}
