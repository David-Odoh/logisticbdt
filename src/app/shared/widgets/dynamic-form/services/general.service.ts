import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  impromptu_submit = new BehaviorSubject<object>([]);
  searcher = new BehaviorSubject<object>([]);
  _searchResult = new BehaviorSubject<object>([]);
  _newEntryModal = new BehaviorSubject<string>('');

  impromptu_submission = this.impromptu_submit.asObservable();
  search = this.searcher.asObservable();
  searchResult = this._searchResult.asObservable();
  newEntryModal = this._newEntryModal.asObservable();

  triggerImpromptuSubmit(data: any) {
    this.impromptu_submit.next(data);
  }

  triggerSearch(data: any) {
    this.searcher.next(data);
  }

  returnSearchResult(data: any) {
    this._searchResult.next(data);
  }

  openNewEntryModal(data: any) {
    this._newEntryModal.next(data);
  }
}
