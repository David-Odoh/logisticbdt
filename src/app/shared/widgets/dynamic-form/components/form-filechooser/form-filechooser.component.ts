import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as JSZip from 'jszip';
// import { JxToasterService } from 'jx-toaster';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'app-form-filechooser',
  templateUrl: './form-filechooser.component.html',
  styleUrls: ['./form-filechooser.component.css']
})
export class FormFilechooserComponent implements OnInit {
  //@ts-ignore
  config: FieldConfig;
  //@ts-ignore
  group: FormGroup;
  //@ts-ignore
  isEven: Boolean;

  files: any = [];
  // constructor(private jx: JxToasterService) { }
  constructor() { }

  ngOnInit() { }

  async uploadFile(event: any, valueType: any) {
    console.log(event)
    console.log(valueType)

    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpeg', 'image/webp'];
    const acceptedZipTypes = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'];

    if (valueType == 'zip') {
      // If zip
      if (acceptedZipTypes.includes(event[0].type)) {
        console.log(event[0]);

        // Allow only valid Resume formats
        this.retrieveValidResumes(event);
      } else this.rejectFormat('Zip');
    }

    else if (valueType == 'image') {
      // If Image
      if (acceptedImageTypes.includes(event[0].type)) {
        console.log(event[0]);

        // Allow only valid Resume formats
        this.retrieveValidResumes(event);
      } else this.rejectFormat('png/jpg/webp/gif/jpeg');
    }

    else {
      this.rejectFormat('Not the right');
    }
  }

  makeUpdate() {
    this.group.controls[this.config.name].patchValue(this.files);
  }

  rejectFormat(expectedFormat: any) {
    // alert('Wrong format. File has been discarded!')
    alert(`${expectedFormat} format expected!. File has been discarded!`);
    // this.jx.pop(
    //   "danger",
    //   `${expectedFormat} format expected!`,
    //   "File has been discarded!",
    //   true
    // );
  }

  retrieveValidResumes(resumes: any) {
    for (let index = 0; index < resumes.length; index++) {
      let resume = resumes[index];
      let resName = resume.name.toLowerCase();

      this.files.unshift(resume);

      this.makeUpdate();
    }
  }

  deleteAttachment(file: any) {
    console.log(file)
    this.files = this.files.filter((f: any) => { return f != file });
    console.log(this.files)
    this.makeUpdate();
  }

  determineSize(index: any) {
    //@ts-ignore
    let size = this.files[index].size;
    let fileSizeExt = new Array("Bytes", "KB", "MB", "GB"),
      i = 0;
    while (size > 900) {
      size /= 1024;
      i++;
    }
    let exactSize = Math.round(size * 100) / 100 + " " + fileSizeExt[i];
    return exactSize;
  }
}
