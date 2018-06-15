import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCreatorComponent } from './tree-creator.component';

describe('TreeCreatorComponent', () => {
  let component: TreeCreatorComponent;
  let fixture: ComponentFixture<TreeCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
