import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/switch";
import {Employee} from "../../employee/employee.model";
import {EmployeeService} from "../../employee/employee.service";

@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.css']
})
export class EmployeeAddDialogComponent implements OnInit {

  private leadId: number;
  private query: FormGroup;
  private employees: Subject<Employee[]> = new Subject();
  private event: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      this.leadId = params['id'];
    });
    this.query = this.formBuilder.group({
      employee: ''
    });
    this.event
      .map(query => query.value.employee)
      .filter((query: string) => query.length > 2)
      .debounceTime(250)
      //todo: query by string
      .map((query: string) => this.employeeService.query())
      .switch()
      .subscribe((employees: Employee[]) => this.employees.next(employees));
  }

  onChange() {
    this.event.next(this.query);
  }

  add(employeeId: number) {
    this.employeeService.addConnectionEmployeeLead(employeeId, this.leadId).first().subscribe();
  }

  onClose() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
