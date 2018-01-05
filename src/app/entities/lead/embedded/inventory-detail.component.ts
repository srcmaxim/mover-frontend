import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Inventory} from "../inventory.model";
import {LeadService} from "../lead.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: []
})
export class InventoryDetailComponent implements OnInit {

  @Input() private leadId: number;
  private inventories: Observable<Inventory[]>;

  constructor(private leadService: LeadService) {
  }

  ngOnInit() {
    this.inventories = this.leadService.multiCastInventories;
  }

  query() {
    this.leadService.queryInventories(this.leadId).first().subscribe();
  }

  edit(index: number) {
    alert("edit " + index);
  }

  delete(index: number) {
    this.leadService.deleteInventory(this.leadId, index).first().subscribe();
  }
}
