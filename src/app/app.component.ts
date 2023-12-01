import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { createDateValidator } from './shared/date-validator';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  result = '';
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}

  diagnosisForm = this.formBuilder.group({
    encounter: this.formBuilder.group({
      date: this.formBuilder.control<string | Date>(new Date().toISOString(), {
        validators: [createDateValidator()],
      }),
    }),
    conditions: this.formBuilder.array([]),
  });

  get conditions() {
    return this.diagnosisForm.controls['conditions'] as FormArray;
  }

  onDateChange() {
    if (
      this.diagnosisForm.value.encounter &&
      this.diagnosisForm.value.encounter.date instanceof Date
    ) {
      this.diagnosisForm.patchValue({
        encounter: {
          date: this.diagnosisForm.value.encounter.date.toISOString(),
        },
      });
    }
  }

  onAddDiagnos() {
    const formGroup = this.formBuilder.group({
      id: this.formBuilder.control(uuidv4()),
      notes: this.formBuilder.control(''),
      onset_date: this.formBuilder.control(new Date().toISOString()),
      context: this.formBuilder.group({
        identifier: this.formBuilder.group({
          value: this.formBuilder.control(''),
          type: this.formBuilder.group({
            coding: this.formBuilder.array([
              this.formBuilder.group({
                system: this.formBuilder.control('eHealth/resources'),
                code: this.formBuilder.control('encounter'),
              }),
            ]),
          }),
        }),
      }),
      code: this.formBuilder.group({
        coding: this.formBuilder.array([]),
      }),
    });

    this.conditions.push(formGroup);
  }

  onSubmit() {
    if (this.diagnosisForm.valid) {
      const value = { ...this.diagnosisForm.value };
      if (value.conditions?.length === 0) {
        delete value.conditions;
      }
      this.result = JSON.stringify(value);
    }
  }
}

