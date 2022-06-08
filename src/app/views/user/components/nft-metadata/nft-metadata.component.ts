import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Keyring from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/shared/models/dictionary';
import { ImageService } from 'src/app/shared/services/image.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';
import { DynamicFormComponent } from 'src/app/shared/widgets/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/widgets/dynamic-form/models/field-config';
import { GeneralService } from 'src/app/shared/widgets/dynamic-form/services/general.service';

@Component({
  selector: 'app-nft-metadata',
  templateUrl: './nft-metadata.component.html',
  styleUrls: ['./nft-metadata.component.scss']
})
export class NftMetadataComponent implements OnInit, AfterViewInit {
  //@ts-ignore
  @ViewChild(DynamicFormComponent) form1: DynamicFormComponent;
  //@ts-ignore
  @ViewChild(DynamicFormComponent) form2: DynamicFormComponent;
  subscriptions: Subscription = new Subscription();
  viewMode: string = 'tab1';
  title: string = 'Metadata';
  uploadedImageUrl: any = '';
  PID: any = '';

  terms = new Dictionary().terms;

  busy = false;
  float_style = true;

  config1: FieldConfig[] = [
    {
      type: 'filechooser',
      label: 'Upload File(s) *',
      name: 'images',
      valueType: 'image',
      placeholder: 'Enter a email',
      z_index: '6',
      validation: [Validators.required]
    },
    {
      type: 'button',
      label: 'Upload Image',
      name: 'upload',
    },
  ];

  config2: FieldConfig[] = [
    {
      type: 'input',
      label: 'Product Label Name *',
      name: 'product_label',
      placeholder: 'Enter Label Name',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Product Name *',
      name: 'product_name',
      placeholder: 'Enter Product Name',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Product Color',
      name: 'product_color',
      placeholder: 'Enter Color Name',
    },
    {
      type: 'input',
      label: 'Product Brand *',
      name: 'product_brand',
      placeholder: 'Enter Brand Name',
      validation: [Validators.required]
    },
    {
      type: 'textarea',
      label: 'Description',
      name: 'description',
      placeholder: 'Enter Description',
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit',
    },
  ];


  constructor(
    private $ui: UIStateService,
    private route: ActivatedRoute,
    private $general: GeneralService,
    private toastr: ToastrService,
    private router: Router,
    private $img: ImageService,
    private $nft: NftService,
    private $ns: NodeService,
    private $security: SecurityService
    ) {
    this.subscriptions.add(
      this.route.url.subscribe(u => {
        this.$ui.updateSecondaryRoute(u[0].path);
        this.viewMode = 'tab1';
        this.title = 'Test';
      })
    );
    // this.subscriptions.add(
    //   this.$nft.$qrCode.subscribe(id => {if (id) this.PID = id})
    // );
  }

  ngOnInit(): void {
    this.uploadedImageUrl = localStorage.getItem('CID');
    this.PID = localStorage.getItem('PID');
  }

  ngAfterViewInit() {
   
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  generateAlias(name: any) {
    return name.toLowerCase().split(' ').join('_');
  }

  submitAll() {
    console.log('trying')
    this.$general.triggerImpromptuSubmit([]);
  }

  async signMetadata(metadata: any) {
      const keyring =  new Keyring({type: 'sr25519' });
      let userAccount = this.$ns.currentAccount();

      if (userAccount) {
        const newPair = keyring.addFromUri(`//${userAccount?.name}`);
  
        // Stringify metadata
        let stringMetadata = metadata.toString();
  
        // Hash metadata
        let hashedMetadata = this.$security.encryptUsingAES256(stringMetadata).toString();
  
        console.log('hashedMetadata', hashedMetadata.toString())
  
        // Stringify metadata
        const message = await stringToU8a(hashedMetadata);
        console.log('message', message)
        const signature = await newPair.sign(message);
        console.log('signature', signature)
        console.log(' newPair.publicKey',  newPair.publicKey)

        let newPairPK =  newPair.publicKey
        const isValid = await newPair.verify(message, signature, newPairPK);
  
        // output the result
        console.log(`New: ${await u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);

        if (isValid) return {message, signature, newPairPK}
      }

      return null
  }

  submit1(data: any) {
    if (data.images !== undefined && data.images.length > 0) {

      let copiedImgs = Object.assign([], data.images)
      let lastImg = copiedImgs.pop();

      if (lastImg) {
        console.log(lastImg)

        this.busy = true;
        const formData: any = new FormData();
        formData.append('inputFile', lastImg);

        this.subscriptions.add(
          this.$img.saveImage(formData).subscribe(res => {
            let temp: any = res;
            if (temp) {
              this.toastr.success('Added Successfully', ``);
              this.uploadedImageUrl = temp.cid; 

              localStorage.setItem('CID',  this.uploadedImageUrl);            
              setTimeout(() => this.viewMode = 'tab2', 100);
            }
            this.busy = false;
            console.log(res)
          }, (err) => {
            this.busy = false;
            this.toastr.error('Failed to Save', 'Oops! Something went wrong. Try again');
            console.log(err)
          })
       );
      }
    }

    
  }

  async submit2(data: any) {
    if (this.PID) {
      data['pid'] = this.PID
      console.log('raw', data);
  
      if (this.uploadedImageUrl) {
        data.product_image = this.uploadedImageUrl;
        console.log(data);
  
        let signedData = await this.signMetadata(data);
          if (signedData != null) {

            console.log('Final Result: ', signedData)

              this.busy = true;
      
              this.subscriptions.add(
                this.$nft.saveNFT(signedData).subscribe(res => {
                  let temp: any = res;
                  if (temp) {
                    this.toastr.success('Created Successfully', ``);
        
                    localStorage.removeItem('CID');            
                    localStorage.removeItem('PID');            
                    // setTimeout(() => this.viewMode = 'tab2', 100);
                  }
                  this.busy = false;
                  console.log('NFT', res)
                }, (err) => {
                  this.busy = false;
                  this.toastr.error('Failed to Create', 'Oops! Something went wrong. Try again');
                  console.log(err)
                })
            );
          } else this.toastr.success("Account Not Found", "No user account was selected!");

  
      } else {
        this.toastr.success("No Image Found", "Kindly add a product image first.");
        setTimeout(() => this.viewMode = 'tab1', 100);
      }

    } else this.toastr.success("No Product ID Found", "Scan item again");
  }

  deleteImage() {
    console.log('Deleting image')
  }
}




