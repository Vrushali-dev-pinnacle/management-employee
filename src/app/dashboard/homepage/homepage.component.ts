import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { ApiService } from "../../shared/api.service";
import { EmployeeModel } from "./employee.model";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  formValue !: FormGroup;
  employeeObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(
    private formbuilder:FormBuilder,
    private api:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      address:[''],
      birthDate:[''],
      mobile:[''],
      city:['']
    })

    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.address = this.formValue.value.address;
    this.employeeObj.birthDate = this.formValue.value.birthDate;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.city = this.formValue.value.city
    this.api.postEmploye(this.employeeObj).subscribe(res=>{
      alert("Employee Added Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong")
    })
  }

  getAllEmployee(){
    this.api.getEmploye().subscribe(res=>{
    this.employeeData = res;
    })
  }
  
  deleteEmployee(row : any){
    this.api.deleteEmploye(row.id).subscribe(res=>{
      alert("Employee Deleted!");
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['birthDate'].setValue(row.birthDate);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['city'].setValue(row.city);
  }

  updateEmployeeDetails(){
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.address = this.formValue.value.address;
    this.employeeObj.birthDate = this.formValue.value.birthDate;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.city = this.formValue.value.city
    
    this.api.updateEmploye(this.employeeObj,this.employeeObj.id).subscribe(res=>{
      alert("Employee Updated Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  logout(){
    localStorage.setItem('logedIn',"false");
    this.router.navigate(['/login'])
  }
}
