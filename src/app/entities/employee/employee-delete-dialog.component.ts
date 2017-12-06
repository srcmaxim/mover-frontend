import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent  implements OnInit, OnDestroy {

  routeSub: any;
  employeeId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeId = id;
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.employeeService.delete(this.employeeId);
    this.employeeService.change.subscribe(() =>
      this.router.navigate([{outlets: {popup: null}}]));
  }
}
