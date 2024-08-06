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
    data: ['', Validators.required]
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
