import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Keyring from '@polkadot/keyring';
import { stringToU8a, u8aToHex, u8aToString } from '@polkadot/util';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/shared/models/dictionary';
import { ImageService } from 'src/app/shared/services/image.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
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
  productExist = false;

  terms = new Dictionary().terms;

  busy = false;
  float_style = true;
  accountPK: string | null = null; 

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
      label: 'Product Color *',
      name: 'product_color',
      placeholder: 'Enter Color Name',
      validation: [Validators.required]
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
      label: 'Description *',
      name: 'description',
      placeholder: 'Enter Description',
      validation: [Validators.required]
    },
    {
      type: 'button',
      label: 'Proceed',
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
    private $security: SecurityService,
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
    this.subscriptions.add(
      this.$ns._accountHashAvailable$.subscribe(v => {
        let pk = this.$ns.currentPK();
        if (pk) this.accountPK = pk;
      })
    );

  }
  
  ngOnInit(): void {
    this.uploadedImageUrl = localStorage.getItem('CID');
    this.PID = localStorage.getItem('PID');
    console.log('PID', this.PID);
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
        let stringMetadata = JSON.stringify(metadata);
  
        // Hash metadata
        let encodedMetadata = this.$security.encryptUsingAES256(stringMetadata).toString();
  
        console.log('encodedMetadata', encodedMetadata.toString())
  
        // Stringify metadata
        // const message = await stringToU8a(encodedMetadata);
        const message = encodedMetadata;
        const signature = await newPair.sign(message);
        
        const newPairPK =  newPair.publicKey;
        const newPairAddress =  newPair.address;
        const hexSignature = u8aToHex(signature);
        
        console.log('message', message)
        console.log('signature', signature)
        console.log(' newPair.publicKey',  newPair.address)
        console.log('newPairPK', newPairPK.toString())
        console.log('hexSignature', hexSignature.toString())

        const isValid = await newPair.verify(message, signature, newPairPK);
  
        // output the result
        console.log(`New: ${await u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);

        if (isValid) return {message, hexSignature, newPairAddress}
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
            this.toastr.error('Oops! Something went wrong. Try again', 'Failed to Upload');
            console.log(err)
          })
       );
      }
    }
  }

  preparedData: any = null;

  async submit2(data: any) {
    if (this.PID) {
      data['pid'] = this.PID;
      data['public_key'] = this.accountPK;
      console.log('raw', data);
  
      if (this.uploadedImageUrl) {
        data.product_image = this.uploadedImageUrl;
        console.log(data);

        if (!data['product_label']) {
          this.toastr.error('Product Label can\'t be empty', 'Required Field');
        }
        else if (!data['product_name']) {
          this.toastr.error('Product Name can\'t be empty', 'Required Field');
        }
        else if (!data['product_brand']) {
          this.toastr.error('Product Brand can\'t be empty', 'Required Field');
        } 
        else if (!data['product_color']) {
          this.toastr.error('Product Color can\'t be empty', 'Required Field');
        }
        else if (!data['description']) {
          this.toastr.error('Description can\'t be empty', 'Required Field');
        } 
        else {
          this.preparedData = data;
          this.viewMode = 'tab3'
        }
      } 
      
      else {
        this.toastr.success("Kindly add a product image first.", "No Image Found");
        setTimeout(() => this.viewMode = 'tab1', 100);
      }

    } else this.toastr.success("No Product ID Found", "Scan Item Again");
  }

  async submit3() {
    if (this.preparedData) {
      let signedData = await this.signMetadata(this.preparedData);
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
                  this.preparedData = null;          
                  setTimeout(() => this.viewMode = 'tab4', 100);
                }
                this.busy = false;
                console.log('NFT', res)
              }, (err) => {
                this.busy = false;

                this.toastr.error('Failed to Create', 'Oops! Something went wrong. Try again');
                console.log(err)
                console.log(err.status)
              })
          );
        } else this.toastr.success("Account Not Found", "No user account was selected!");    
    }
  }

  deleteImage() {
    console.log('Deleting image')
  }

  resetForm () {
    this.form2.form.reset();
  }

  requestToOpenNFTCreate(option: string) {
    this.router.navigate(["/user/nft-create/qr"]);

    // Display Info in Main Area
    this.$ui.updateNFTView(`Scan ${option}`);
    this.$ui.updateSecondaryRoute('qr');
    this.$ui.openInMainArea(option);
  }
  
  productAlreadyExist($evt: any) {
    if ($evt) this.productExist = true;
    else this.productExist = false;
  }
  
  isBusy($evt: any) {
    if ($evt) this.busy = true;
    else this.busy = false;
  }
}




