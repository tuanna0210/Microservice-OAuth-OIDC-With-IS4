import { Injectable } from '@angular/core';
import { Product, ProductsResult } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private httpClient: HttpClient, ) { }

  getProducts(): Observable<ProductsResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJEQTFFRURDNjNDQkVDNDY4N0Q5MzdDNThCM0ZBQjYxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MTgxNjI2OTIsImV4cCI6MTcxODE2MzI5MiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTAiLCJhdWQiOlsiT3JkZXIuQVBJIiwiQ2F0YWxvZy5BUEkiLCJCYXNrZXQuQVBJIl0sImNsaWVudF9pZCI6ImUtY29tbWVyY2UtY2xpZW50LWFuZ3VsYXIiLCJzdWIiOiI5YTM1MDE3NC05YTc2LTQzZWQtYWIwNi0zMWQwMTY3ODc4ZmQiLCJhdXRoX3RpbWUiOjE3MTgxNjI2OTEsImlkcCI6ImxvY2FsIiwic2lkIjoiMEE5M0VDQjVFODFEREVFOEYxQzc1QUQ4QzRDM0M4NDIiLCJpYXQiOjE3MTgxNjI2OTIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIm9yZGVyLWFwaSIsImNhdGFsb2ctYXBpIiwiYmFza2V0LWFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.o1kLdGCP3MZYsJFAgF7ExpiAs_VIbh0k_EYgDP0ggSYzzjmfDTrB69BBvjka66xBsFznmvDl3p-qqVuT_FEHfVTIDaC_ikj-YsGI60BuzsYsQ9VIhih9yXQYW0RGySswNpeHlouIofkY7l0fQqUKL5-eCa_b-H-iAkI14RoFEafQefOusLZ-0P9X_IqrB3v7AMvyV89eub1IOMl2Y4dqeIhLKnIg4n_l0rQh07IRh3NRT6_QYm0BKHt1Roo__yHndR81813Q0Am5OnY7dLfjgAquithU-ZMMFhRGsTNQd3L1YeOaD3YhD3R90MaQsnp7BnJXeLKM0JXl33GmgwJ0YA`
    })
    return this.httpClient.get<ProductsResult>("https://localhost:7009/api/products", { headers })
  }
}
