import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Dictionary } from 'src/app/shared/models/dictionary';

@Component({
  selector: 'app-form-input-list',
  templateUrl: './form-input-list.component.html',
  styleUrls: ['./form-input-list.component.css']
})
export class FormInputListComponent implements OnInit {
  //@ts-ignore
  @ViewChild('myInput') myInput: ElementRef;
  searchTerm$ = new Subject<string>();
  //@ts-ignore
  config: FieldConfig;
  //@ts-ignore
  group: FormGroup;
  //@ts-ignore
  isEven: Boolean;

  options: any = [];
  constructor() {
    this.search(this.searchTerm$);
  }

  dictionary = new Dictionary().heplers;

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeList();
    }, 10);
  }


  // Updating Search Parameter
  search(terms: Observable<string>) {
    terms.pipe(distinctUntilChanged()).subscribe(term => {
      if (term.length >= 3 && term.split("::").length < 3) {

        let resolvedTags = '';

        term.split(' ').forEach(_t => {
          if (_t.includes('@@')) {

            let match: any = this.dictionary.filter(dic => _t.toLowerCase().includes(dic.trigger));

            if (match.length > 0)
              _t = `${match[0].word} `;
          }
          resolvedTags = `${resolvedTags} ${_t}`;
          this.myInput.nativeElement.value = resolvedTags.replace(/^\s+/g, "")
        })
      }
    });
  }

  getInput(input: any) {
    if (input.value) {

      // Get the last index of the last item in the options array
      let id
      if (this.options.length == 0) {
        id = this.options.lastIndexOf(this.options[this.options.length - 1]) + 1;
      } else {

        // This if block accomodates this unique backend implementation
        // The following else block would have been the only required code block
        // If record has be save and 'id' has been changed to '_id'
        if ('_id' in this.options[this.options.length - 1])
          id = 1;
        else
          id = this.options[this.options.length - 1].id;
      }

      // Increment the index and equate to id
      let value = { id: id + 1, name: input.value, label: input.value, selected: false }
      // let value = { id: id + 1, requirement: input.value }

      //  Push new data structure into the options array
      this.options.push(value)
      console.log(this.options)

      // Make the option array ready to export
      this.group.controls[this.config.name].patchValue(this.options);

      // Clear the input field
      input.value = null
    }
  }

  initializeList() {
    this.group.controls[this.config.name].valueChanges.subscribe(val => {
      if (Array.isArray(val)) {
        this.options = val;
      }
    });
  }

  remove(item: any) {
    if (item) {
      this.options = this.options.filter((opt: any) => opt != item);

      // Make the option array ready to export
      this.group.controls[this.config.name].patchValue(this.options);
    }
  }

  edit(item: any) {
    if (item) {
      if ('requirement' in item) {
        // Prefer to edit
        this.myInput.nativeElement.value = item.requirement;

        // Remove from list
        // this.remove(item);
      }
    }
  }
}
