import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.model";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  private employee: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {
    this.initForm(new Employee({}));
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeService.find(id).first()
          .subscribe((employee: Employee) => this.initForm(employee));
      }
    });
  }

  initForm(employee: Employee) {
    this.employee = this.formBuilder.group({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.employee.value.id) {
      this.employeeService.update(this.employee.value)
        .first().subscribe(() => this.onDeny());
    } else {
      this.employeeService.create(this.employee.value)
        .first().subscribe(() => this.onDeny());
    }
  }
}
