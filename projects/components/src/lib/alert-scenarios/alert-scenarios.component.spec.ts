import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertScenariosComponent } from "./alert-scenarios.component";

describe("AlertScenariosComponent", () => {
  let component: AlertScenariosComponent;
  let fixture: ComponentFixture<AlertScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertScenariosComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
