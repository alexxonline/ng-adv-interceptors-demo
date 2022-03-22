import { Injectable } from "@angular/core";
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from "rxjs";
import { tap } from 'rxjs/operators'
import { ToastrService } from "ngx-toastr";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("NotificationInterceptor se ejecutó");
    return next.handle(req).pipe(
      tap((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse && event.status === 200) {
          this.toastr.success('La solicitud se completó con éxito');
        }
      })
    );
  }
}