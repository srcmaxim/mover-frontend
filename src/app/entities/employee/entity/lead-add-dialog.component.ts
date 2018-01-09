import {Lead} from "../../lead/lead.model";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LeadService} from "../../lead/lead.service";
import {EmployeeService} from "../employee.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/switch";

@Component({
  selector: 'app-lead-add-dialog',
  templateUrl: './lead-add-dialog.component.html',
  styleUrls: ['./lead-add-dialog.component.css']
})
export class LeadAddDialogComponent implements OnInit {

  private employeeId: number;
  private query: FormGroup;
  private leads: Subject<Lead[]> = new Subject();
  private event: Subject<any> = new Subject();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      this.employeeId = params['id'];
    });
    this.query = this.formBuilder.group({
      lead: ''
    });
    this.event
      .map(query => query.value.lead)
      .filter((query: string) => query.length > 2)
      .debounceTime(250)
      //todo: query by string
      .map((query: string) => this.leadService.query())
      .switch()
      .subscribe((leads: Lead[]) => this.leads.next(leads));
  }

  onChange() {
    this.event.next(this.query);
  }

  add(leadId: number) {
    this.employeeService.addConnectionEmployeeLead(this.employeeId, leadId).first().subscribe();
  }

  onClose() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
