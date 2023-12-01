import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, switchMap } from 'rxjs';
import { DataService } from '../shared/data.service';
import { DiagnosEntity } from '../shared/types';

@Component({
  selector: 'diagnos-autocomplete',
  templateUrl: './diagnos-autocomplete.component.html',
})
export class DiagnosAutocompleteComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  @Input() index!: number;

  searchString = new Subject<string>();
  filteredOptions$!: Observable<DiagnosEntity[]>;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private parentGroup: ControlContainer
  ) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.searchString.pipe(
      switchMap((val) => {
        return this.dataService.fetchDiagnosis(val);
      })
    );
  }

  onSelectedOption(option: DiagnosEntity) {
   console.log(this.parentGroup)
    const conditions = (
      this.parentFormGroup.controls['conditions'] as FormArray
    ).controls;

    const currentControl = conditions[this.index];
    // const valueControl = currentControl.get('context.identifier.value');
    const codingControl = currentControl.get('code.coding') as FormArray;
    // valueControl?.setValue(option.id);
    codingControl?.push(
      this.formBuilder.group({
        system: this.formBuilder.control('eHealth/ICPC2/condition_codes'),
        code: this.formBuilder.control(option.code),
      })
    );
    console.log(this.parentFormGroup.value)
  }

  onSearch(event: Event) {
    this.searchString.next((event.target as HTMLInputElement).value);
  }

  displayFn(option: DiagnosEntity): string {
    return option && option.id ? option.name : '';
  }
}


