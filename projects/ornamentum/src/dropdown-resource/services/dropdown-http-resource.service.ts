import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DropdownDataBindCallback } from '../../dropdown/models/dropdown-data-bind-callback.model';
import { DropdownQueryResult } from '../../dropdown/models/dropdown-query-result.model';
import { DropdownRequestParams } from '../../dropdown/models/dropdown-request-params.model';
import { HttpRequestOptions } from '../../resource-utility/models/http-request-options.model';

import { RequestParamMapperService } from '../../resource-utility/services/request-param-mapper.service';

/**
 * Dropdown HTTP data fetch service.
 */
@Injectable()
export class DropdownHttpResourceService<T> {
  constructor(private http: HttpClient, public requestParamMapperService: RequestParamMapperService) {}

  /**
   * Get data bind event handler.
   * @param options Request options or resource path.
   * @param mapper Response data mapper callback. map source stream format to data table expected stream or apply additional formatting.
   * @return Dropdown bind event handler.
   */
  public onDataBind(
    options: string|HttpRequestOptions,
    mapper?: <Q>(response: Observable<Q>) => Observable<DropdownQueryResult<T[]>>,
  ): DropdownDataBindCallback {
    return (params?: DropdownRequestParams): Observable<DropdownQueryResult<T[]>> => {
      const requestOptions = this.requestParamMapperService.mapRequestOptions(options);
      let queryParams = this.requestParamMapperService.mapQueryParams(requestOptions.options);

      if (params) {
        if (params.limit !== undefined) {
          queryParams = queryParams.set('limit', String(params.limit));
        }

        if (params.offset !== undefined) {
          queryParams = queryParams.set('offset', String(params.offset));
        }

        if (params.filter && params.filter.value) {
          queryParams = queryParams.set('field', params.filter.key);
          queryParams = queryParams.set('filter', params.filter.value);
        }

        const resource = this.http.get<any>(requestOptions.url, { params: queryParams, ...requestOptions }) as Observable<any>;

        if (mapper) {
          return mapper(resource);
        }

        return resource;
      }
    };
  }
}
