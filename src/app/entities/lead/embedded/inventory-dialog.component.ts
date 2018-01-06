import {Inventory} from "../inventory.model";
import {LeadService} from "../lead.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import index from "@angular/cli/lib/cli";
import {SemanticDropdownLoader} from "../../../layouts/loaders/semantic-dropdown-loader.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: []
})
export class InventoryDialogComponent implements OnInit {

  private inventory: FormGroup;
  private id: number;
  private index: number;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService,
              private formBuilder: FormBuilder) {
    this.initForm(new Inventory({}));
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.route.params.first().subscribe((params) => {
      this.id = params['id'];
      this.index = params['index'];
      if (this.index) {
        this.leadService.multiCastInventories.first()
          .map((inventories: Inventory[]) => inventories[this.index])
          .subscribe((inventory: Inventory) => this.initForm(inventory));
      }
    });
  }

  initForm(inventory: Inventory) {
    this.inventory = this.formBuilder.group({
      category: inventory.category,
      name: inventory.name,
      quantity: inventory.quantity,
      weight: inventory.weight,
      volume: inventory.volume
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.index) {
      this.leadService.updateInventory(this.id, this.index, new Inventory(this.inventory.value))
        .first().subscribe(() => this.onDeny());
    } else {
      this.leadService.createInventory(this.id, new Inventory(this.inventory.value))
        .first().subscribe(() => this.onDeny());
    }
  }
}
