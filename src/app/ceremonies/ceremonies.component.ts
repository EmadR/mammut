import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {FeaturesDto} from "../data/dto/features.dto";
import {FeaturesMock} from "../data/mock/features.mock";
import {LevelDto} from "../data/dto/level.dto";
import {LevelsMock} from "../data/mock/levels.mock";
import {LocationsMock} from "../data/mock/locations.mock";
import {LocationDto} from "../data/dto/location.dto";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {JalaliDatePipe} from "../share/pipes/jalali-date.pipe";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";

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

  locations: LocationDto[] = LocationsMock;
  location: LocationDto | undefined;
  levels: LevelDto[] = LevelsMock;
  features: FeaturesDto[] = FeaturesMock;

  totalSteps: number = 1;
  currentStep: number = 1;
  isFinalRegistration: boolean = false;
  selectedFeatures: FeaturesDto[] = [];

  date: string;
  fileUploaded: File | undefined;
  selectedFeaturesList: string[] = [];

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#ffffff',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#007FB0',
    },
    clockFace: {
      clockFaceBackgroundColor: '#f0f0f0',
      clockHandColor: '#007FB0'
    }
  };

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
      if (this.stepper && (this.currentStep > this.stepper?.steps.length)) this.isFinalRegistration = true;
    } else {
      this.markFormGroupTouched(this.getCurrentFormGroup());
    }
  }

  previousStep() {
    if (this.currentStep > this.totalSteps) {
      this.isFinalRegistration = false;
      if (this.stepper) this.stepper.selectedIndex = this.totalSteps - 1;
    } else this.stepper?.previous();
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
      this.selectedFeaturesList.push(feature.title);
    } else {
      this.selectedFeatures.splice(index, 1);
      this.selectedFeaturesList.splice(index, 1);
    }
    this.thirdFormGroup.patchValue({
      feature: this.selectedFeatures.map(feature => feature.title),
    });
  }

  onFileChange(event: any) {
    this.fileUploaded = event.target.files[0];
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const jalaliPipe = new JalaliDatePipe();
    this.date = jalaliPipe.transform(event.value);
  }

  onLocationChange(event: any) {
    this.location = this.locations.find(location => location.id == event.value);
  }
}
