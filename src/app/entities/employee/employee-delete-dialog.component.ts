import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent  implements OnInit {

  private employeeId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeId = id;
      }
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.employeeService.delete(this.employeeId).first().subscribe(() =>
      this.router.navigateByUrl('/employee'));
  }
}
