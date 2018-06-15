import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCreatorComponent } from './branch-creator.component';

describe('BranchCreatorComponent', () => {
  let component: BranchCreatorComponent;
  let fixture: ComponentFixture<BranchCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
