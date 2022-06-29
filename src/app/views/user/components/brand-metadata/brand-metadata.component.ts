import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/widgets/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/widgets/dynamic-form/models/field-config';

@Component({
  selector: 'brand-metadata',
  templateUrl: './brand-metadata.component.html',
  styleUrls: ['./brand-metadata.component.scss']
})
export class BrandMetadataComponent implements OnInit, OnDestroy {
  //@ts-ignore
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  subscriptions: Subscription = new Subscription();

  busy = false;
  float_style = true;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Brand Name *',
      name: 'brand_name',
      placeholder: 'Enter Brand Name',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Host Website Address *',
      name: 'host_address',
      placeholder: 'E.g https://xyz.com',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Host Email',
      name: 'host_email',
      placeholder: 'E.g. admin@xyz.com',
      validation: [Validators.required]
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submit(data: any) {
    this.busy = true;
  }

}
