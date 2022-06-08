import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { int } from '@zxing/library/esm/customTypings';
import { FieldConfig } from '../../models/field-config';
import { FormSelectService } from '../../services/form-select.service';

@Component({
  selector: 'app-form-multichoice-select',
  templateUrl: './form-multichoice-select.component.html',
  styleUrls: ['./form-multichoice-select.component.css']
})
export class FormMultichoiceSelectComponent implements OnInit {
  //@ts-ignore
  @ViewChild('mcForm') ngForm: NgForm;
  theCheckbox = false;
  show_dropdown = false;
  
  //@ts-ignore
  group: FormGroup;
  //@ts-ignore
  config: FieldConfig;
  //@ts-ignore
  isEven: Boolean;
  
  selection_ForDisplayOnly = null;
  
  //@ts-ignore
  form;
  constructor(private fb: FormBuilder, private $form: FormSelectService) {
    setTimeout(() => {
      this.form = this.fb.group({
        options: this.buildOptions()
      });
    }, 20);
  }

  get multiChoice(): FormArray {
    return this.form.get('options') as FormArray;
  };

  buildOptions() {
    //@ts-ignore
    const arr = this.config.options.map(opt => {
      return this.fb.control(opt.checked);
    })
    console.log(this.fb.array(arr))
    return this.fb.array(arr);
  }
  
  submit(value: any) {
    console.log(value)
    const f = Object.assign({}, value, {
      answers: value.options.map((opt: any, i: int) => {
        return {
          //@ts-ignore
          id: this.config.options[i].id,
          //@ts-ignore
          name: this.config.options[i].name,
          //@ts-ignore
          label: this.config.options[i].label,
          checked: opt,
          //@ts-ignore
          score: this.config.options[i].score
        }
      })
    })

    console.log(f);
    // Share with observers
    this.$form.updateMultichoiceSelections(f);

    // Format for Display
    this.sortingForDisplay(f);
  }

  ngOnInit() { }

  toggleCheck(i: int, check: any) {
    this.form.get('options').controls[i].patchValue(!check);
    // Submit Multi-Choice Form Programmatically
    this.submit(this.ngForm.value)
  }

  toggleDropdown() {
    this.show_dropdown = !this.show_dropdown
    console.log(this.show_dropdown)
  }

  close() {
    if (this.show_dropdown) this.show_dropdown = false;
  }

  sortingForDisplay(data: any) {
    this.selection_ForDisplayOnly = data.answers.filter((ans: any) => ans.checked).map((r: any) => r.label).slice().reverse();

    // Update Ouput Value
    this.updateSelectValue(data.answers);
  }

  updateSelectValue(data: any) {
    this.group.controls[this.config.name].patchValue(data);
  }
}
