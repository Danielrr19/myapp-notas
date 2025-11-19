import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaksAPIService {

  //Definimos la ruta (URL) de nuestra API
  private API = 'https://jsonplaceholder.typicode.com/todos'
  
  //Inyectamos el servicio
  constructor(private http: HttpClient) { }

  //Creamos el metodopara mostrar los datos
  getAllTasks(page: number = 1, limit: number = 10): Observable<any[]>{

    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString())

    return this.http.get<any[]>(this.API, {params}).pipe(
      catchError(this.handleError)
    )
  }

  // Manejador de errores para usar con catchError
  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
