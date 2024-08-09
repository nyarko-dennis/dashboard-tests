import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSidebarComponentComponent } from './desktop-sidebar-component.component';

describe('DesktopSidebarComponentComponent', () => {
  let component: DesktopSidebarComponentComponent;
  let fixture: ComponentFixture<DesktopSidebarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopSidebarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopSidebarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
