import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/shared/services/brand.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { DynamicFormComponent } from 'src/app/shared/widgets/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/widgets/dynamic-form/models/field-config';

@Component({
  selector: 'brand-indentity-verification',
  templateUrl: './brand-indentity-verification.component.html',
  styleUrls: ['./brand-indentity-verification.component.scss']
})
export class BrandIndentityVerificationComponent implements OnInit {
  //@ts-ignore
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  subscriptions: Subscription = new Subscription();

  busy = false;
  float_style = true;
  accountPK: string | null = null; 

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Verification Code *',
      name: 'secrets_id',
      placeholder: 'Enter Code Here',
      validation: [Validators.required]
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
    private router: Router,
    private $ns: NodeService,
    ) { 
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

   submit(data: any) {
    console.log('verifiedDomain', data)

    if (data) {
        this.busy = true;
      this.subscriptions.add(
        this.$brand.verifyBrand(data).subscribe(res => {
          let temp: any = res;
          if (temp) {
            this.toastr.success('Verified Successfully', ``);
            this.resetForm();     
            this.backToHome();    
          }
          this.busy = false;
          console.log(res)
        }, (err) => {
          this.busy = false;
          this.toastr.error('Oops! Something went wrong. Try again', 'Failed to Verify');
          console.log(err)
        }));
    }
  }

  backToHome() {
    this.router.navigate(['/user/home']);
  }
}
