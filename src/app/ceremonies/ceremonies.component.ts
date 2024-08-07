/*
/!*
import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {CUSTOM_DATE_FORMATS, JalaliMomentDateAdapter} from "../data/utils/jalali-adapter";
import {FeaturesDto} from "../data/dto/features.dto";
import {FeaturesMock} from "../data/mock/features.mock";
import {LevelDto} from "../data/dto/level.dto";
import {LevelsMock} from "../data/mock/levels.mock";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.css']
})
export class CeremoniesComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper | undefined;

  firstFormGroup: FormGroup = this._formBuilder.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    location: [null, Validators.required],
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    data: ['', Validators.required]
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    data: ['', Validators.required]
  });
  fourthFormGroup: FormGroup = this._formBuilder.group({
    data: ['', Validators.required]
  });

  levels: LevelDto[] = LevelsMock;
  features: FeaturesDto[] = FeaturesMock;

  totalSteps: number = 1;
  currentStep: number = 1;

  constructor(
    @Inject(DateAdapter) private dateAdapter: JalaliMomentDateAdapter,
    @Inject(MAT_DATE_FORMATS) private formats: CUSTOM_DATE_FORMATS,
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.totalSteps = this.stepper?.steps.length || 0;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.dateAdapter.setLocale('fa');
    this.formats.locale = 'fa';
  }

  nextStep() {
    this.stepper?.next();
    this.currentStep++;
  }

  previousStep() {
    this.stepper?.previous();
    this.currentStep--;
  }

}
*!/

import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {CUSTOM_DATE_FORMATS, JalaliMomentDateAdapter} from "../data/utils/jalali-adapter";
import {FeaturesDto} from "../data/dto/features.dto";
import {FeaturesMock} from "../data/mock/features.mock";
import {LevelDto} from "../data/dto/level.dto";
import {LevelsMock} from "../data/mock/levels.mock";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.css']
})
export class CeremoniesComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper | undefined;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  levels: LevelDto[] = LevelsMock;
  features: FeaturesDto[] = FeaturesMock;

  totalSteps: number = 1;
  currentStep: number = 1;

  constructor(
    @Inject(DateAdapter) private dateAdapter: JalaliMomentDateAdapter,
    @Inject(MAT_DATE_FORMATS) private formats: CUSTOM_DATE_FORMATS,
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dateAdapter.setLocale('fa');
    this.formats.locale = 'fa';

    this.firstFormGroup = this._formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      location: [null, Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      data: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      data: ['', Validators.required]
    });

    this.fourthFormGroup = this._formBuilder.group({
      guestName: ['', Validators.required],
      hostName: ['', Validators.required],
      guestCount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngAfterViewInit() {
    this.totalSteps = this.stepper?.steps.length || 0;
    this.cdr.detectChanges();
  }

  nextStep() {
    if (this.stepper?.selectedIndex !== undefined) {
      if (this.stepper.selectedIndex < (this.stepper.steps.length - 1) && this.isCurrentStepValid()) {
        this.stepper.next();
        this.currentStep++;
      }
    }
  }

  previousStep() {
    if (this.stepper?.selectedIndex !== undefined && this.stepper.selectedIndex > 0) {
      this.stepper.previous();
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.stepper?.selectedIndex) {
      case 0:
        return this.firstFormGroup.valid;
      case 1:
        return this.secondFormGroup.valid;
      case 2:
        return this.thirdFormGroup.valid;
      case 3:
        return this.fourthFormGroup.valid;
      default:
        return false;
    }
  }
}
*/

import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {FeaturesDto} from "../data/dto/features.dto";
import {FeaturesMock} from "../data/mock/features.mock";
import {LevelDto} from "../data/dto/level.dto";
import {LevelsMock} from "../data/mock/levels.mock";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.css']
})
export class CeremoniesComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper | undefined;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  levels: LevelDto[] = LevelsMock;
  features: FeaturesDto[] = FeaturesMock;

  totalSteps: number = 1;
  currentStep: number = 1;
  selectedFeatures: FeaturesDto[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      location: [null, Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      level: [null, Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      feature: [[], Validators.required],
      description: [null, Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      guestName: [null, Validators.required],
      hostName: [null, Validators.required],
      guestCount: [null, Validators.required],
    });
  }

  ngAfterViewInit() {
    this.totalSteps = this.stepper?.steps.length || 0;
    this.cdr.detectChanges();
  }

  nextStep() {

    if (this.isCurrentStepValid()) {
      this.stepper?.next();
      this.currentStep++;
    } else {
      this.markFormGroupTouched(this.getCurrentFormGroup());
    }
  }

  previousStep() {
    this.stepper?.previous();
    this.currentStep--;
  }

  getCurrentFormGroup(): FormGroup {
    switch (this.stepper?.selectedIndex) {
      case 0:
        return this.firstFormGroup;
      case 1:
        return this.secondFormGroup;
      case 2:
        return this.thirdFormGroup;
      case 3:
        return this.fourthFormGroup;
      default:
        return this.firstFormGroup;
    }
  }

  isCurrentStepValid(): boolean {
    return this.getCurrentFormGroup().valid;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.get(controlName);
    return (control && control.invalid && (control.dirty || control.touched)) || false;
  }

  toggleFeature(feature: FeaturesDto): void {
    const index = this.selectedFeatures.indexOf(feature);
    if (index === -1) {
      this.selectedFeatures.push(feature);
    } else {
      this.selectedFeatures.splice(index, 1);
    }
    this.thirdFormGroup.patchValue({
      feature: this.selectedFeatures.map(feature => feature.title),
    });
  }
}
