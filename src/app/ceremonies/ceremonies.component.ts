import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FeaturesDto} from "../data/dto/features.dto";
import {FeaturesMock} from "../data/mock/features.mock";
import {LevelDto} from "../data/dto/level.dto";
import {LevelsMock} from "../data/mock/levels.mock";
import {LocationsMock} from "../data/mock/locations.mock";
import {LocationDto} from "../data/dto/location.dto";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {JalaliDatePipe} from "../share/pipes/jalali-date.pipe";
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-ceremonies',
  templateUrl: './ceremonies.component.html',
  styleUrls: ['./ceremonies.component.css'],
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxMaterialTimepickerModule
  ]
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
      primaryFontFamily: 'iransans',
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
      feature: [[]],
      description: [null, Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      guestNames: this._formBuilder.group({
        guestName0: ['', Validators.required]  // نام اولین میهمان اجباری
      }),
      hostName: [null, Validators.required],
      guestCount: [null, [Validators.required, Validators.min(1)]],
    });

    this.onGuestCountChange();
  }

  ngAfterViewInit() {
    this.totalSteps = this.stepper?.steps.length || 0;
    this.cdr.detectChanges();
  }

  nextStep() {
    if (this.isCurrentStepValid()) {
      this.stepper?.next();
      this.currentStep++;
      if (this.currentStep > this.totalSteps) this.isFinalRegistration = true;
    } else {
      this.markFormGroupTouched(this.getCurrentFormGroup());
    }
  }

  previousStep() {
    if (this.currentStep > this.totalSteps) {
      this.isFinalRegistration = false;
      if (this.stepper) {
        this.stepper.selectedIndex = this.totalSteps - 1;
        this.currentStep = this.totalSteps;
      }
    } else {
      this.stepper?.previous();
      this.currentStep--;
    }
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
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
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

  onGuestCountChange() {
    this.fourthFormGroup.get('guestCount')?.valueChanges.subscribe((count: number) => {
      const guestNames = this.fourthFormGroup.get('guestNames') as FormGroup;

      if (count && count > 0) {
        while (Object.keys(guestNames.controls).length < count) {
          guestNames.addControl(`guestName${Object.keys(guestNames.controls).length}`, new FormControl('', Validators.required));
        }
        while (Object.keys(guestNames.controls).length > count) {
          guestNames.removeControl(`guestName${Object.keys(guestNames.controls).length - 1}`);
        }
      } else {
        guestNames.reset();
        guestNames.addControl('guestName0', new FormControl('', Validators.required));
      }
    });
  }

  getGuestControls() {
    return Object.keys((this.fourthFormGroup.get('guestNames') as FormGroup).controls);
  }
}
