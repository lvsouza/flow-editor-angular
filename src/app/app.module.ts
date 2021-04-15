import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DraggableDirective } from './directives/app-draggable/app-draggable.directive';
import { FlowEditorComponent } from './components/flow-editor/flow-editor.component';
import { ZoomDirective } from './directives/zoom/zoom.directive';
import { LineComponent } from './components/line/line.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DraggableDirective,
    FlowEditorComponent,
    ZoomDirective,
    LineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
