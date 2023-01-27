import * as moment from 'moment';
import { Component } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  Student: any[] = [];
  StudentList: Student = new Student();
  StudentID!: number;
  Attendance: any[] = [];
  AttendanceList: Attendance = new Attendance();
  AttendanceID!: number;
  inputValue!: string;
  selectedSection!: string;
  selectedSubject!: string;
  currenttime = moment().format('h:mm:ss a');
  currentdate = moment().format('MMMM D YYYY');

  constructor() {}

  ionViewWillEnter() {
    let data = JSON.parse(localStorage.getItem('AnotherData')!);
    if (JSON.stringify(data) === '{}') {
      console.log('Empty');
    } else {
      this.StudentList.RFID = data.RFID;
      this.StudentList.FirstName = data.FirstName;
      this.StudentList.LastName = data.LastName;
      this.StudentList.Section = data.Section;
      this.addStudent();
      localStorage.setItem('AnotherData', JSON.parse(JSON.stringify('{}')));
    }
  }

  addStudent() {
    if (this.StudentID)
      this.Student[this.StudentID] = JSON.parse(
        JSON.stringify(this.StudentList)
      );
    else {
      this.Student.push(JSON.parse(JSON.stringify(this.StudentList)));
    }
  }
  SetAttendance(RFID: string) {
    let objects = this.Student;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].RFID === RFID) {
        this.AttendanceList.RFID = objects[i].RFID;
        this.AttendanceList.FirstName = objects[i].FirstName;
        this.AttendanceList.LastName = objects[i].LastName;
        this.AttendanceList.Section = this.selectedSection;
        this.AttendanceList.Subject = this.selectedSubject;
        this.AttendanceList.Time = this.currenttime; //Replace
        this.AttendanceList.Date = this.currentdate; //Replace
        this.addAttendance();
        console.log(JSON.parse(JSON.stringify(this.Attendance)));
        this.inputValue = '';
        break;
      }
    }
  }

  addAttendance() {
    if (this.AttendanceID)
      this.Attendance[this.AttendanceID] = JSON.parse(
        JSON.stringify(this.AttendanceList)
      );
    else {
      this.Attendance.push(JSON.parse(JSON.stringify(this.AttendanceList)));
    }
  }

  ngOnInit() {
    localStorage.setItem('AnotherData', JSON.parse(JSON.stringify('{}')));
  }
}
export class Student {
  FirstName!: string;
  LastName!: string;
  Section!: string;
  RFID!: string;
  id!: number;
}
export class Attendance {
  FirstName!: string;
  LastName!: string;
  Section!: string;
  RFID!: string;
  Date!: string;
  Time!: string;
  Subject!: string;
}
