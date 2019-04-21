import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, 
         MatFormFieldModule, MatToolbarModule,
         MatCardModule,  
         MatSpinner} from '@angular/material';

@NgModule({
    imports:[
      CommonModule,
      MatButtonModule, MatInputModule,
      MatFormFieldModule, MatToolbarModule,
      MatCardModule
    ],
    exports:[
      CommonModule,
      MatButtonModule, MatInputModule,
      MatFormFieldModule, MatToolbarModule,
      MatCardModule
    ]
    
})
export class AppMaterialModule{}