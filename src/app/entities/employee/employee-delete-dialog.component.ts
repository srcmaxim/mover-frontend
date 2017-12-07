import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent  implements OnInit, OnDestroy {

  private employeeId: number;
  private routeSubscription: any;
  private deleteSubscription: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeId = id;
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.employeeService.delete(this.employeeId);
    this.deleteSubscription = this.employeeService.multiChange.subscribe(() =>
      this.router.navigateByUrl('/employee'));
  }
}
