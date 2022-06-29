import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/shared/services/brand.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { DynamicFormComponent } from 'src/app/shared/widgets/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/widgets/dynamic-form/models/field-config';

@Component({
  selector: 'brand-metadata',
  templateUrl: './brand-metadata.component.html',
  styleUrls: ['./brand-metadata.component.scss']
})
export class BrandMetadataComponent implements OnInit, AfterViewInit, OnDestroy {
  //@ts-ignore
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  subscriptions: Subscription = new Subscription();

  busy = false;
  float_style = true;
  accountPK: string | null = null; 

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
      label: 'Host Email *',
      name: 'host_email',
      placeholder: 'E.g. admin@xyz.com',
      validation: [Validators.required, Validators.email]
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit',
    },
  ];

  constructor(
    private toastr: ToastrService,
    private $brand: BrandService,
    private $ns: NodeService) { 
      this.subscriptions.add(
        this.$ns._accountHashAvailable$.subscribe(v => {
          let pk = this.$ns.currentPK();
          if (pk) this.accountPK = pk;
        })
        );
    }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //setTimeout Prevent Change Detection Error
    setTimeout(() => {
      let previousValid = this.form.valid;
      this.form.changes.subscribe(() => {
        if (this.form.valid !== previousValid) {
          previousValid = this.form.valid;
          this.form.setDisabled('submit', !previousValid);
        }
      });

      this.form.setDisabled('submit', true);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetForm() {
    this.form.form.reset();
  }

 async extractEmailDomain(data: string) {
    if (data.includes('@')) {
      let domain = data.split('@').pop();
      return domain;
    }
    return null;
  }

  async extractWebsiteDomain(data: string) {
    if (data.includes('www')) {
      let domain = data.split('www.').pop();
      return domain;
    } else if (data.includes('http')) {
      let domain = data.split('//').pop();
      return domain;
    } 

    return null;
  }

 async ensureDomainIntegrity(data: any) {
    let domain1 = await this.extractWebsiteDomain(data['host_address']);
    let domain2 = await this.extractEmailDomain(data['host_email']);
    
    if (domain1 !== domain2) {
      this.toastr.error('Email is not on the same domain', 'Domain Mismatch');
      return false;
    }
    return true;
  }
  
  async submit(data: any) {
    data['public_key'] = this.accountPK;
    let verifiedDomain = await this.ensureDomainIntegrity(data);
    
    console.log('verifiedDomain', verifiedDomain)
    
    if (verifiedDomain) {
        data['status'] = true;
        console.log('data', data)
        console.log('Proceed!!!');
        this.busy = true;

      this.subscriptions.add(
        this.$brand.saveBrand(data).subscribe(res => {
          let temp: any = res;
          if (temp) {
            this.toastr.success('Saved Successfully', ``);
            this.resetForm();         
          }
          this.busy = false;
          console.log(res)
        }, (err) => {
          this.busy = false;
          this.toastr.error('Oops! Something went wrong. Try again', 'Failed to Save');
          console.log(err)
        }));
    }
  }

}
