import { Component } from '@angular/core';
import { AlertController, } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Student: any[] = [];
  StudentList: Student = new Student();
  StudentID!: number;
  Attendance: any[]=[];
  AttendanceID!: number;
  GID!: number;

  constructor(private alertController: AlertController) {}
  ionViewWillEnter(){
    let data = JSON.parse(localStorage.getItem('myData')!);
     if (JSON.stringify(data) === '{}'){
        console.log("Empty")
        console.log(JSON.parse(JSON.stringify(this.Student)))
     }
     else
{
    this.StudentList.RFID = data.RFID;
    this.StudentList.FirstName = data.FirstName;
    this.StudentList.LastName = data.LastName;
    this.StudentList.Section = data.Section;
    console.log(this.Student)
    this.addStudent()
    localStorage.setItem('myData',JSON.parse(JSON.stringify('{}')))
}
}
addStudent(){
  if (this.StudentID)
  this.Student[this.StudentID] = JSON.parse(JSON.stringify(this.StudentList));
  else {
  this.Student.push(JSON.parse(JSON.stringify(this.StudentList)));
}
}

editStudent(id: number){
  this.GID = id
  this.presentStudentAlert()
}

deleteStudent(id: number){
  this.Student.splice(id,1);
  }

async presentStudentAlert(){

  const alert = await this.alertController.create({
    header: 'Input New Value',
    buttons: [{
      text:'OK',
      handler: (alertData)=>{
      this.Student[this.GID].FirstName = alertData.FirstName
      this.Student[this.GID].LastName = alertData.LastName
      this.Student[this.GID].Section = alertData.Section
      }
  }],
    inputs: [
      {
        name: 'FirstName',
        type: 'textarea',
        placeholder: 'Last Name',
      },
      {
        name: 'LastName',
        type: 'textarea',
        placeholder: 'First Name',
      },
      {
        name: 'Section',
        type: 'textarea',
        placeholder: 'Section',
      }
    ]

  });
  await alert.present();
}



ngOnInit() {
  localStorage.setItem('myData',JSON.parse(JSON.stringify('{}')))
}





}
export class Student {
  FirstName!: string;
  LastName!: string;
  Section!: string;
  RFID!: string;
  id!: number;
}
