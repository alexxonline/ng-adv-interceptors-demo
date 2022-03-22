import { Injectable } from "@angular/core";
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { camelCase, mapKeys } from 'lodash';

import { map, Observable } from "rxjs";

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("CamelCaseInterceptor se ejecutó");

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k));
          const modEvent = event.clone({ body: camelCaseObject });
          
          return modEvent;
        }
        else {
          return event;
        }
      })
    );  }
}