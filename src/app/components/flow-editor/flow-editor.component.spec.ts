import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowEditorComponent } from './flow-editor.component';

describe('FlowEditorComponent', () => {
  let component: FlowEditorComponent;
  let fixture: ComponentFixture<FlowEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
