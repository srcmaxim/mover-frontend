import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from './employee.model';

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent  implements OnInit, OnDestroy {

  routeSub: any;
  employee: Employee;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employee = new Employee({id: id});
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
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
